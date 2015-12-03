var http = require('http');
var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require('querystring');

const PORT = 8080;

//=====================================
// Server
//=====================================
var server = http.createServer(requestListener);

server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

function requestListener(request, response) {
    //console.log("SERVER", request, response);
    console.log("SERVER: handleRequest", request.url);
    // REST
    if (handleRest(request, response)) {
        return;
    }
    // STATIC
    handleStatic(request, response);
}

// routes
function handleRest(request, response) {
    //    console.log("REST: request", request);
    if (request.url == "/twilio/request") {
        return do_twilio_request(request, response);
    }
    return false;
}

function handleStatic(request, response) {
    if (request.url == "/" || request.url == "/html") {
        loadStaticFile("/html/wallet.html", response);
        return;
    }
    loadStaticFile(request.url, response);
}

//=====================================
// REST 
//=====================================
function do_twilio_request(request, response) {
    console.log("SERVER: handleRequest", request.method);
    if (request.method != "POST") {
        return false;
    }

    var body = '';

    request.on('data', function(chunk) {
        console.log("Received body data:");
        body += chunk.toString();
    });

    request.on('end', function() {
        console.log("Received END:");
        // empty 200 OK response for now
        response.writeHead(200, "OK", {
            'Content-Type': 'text/html'
        });
        response.end();

        var decodedBody = querystring.parse(body);
        //console.log("decodedBody:", decodedBody.Body);
        doSmsResponse(decodedBody);
    });
    return true;
}

function doSmsResponse(incomingSms) {
    var reply = incomingSms.Body.toLowerCase();
    var phone = querystring.unescape(incomingSms.From);
    console.log("doSmsResponse:", reply);
    // only 'yes' is a confirmation
    if (reply == "yes") {
        oracleInstance.confirmed(phone, 1234); // value unused
        console.log("Spend confirmed by user");
        return;
    }
    if (reply == "lock") {
        oracleInstance.lock(phone); 
        console.log("WARNING: spend declined: account locked!!!");
        return;
    }
    
}

//=====================================
// util
//=====================================
function loadStaticFile(requestUrl, response) {
    //console.log("Load Static File", requestUrl);
    var uri = url.parse(requestUrl).pathname;
    var filename = path.join(process.cwd(), uri);
    //console.log("loadStaticFile", filename);

    fs.exists(filename, function(exists) {
        //console.log("loadStaticFile", "exists", exists);
        if (!exists) {
            response404(response, requestUrl);
            return;
        }

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response500(response, err);
                return;
            }

            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(file, "binary");
            response.end();
        });
    });
}

function response404(response, requestUrl) {
    console.log("ERROR", "404", requestUrl);
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    response.write("404 Not Found " + requestUrl + "\n");
    response.end();
}

function response500(response, error) {
    console.log("ERROR", "500", error);
    response.writeHead(500, {
        "Content-Type": "text/plain"
    });
    response.write(error + "\n");
    response.end();
}





//=======================================
// web3
//=======================================
var web3Helper = require('./lib/web3Helper.js')();
var web3 = web3Helper.getWeb3();

//=======================================
// namereg
//=======================================
var nameregHelper = require('./lib/nameregHelper.js')(web3);
var namereg = nameregHelper.getInstance();

//=======================================
// Oracle
//=======================================
var oracleHelper = require('./lib/oracleHelper.js')(web3);
var oracleInstance;
var oracleNotify;

function setOracle(address) {
    console.log("setOracle:" + address);
    oracleInstance = oracleHelper.getInstance(address);

    // watch for Notify
    oracleNotify = oracleInstance.Notify();
    oracleNotify.watch(function(err, result) {
        var TAG = "oracleNotify.watch: ";
        if (err) {
            console.log(TAG, "ERROR", err);
            return;
        }
        oracleNotified(result.args);
    });
}

function oracleNotified(args) {
    var TAG = "Oracle";
    console.log(TAG, "Notify", args);
    var body = "Trying to spend " + args.value + ". Reply YES to confirm, LOCK to lock account.";
    sendSms(body, args.phone);
}

function getAddressOf(contractName) {
    return new Promise(function(resolve, reject) {
        namereg.addressOf(contractName, function(err, address) {
            var TAG = "namereg.addressOf:" + contractName + ":";
            if (err) {
                console.log(TAG, "ERROR", err);
                return reject(Error(err));
            }
            if (address == 0x0) {
                console.log(TAG, "NOT FOUND");
                return reject(Error("Not Found:" + TAG));
            }
            console.log(TAG, address);
            resolve(address);
        });
    });
}


//===============================================
// setup
//===============================================

getAddressOf('Oracle').then(function(address) {
    setOracle(address);
}, abort);

function abort(error) {
    console.log("ABORT", error);
    process.exit();
}


// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC4f6908d70926e4b46f7c392280a513fe';
var authToken = "deeab5e8ac7bca2afdbef7098f425572";
var fromPhoneNumber = "+15005550006";
var toPhoneNumber = "+14158105251";

var production = true;
if (production) {
    accountSid = 'AC84a35dc4f573efe9bb9e32e7c0cac63d';
    authToken = "db322bdc75327a69decea7b89d1b441f";
    fromPhoneNumber = "+16505420016";
}

var client = require('twilio')(accountSid, authToken);

function sendSms(body, phone) {
    console.log("sendSms", body);
    client.messages.create({
        body: body,
        to: phone,
        from: fromPhoneNumber
    }, function(err, message) {
        if (err) {
            console.log("ERROR: sendSms", err);
            return;
        }
        //console.log(message);
    });
}