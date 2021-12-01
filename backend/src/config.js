"use strict";
/** Shared config for application; can be required many places. */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseUri = exports.LICHESS_TOKEN = exports.PORT = exports.SECRET_KEY = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var SECRET_KEY = process.env.SECRET_KEY;
exports.SECRET_KEY = SECRET_KEY;
var LICHESS_TOKEN = process.env.LICHESS_TOKEN;
exports.LICHESS_TOKEN = LICHESS_TOKEN;
var PORT = parseInt(process.env.PORT, 10) || 80;
exports.PORT = PORT;
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    return process.env.NODE_ENV === "test"
        ? "chess_test"
        : process.env.DATABASE_URL || "chess";
}
exports.getDatabaseUri = getDatabaseUri;
