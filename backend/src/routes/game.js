"use strict";
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
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
// const {BadRequestError} = require("../expressError.js");
var config_1 = require("../config");
var game_1 = __importDefault(require("../models/game"));
var https_1 = __importDefault(require("https"));
var router = express_1.default.Router({ mergeParams: true });
var lichessBaseUrl = "https://lichess.org/api";
// ROUTES
router.post("/:username", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, data, bodyData, response, gameId, currGameId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.params.username;
                    data = {
                        level: 8,
                        "clock.limit": [],
                        "clock.increment": [],
                        days: 1,
                        color: "white",
                    };
                    bodyData = "level=" + data.level + "&clock.limit=" + data["clock.limit"] + "&clock.increment=" + data["clock.increment"] + "&clock.limit=" + data.days + "&color=" + data.color;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.post(lichessBaseUrl + "/challenge/ai", bodyData, {
                            headers: {
                                Authorization: "Bearer " + config_1.LICHESS_TOKEN,
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        })];
                case 2:
                    response = _a.sent();
                    gameId = response.data.id;
                    return [4 /*yield*/, game_1.default.addGame(gameId, username, data.color)];
                case 3:
                    currGameId = _a.sent();
                    return [2 /*return*/, res.json({ currGameId: currGameId })];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
// *********
// Make move
// *********
router.post("/:id/move/:move", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var currGameId, currMove, resp, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currGameId = req.params.id;
                    currMove = req.params.move;
                    // Start Game stream
                    https_1.default
                        .get(lichessBaseUrl + "/stream/game/" + currGameId, {
                        headers: {
                            Accept: "application/x-ndjson",
                            Authorization: "Bearer " + config_1.LICHESS_TOKEN,
                        },
                    }, function (res) {
                        var statusCode = res.statusCode;
                        var error;
                        if (statusCode !== 200) {
                            error = new Error("Request Failed.\n" + ("Status Code: " + statusCode));
                        }
                        else {
                            console.log({ statusCode: statusCode });
                        }
                        if (error) {
                            console.error(error.message);
                            res.resume();
                            return;
                            // return res.json({ result: 429 });
                        }
                        res.on("data", function (chunk) {
                            chunk = Buffer.from(chunk).toString("utf-8");
                            try {
                                var chunkJson = JSON.parse(chunk);
                                if (chunkJson.lm) {
                                    console.log(chunkJson.lm);
                                    var lastMove = chunkJson.lm;
                                    game_1.default.addMoves(currGameId, lastMove);
                                }
                            }
                            catch (_ex) { }
                        });
                        res.on("end", function () {
                            game_1.default.addMoves(currGameId, "end");
                            console.log("====================== END ");
                        });
                    })
                        .on("error", function (e) {
                        console.error("Got error: " + e.message);
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(lichessBaseUrl + "/board/game/" + currGameId + "/move/" + currMove, null, {
                            headers: { Authorization: "Bearer " + config_1.LICHESS_TOKEN },
                        })];
                case 2:
                    resp = _a.sent();
                    result = resp.data;
                    return [2 /*return*/, res.json({ result: result })];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.get("/response/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var currGameId, lm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currGameId = req.params.id;
                    return [4 /*yield*/, game_1.default.getMoves(currGameId)];
                case 1:
                    lm = _a.sent();
                    return [2 /*return*/, res.json({ lm: lm })];
            }
        });
    });
});
router.get("/resign/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gameId, resp, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(lichessBaseUrl + "/board/game/" + gameId + "/resign", null, {
                            headers: { Authorization: "Bearer " + config_1.LICHESS_TOKEN },
                        })];
                case 2:
                    resp = _a.sent();
                    result = resp.data;
                    return [2 /*return*/, res.json({ result: result })];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
