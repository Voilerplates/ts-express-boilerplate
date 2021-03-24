"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("../utils/Logger"));
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.loadControllerMapping = function (controllerMapping) {
        this.controllerMapping = controllerMapping;
    };
    Controller.prototype.setUpController = function (router) {
        for (var _i = 0, _a = this.controllerMapping; _i < _a.length; _i++) {
            var record = _a[_i];
            var path = record.path, method = record.method, fn = record.fn;
            Logger_1.default.info("Loading " + path + " with HTTP method: " + (method || 'get'));
            if ((method === null || method === void 0 ? void 0 : method.toLowerCase()) === "post") {
                router.post(path, fn);
                continue;
            }
            router.get(path, fn);
        }
    };
    return Controller;
}());
exports.default = Controller;
