if (typeof module === 'undefined') {
    this['Common'] = getExport();
}
else {
    module.exports = getExport();
}

function getExport() {
    return function(www) {
        var cons = www;
        return {
            test: function(x) {
                console.log(cons, x);
            }
        }
    }
}

