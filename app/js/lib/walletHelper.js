function getExport() {
    return function(_web3) { // constructor
        var web3 = _web3;
        return {

            getContract: function() {
                return web3.eth.contract(getAbi());
            },

            getInstance: function(address) {
                return this.getContract().at(address);
            },
        }

        function getAbi() {
            return [{
                "constant": false,
                "inputs": [],
                "name": "nameRegAddress",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "msgSender",
                    "type": "address"
                }],
                "name": "isKnownOracle",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "spendConfirmed",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "oracleAddress",
                    "type": "address"
                }],
                "name": "setOracle",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "name",
                    "type": "bytes32"
                }],
                "name": "named",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "unlock",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_address",
                    "type": "address"
                }, {
                    "name": "amount",
                    "type": "uint256"
                }],
                "name": "spend",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_phone",
                    "type": "string"
                }],
                "name": "setPhone",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "lock",
                "outputs": [],
                "type": "function"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "name": "text",
                    "type": "string"
                }],
                "name": "Feedback",
                "type": "event"
            }];

        }
    }
}

// shared code (do not remove !!!)
if (typeof module === 'undefined') {
    // html javascript inclusion
    this['WalletHelper'] = getExport();
}
else {
    // node js
    module.exports = getExport();
}
