import "std.sol";

/// sample oracle contract 
/// interfaces between a meat world oracle server and a wallet contract
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
    
    /// spend confirmed by the user via SMS
    function confirmed(string phone, uint value) {
        log0("Oracle: confirmed");
        // if (wallet == 0) {
        //     return;
        // }
        wallet.spendConfirmed(value);
    }
    
    /// spend declined by the user via SMS
    function lock(string phone) {
        log0("Oracle: denied - lock");
        // if (wallet == 0) {
        //     return;
        // }
        wallet.lock();
    }
}


/// sample wallet, controlled from a web UI
/// when a spend() call is made, the oracle is asked to send the user an out-of-band notification (SMS) in the meat world
/// valid replies:
///   confirm - execute the spend
///   lock - the wallet is locked
/// 
/// note: the phone # and oracle(s) should be set upon construction and remain immutable
/// for the purpose of this demo they are variable

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
        // only a known oracle can confirm
        if (!isKnownOracle(msg.sender)) {
            Feedback( "Unknown sender. Spend Confirmation message ignored."); // scary
            return;
        }
        // spend
        Feedback( "Spend confirmed");
        spendAddress.send(spendAmount);
    }
    
    function lock() {
        log0("Spend Denied - Lock");
        // only a known oracle can confirm
        if (!isKnownOracle(msg.sender)) {
            Feedback( "Unknown sender. Lock message ignored."); // scary
            return;
        }
        // lock it
        Feedback( "Declined - Wallet locked");
        locked = true;
    }
    
    function unlock() {
        log0("Unlock");
        // unlock it
        Feedback( "Unlocked");
        locked = false;
    }
    
    function isKnownOracle(address msgSender) returns (bool){
        if (oracle == msgSender ) {
            return true;
        }
        return false;
    }
}