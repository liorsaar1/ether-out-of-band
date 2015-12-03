var theThing = function(www) {
    var cons = www;
    return {
        test: function(x) {
            console.log(cons, x);
        }
    }
}

if (typeof module === 'undefined') {
    this['Common'] = theThing;
}
else {
    module.exports = theThing;
}
