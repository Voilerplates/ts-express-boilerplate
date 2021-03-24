"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Route = /** @class */ (function () {
    function Route(opt) {
        this.router = express_1.Router();
        this.routeName = opt === null || opt === void 0 ? void 0 : opt.routeName;
        this.controller = opt === null || opt === void 0 ? void 0 : opt.controller;
        this.controller.setUpController(this.router);
    }
    return Route;
}());
exports.default = Route;
