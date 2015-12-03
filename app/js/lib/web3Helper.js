function getWeb3() {
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://out-of-band.on.ether.camp:8555/sandbox/7e967b0ebda3f76fb82c842fedbffb289a0ae474'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826";
    console.log( "web3.js host:", web3.currentProvider.host);
    return web3;
}    