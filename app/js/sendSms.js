// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC4f6908d70926e4b46f7c392280a513fe';
var authToken = "deeab5e8ac7bca2afdbef7098f425572";
var fromPhoneNumber = "+15005550006";
var toPhoneNumber = "+14158105251";

var production = true;
if (production) {
    accountSid = 'AC84a35dc4f573efe9bb9e32e7c0cac63d';
    authToken = "db322bdc75327a69decea7b89d1b441f";
    fromPhoneNumber = "+16505420016";
}


var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Test qwerty",
    to: toPhoneNumber,
    from: fromPhoneNumber
}, function(err, message) {
    if (err) {
        console.log(err);
        return;
    }
        console.log(message);
});