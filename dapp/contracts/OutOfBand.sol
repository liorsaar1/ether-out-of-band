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
        wallet.spendConfirmed(value);
    }
}

contract Wallet is named("Wallet") {

    Oracle oracle;
    string phone;
    event Feedback(string text);
    
    function setPhone(string _phone) {
        log0("setPhone:");
        phone = _phone;
    }
    
    function setOracle(address oracleAddress) {
        log1("set oracle", bytes32(msg.sender));
        oracle = Oracle(oracleAddress);
        Feedback( "wallet: done: setOracle");
    }
    
    function spend(uint value) {
        log1("spend", bytes32(msg.sender));
        oracle.notify(phone, value);
        Feedback( "wallet: done: spend ");
    }
    
    function spendConfirmed(uint value) {
        log1("spendConfirmed", bytes32(value));
        Feedback( "spend confirmed");
    }
    
}