function nameregAbi() { 
    var abi = 
    
[{
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "name",
        "type": "bytes32"
    }],
    "name": "addressOf",
    "outputs": [{
        "name": "addr",
        "type": "address"
    }],
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "name",
        "type": "bytes32"
    }],
    "name": "register",
    "outputs": [],
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "unregister",
    "outputs": [],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "nameOf",
    "outputs": [{
        "name": "name",
        "type": "bytes32"
    }],
    "type": "function"
}, {
    "inputs": [],
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "addr",
        "type": "address"
    }, {
        "indexed": false,
        "name": "name",
        "type": "bytes32"
    }],
    "name": "Register",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "addre",
        "type": "address"
    }, {
        "indexed": false,
        "name": "name",
        "type": "bytes32"
    }],
    "name": "Unregister",
    "type": "event"
}]

;return abi;
}
