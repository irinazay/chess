"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var expressError_1 = require("./expressError");
var game_1 = __importDefault(require("./routes/game"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = require("./config");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/game", game_1.default);
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new expressError_1.NotFoundError());
});
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test")
        console.error(err.stack);
    var status = err.status || 500;
    var message = err.message;
    return res.status(status).json({
        error: { message: message, status: status },
    });
});
app.listen(config_1.PORT, function () {
    console.log("Started on " + config_1.PORT);
});
