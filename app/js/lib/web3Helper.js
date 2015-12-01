function getWeb3() {
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://http://out-of-band.on.ether.camp:8555/sandbox/8b0db0aafd59a815eee12cb602b9d98ce2ad6dad'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0x4ed0c969c46e1240173679183a31cf4d104c232c";
    console.log( "web3.js host:", web3.currentProvider.host);
    return web3;
}    