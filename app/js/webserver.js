
var http = require('http');
var fs = require("fs");
var url = require("url");
var path = require("path");

const PORT=8080; 

//=====================================
// Server
//=====================================
var server = http.createServer(requestListener);

server.listen(PORT, function(){
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

function handleRest(request, response) {
    if (request.url == "/wallet") {
        return do_wallet(request, response);
    }
    return false;
}

function handleStatic(request, response) {
    loadStaticFile(request.url, response);
}

//=====================================
// REST 
//=====================================
function do_wallet(request, response) {
    response.end('Wallet !!!');
    return true;
}

//=====================================
// util
//=====================================
function loadStaticFile(requestUrl, response) {
    console.log("loadStaticFile", requestUrl);
    var uri = url.parse(requestUrl).pathname;
    var filename = path.join(process.cwd(), uri);
    console.log("loadStaticFile", filename);

    fs.exists(filename, function(exists) {
        console.log("loadStaticFile", "exists", exists);
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
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    response.write("404 Not Found " + requestUrl + "\n");
    response.end();
}

function response500(response, error) {
    response.writeHead(500, {
        "Content-Type": "text/plain"
    });
    response.write(error + "\n");
    response.end();
}




    
    //=======================================
    // web3
    //=======================================
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://lior.ide.tmp.ether.camp:8555/sandbox/6a384f23526eb3f66cd063a36b3bf01f0de8d534'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826";
    
    //=======================================
    // namereg
    //=======================================
    var NameReg = require('./nameregDef');
    var namereg = NameReg.getInstance(web3);

    //=======================================
    // Oracle
    //=======================================
    var Oracle = require('./oracleDef');
    var oracleInstance;
    var oracleNotify;
    function setOracle(address) {
        console.log( "setOracle:" + address);
        oracleInstance = Oracle.getInstance(web3, address);
        
        // watch for Notify
        oracleNotify = oracleInstance.Notify();
        oracleNotify.watch( function(err, result) {
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
        var body = "Trying to spend " + args.value;
        sendSms(body);
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
        console.log( "ABORT", error);
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
 
function sendSms(body) {
    console.log("sendSms", body);
    client.messages.create({
        body: body,
        to: toPhoneNumber,
        from: fromPhoneNumber
    }, function(err, message) {
        if (err) {
            console.log("ERROR: sendSms", err);
            return;
        }
        console.log(message);
    });
}