function getExport() {
    return function(_web3) { // constructor
        var web3 = _web3;
        return {

            getContract: function() {
                return web3.eth.contract(getAbi());
            },

            getInstance: function() {
                return this.getContract().at('0x084f6a99003dae6d3906664fdbf43dd09930d0e3');
            },

            getAddressOf: function(contractName) {
                var namereg = this.getInstance();
                return new Promise(function(resolve, reject) {
                    namereg.addressOf(contractName, function(error, address) {
                        var TAG = "namereg.addressOf:" + contractName + ":";
                        if (error) {
                            console.log(TAG, error);
                            return reject(error);
                        }
                        if (address == 0x0) {
                            console.log(TAG, "NOT FOUND");
                            return reject(Error("Not Found:" + TAG));
                        }
                        console.log(TAG, address);
                        resolve(address);
                    });
                });
            },
        };

        function getAbi() {
            return [{
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
        }
    }
}

// shared code (do not remove !!!)
if (typeof module === 'undefined') {
    // html javascript inclusion
    this['NameregHelper'] = getExport();
} else {
    // node js
    module.exports = getExport();
}
