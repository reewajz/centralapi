var crypto = require('crypto');
var commonConfig = require('./config.json');

module.exports = {
    encrypt: function (t) { return encrypt(t); },
    decrypt: function (t) { return decrypt(t); },
    checkToken: function (t) { return checkToken(t); },
    customDateFormat: function (dt) { return customDateFormat(dt); }
};
var securityKey = commonConfig.PublicKey;

function encrypt(txt) {
    var e = "AES-256-CBC";
    var s = securityKey;
    var iv = s.substr(0, 16);
    var encryptor = crypto.createCipheriv(e, s, iv);
    return encryptor.update(txt, 'utf8', 'base64') + encryptor.final('base64');
}

function decrypt(txt) {
    try {
        var e = "AES-256-CBC";
        var s = securityKey;
        var iv = s.substr(0, 16);
        var encryptor = crypto.createDecipheriv(e, s, iv);
        return encryptor.update(txt, 'base64', 'utf8') + encryptor.final('utf8');
    }
    catch (e) {
        return '';
    }

}

function checkToken(t) {
    try {
        var str = decrypt(t);
        if (str.length > 10) {
            var arr = str.split('||[]');
            if (arr.length === 3) {
                var mill = parseInt(arr[1]);
                var d = new Date(mill);
                if (d > new Date()) {
                    return true;
                }
            }
        }
        return false;
    }
    catch (e) {
        return false;
    }
}

function customDateFormat(dt) {
    var presentDate = new Date();
    var pastDate = dt;
    var diffTime = presentDate.getTime() - pastDate.getTime();
    var seconds = 1000;
    var minutes = seconds * 60;
    var hour = minutes * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = week * 4;
    if (diffTime < hour) {
        var m = parseInt(diffTime / minutes);
        return (m + ((m < 2) ? ' minutes ago' : ' minutes ago'));
    } else if (diffTime < day) {
        var h = parseInt(diffTime / hour);
        return (h + ((h < 2) ? ' hour ago' : ' hours ago'));
    } else if (diffTime < week) {
        var d = parseInt(diffTime / day);
        return (d + ((d < 2) ? ' day ago' : ' days ago'));
    }
    else if (diffTime < month * 3) {
        var w = parseInt(diffTime / week);
        return (w + ((w < 2) ? ' week ago' : ' weeks ago'));
    } else {
        return dt.toDateString();
    }
}

