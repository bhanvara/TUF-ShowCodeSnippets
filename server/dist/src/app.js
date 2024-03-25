"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const submitRoutes_1 = __importDefault(require("./router/submitRoutes"));
const entryRoutes_1 = __importDefault(require("./router/entryRoutes"));
const runQuery_1 = __importDefault(require("./router/runQuery"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // add this line to enable all CORS requests
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/runQuery", runQuery_1.default);
app.use("/api/submit", submitRoutes_1.default);
// /api/submit/submitCode
app.use("/api/entries", entryRoutes_1.default);
// /api/entries/getEntries
exports.default = app;
