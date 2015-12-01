/*global nameregAbi*/
var module = {}; // hack - trying to keep nodejs syntax

module.exports = {
    getContract: function() {
        return this.web3.eth.contract(nameregAbi());
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

/*global NameregHelper*/
NameregHelper = function(web3) {
    this.web3 = web3;
};

NameregHelper.prototype = module.exports;


