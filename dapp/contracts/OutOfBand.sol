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
        // if (wallet == null) {
        //     return;
        // }
        wallet.spendConfirmed(value);
    }
}

contract Wallet is named("Wallet") {

    Oracle oracle;
    string phone;
    address spendAddress;
    uint spendAmount;
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
    
}