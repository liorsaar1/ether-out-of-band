import "std.sol";

contract Oracle is named("Oracle") {
    event Notify(string phone, uint value);
    
    Wallet wallet;
    string requestPhone;
    uint requestValue;
    
    /// get a notification request from a wallet
    /// to prompt `phone` for spending `value`
    function notify(string phone, uint value){
        log1("Oracle: notify", bytes32(msg.sender));
        wallet = Wallet(msg.sender);
        requestPhone = phone;
        requestValue = value;
        Notify(phone, value);
    }
    
    function confirmed(string phone, uint value) {
        log0("Oracle: confirmed");
        // if (wallet == 0) {
        //     return;
        // }
        wallet.spendConfirmed(value);
    }
    
    function lock(string phone) {
        log0("Oracle: denied - lock");
        // if (wallet == 0) {
        //     return;
        // }
        wallet.lock();
    }
}

contract Wallet is named("Wallet") {

    Oracle oracle;
    string phone;
    address spendAddress;
    uint spendAmount;
    bool locked = false;
    event Feedback(string text);
    
    function setPhone(string _phone) {
        log0("setPhone:");
        Feedback( "Phone set ");
        phone = _phone;
    }
    
    function setOracle(address oracleAddress) {
        log1("set oracle", bytes32(msg.sender));
        oracle = Oracle(oracleAddress);
        Feedback( "Oracle set");
    }
    
    function spend(address _address, uint amount) {
        log1("spend", bytes32(_address));
        // make sure not locked
        if (locked) {
            Feedback("Wallet Locked");
            return;
        }
        spendAddress = _address;
        spendAmount = amount;
        oracle.notify(phone, amount);
        Feedback( "Out of Band notification sent" );
    }
    
    function spendConfirmed(uint value) {
        log1("spendConfirmed", bytes32(value));
        Feedback( "Spend confirmed");
        spendAddress.send(spendAmount);
    }
    
    function lock() {
        log0("Spend Denied - Lock");
        Feedback( "Declined - Wallet locked");
        locked = true;
    }
}