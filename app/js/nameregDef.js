module.exports = {
  getContract: function (_web3) {
    return _web3.eth.contract(nameRegAbi);
  },
  getInstance: function (_web3) {
    return this.getContract(_web3).at('0x084f6a99003dae6d3906664fdbf43dd09930d0e3');
  },
};

var nameRegAbi = 
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
}];