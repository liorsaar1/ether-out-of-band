
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
    if (handleStatic(request, response)) {
        return;
    }
    response404(request.url, response);
}

function handleRest(request, response) {
    if (request.url == "/wallet") {
        return do_wallet(request, response);
    }
    return false;
}

function handleStatic(request, response) {
    if (request.url == "/wallet.html") {
        loadStaticFile("../html" + request.url, response);
        return true;
    }
    return false;
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
