"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Utilities
var Logger_1 = __importDefault(require("../utils/Logger"));
// Middlewares
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server(opt) {
        var _this = this;
        this._loadRoutes = function () { return __awaiter(_this, void 0, void 0, function () {
            var routeFiles, _i, routeFiles_1, route, Router, pathName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        routeFiles = fs_1.default.readdirSync(this.routesPath).filter(function (file) { return file.endsWith(".js"); });
                        _i = 0, routeFiles_1 = routeFiles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < routeFiles_1.length)) return [3 /*break*/, 4];
                        route = routeFiles_1[_i];
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(_this.routesPath + "\\" + route)); })];
                    case 2:
                        Router = (_a.sent()).default;
                        Router = new Router();
                        pathName = Router.routeName || route.replace(".js", "");
                        if (!Router || typeof Router !== "object") {
                            Logger_1.default.error("Ignoring " + (this.routesPath + "\\" + route) + ", Invalid route.");
                            return [3 /*break*/, 3];
                        }
                        this.app.use("/" + pathName, Router.router);
                        Logger_1.default.info("Successfully loaded /" + pathName);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.port = (opt === null || opt === void 0 ? void 0 : opt.port) || 3000;
        this.app = (opt === null || opt === void 0 ? void 0 : opt.app) || express_1.default();
        this.routesPath = (opt === null || opt === void 0 ? void 0 : opt.routesPath) || path_1.default.join(__dirname, "../routes");
    }
    Server.prototype._loadMiddlewares = function () {
        // Load your middlewares here
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default("dev"));
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        Logger_1.default.log("Successfully loaded middlewares!");
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            Logger_1.default.log("Server ignited at port " + _this.port);
            Logger_1.default.log("Loading up middlewares...");
            _this._loadMiddlewares();
            Logger_1.default.log("Dynamically loading routes...");
            _this._loadRoutes();
        });
    };
    return Server;
}());
exports.default = Server;
