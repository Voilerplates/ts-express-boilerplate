"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var moment_1 = __importDefault(require("moment"));
var timestampFormat = "YYYY/MM/DD - HH:mmA";
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var timestamp = Date.now();
        var timestampString = moment_1.default(timestamp).format(timestampFormat);
        for (var _a = 0, messages_1 = messages; _a < messages_1.length; _a++) {
            var message = messages_1[_a];
            console.log(chalk_1.default.blue("[LOG][" + timestampString + "] :: " + message));
        }
    };
    Logger.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var timestamp = Date.now();
        var timestampString = moment_1.default(timestamp).format(timestampFormat);
        for (var _a = 0, messages_2 = messages; _a < messages_2.length; _a++) {
            var message = messages_2[_a];
            console.error(chalk_1.default.red("[ERR][" + timestampString + "] :: " + message));
        }
    };
    Logger.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var timestamp = Date.now();
        var timestampString = moment_1.default(timestamp).format(timestampFormat);
        for (var _a = 0, messages_3 = messages; _a < messages_3.length; _a++) {
            var message = messages_3[_a];
            console.info(chalk_1.default.yellow("[INF][" + timestampString + "] :: " + message));
        }
    };
    return Logger;
}());
exports.default = Logger;
