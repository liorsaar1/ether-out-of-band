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
                    "name": "phone",
                    "type": "string"
                }, {
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "confirmed",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "phone",
                    "type": "string"
                }],
                "name": "lock",
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
                "inputs": [{
                    "name": "phone",
                    "type": "string"
                }, {
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "notify",
                "outputs": [],
                "type": "function"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "name": "phone",
                    "type": "string"
                }, {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "Notify",
                "type": "event"
            }];

        }
    }
}

// shared code (do not remove !!!)
if (typeof module === 'undefined') {
    // html javascript inclusion
    this['OracleHelper'] = getExport();
}
else {
    // node js
    module.exports = getExport();
}
