    
    //=======================================
    // web3
    //=======================================
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://lior.ide.tmp.ether.camp:8555/sandbox/6a384f23526eb3f66cd063a36b3bf01f0de8d534'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0x4ed0c969c46e1240173679183a31cf4d104c232c";
    
    //=======================================
    // namereg
    //=======================================
    var NameReg = require('./nameregDef');
    var namereg = NameReg.getInstance(web3);

    //=======================================
    // Oracle
    //=======================================
    var Oracle = require('./oracleDef');
    var oracleInstance;
    var oracleNotify;
    function setOracle(address) {
        console.log( "setOracle:" + address);
        oracleInstance = Oracle.getInstance(web3, address);
        
        // watch for Notify
        oracleNotify = oracleInstance.Notify();
        oracleNotify.watch( function(err, result) {
            var TAG = "oracleNotify.watch: ";
            if (err) {
                console.log(TAG, "ERROR", err);
                return;
            }
            oracleNotified(result.args);
        });
    }
    
    function oracleNotified(args) {
        var TAG = "Oracle";
        console.log(TAG, "Notify", args);
    }
    

    function getAddressOf(contractName) {
      return new Promise(function(resolve, reject) {
        namereg.addressOf(contractName, function(err, address) {
            var TAG = "namereg.addressOf:" + contractName + ":";
            if (err) {
                console.log(TAG, "ERROR", err);
                return reject(Error(err));
            }
            if (address == 0x0) {
                console.log(TAG, "NOT FOUND");
                return reject(Error("Not Found:" + TAG));
            }
            console.log(TAG, address);
            resolve(address);
        });
      });
    }


    //===============================================
    // setup
    //===============================================
    
    getAddressOf('Oracle').then(function(address) {
        setOracle(address);
    }, abort);
        
    function abort(error) {
        console.log( "ABORT", error);
        process.exit();
    }    
