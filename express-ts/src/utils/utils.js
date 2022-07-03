"use strict";
exports.__esModule = true;
exports.db = exports.is_valid_email = void 0;
var config_1 = require("../config");
var mysql2_1 = require("mysql2");
var db = (0, mysql2_1.createConnection)({
    host: config_1["default"].db.host,
    user: config_1["default"].db.user,
    password: config_1["default"].db.password,
    database: config_1["default"].db.database,
    port: config_1["default"].db.port
});
exports.db = db;
//let email: any = "example@gmail.com"
function is_valid_email(email) {
    if (!email)
        return false;
    if (email.length > 100)
        return false;
    var indent = email.indexOf('@');
    var arr = ["@", "g", "m", "a", "i", "l", ".", "c", "o", "m"];
    for (var i = 0; i < 10; i++) {
        console.log(email[i + indent]);
        if (email[i + indent] != arr[i]) {
            console.log('heja');
            return false;
        }
        else {
            console.log('hejax');
            return true;
        }
    }
}
exports.is_valid_email = is_valid_email;
