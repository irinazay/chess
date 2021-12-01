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
var db_1 = __importDefault(require("../db"));
// const {
//   NotFoundError,
//   BadRequestError,
//   UnauthorizedError,
// } = require("../expressError");
var Game = /** @class */ (function () {
    function Game() {
    }
    /** Add game.
     *
     * Returns { gameId}
     *
     * Throws BadRequestError on duplicates.
     **/
    Game.addGame = function (gameId, username, color) {
        return __awaiter(this, void 0, void 0, function () {
            var duplicateCheck, result, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT gameId\n           FROM games\n           WHERE gameId = $1", [gameId])];
                    case 1:
                        duplicateCheck = _a.sent();
                        if (duplicateCheck.rows[0]) {
                            console.log("dublicate");
                            //   throw new BadRequestError(`Duplicate username: ${username}`);
                        }
                        return [4 /*yield*/, db_1.default.query("INSERT INTO games\n        (gameId,\n        username,\n         color)\n        VALUES ($1, $2, $3)\n        RETURNING gameId", [gameId, username, color])];
                    case 2:
                        result = _a.sent();
                        game = result.rows[0];
                        return [2 /*return*/, game];
                }
            });
        });
    };
    Game.addMoves = function (gameId, move_piece) {
        return __awaiter(this, void 0, void 0, function () {
            var result, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO moves\n      (gameId,\n      move_piece)\n      VALUES ($1, $2)\n      RETURNING gameId", [gameId, move_piece])];
                    case 1:
                        result = _a.sent();
                        game = result.rows[0];
                        return [2 /*return*/, game];
                }
            });
        });
    };
    Game.getMoves = function (gameId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, move;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT move_piece\n      FROM moves\n      WHERE gameid = $1", [gameId])];
                    case 1:
                        result = _a.sent();
                        move = result.rows;
                        return [2 /*return*/, move];
                }
            });
        });
    };
    return Game;
}());
exports.default = Game;
