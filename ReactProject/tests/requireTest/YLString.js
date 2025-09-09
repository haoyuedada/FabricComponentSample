"use strict";
console.log('chy YLString.js is loaded');
String.prototype.format = function() {
    console.log('chy YLString format is called');
    var result=this;
    if (arguments.length == 0)
        return null;
    for ( var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
        result = result.replace(re, arguments[i]);
    }
    return result;
};

exports.String = String;
