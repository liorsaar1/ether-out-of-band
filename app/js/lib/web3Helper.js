function getExport() {
    var host = 'http://out-of-band.on.ether.camp:8555/sandbox/';
    return function() { // constructor
        return {
            getWeb3: function(sandboxId) {
                var Web3 = require('web3');
                var web3 = new Web3();
                var providerUrl = host + sandboxId;
                web3.setProvider(new web3.providers.HttpProvider(providerUrl));
                web3.eth.defaultAccount = "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826";
                console.log( "web3.js host:", web3.currentProvider.host);
                return web3;
            }
        }
    }
}

// shared code (do not remove !!!)
if (typeof module === 'undefined') {
    // html javascript inclusion
    this['Web3Helper'] = getExport();
} else {
    // node js
    module.exports = getExport();
}
