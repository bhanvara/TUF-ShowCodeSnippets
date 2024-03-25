"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const config_1 = require("./src/config/config");
const port = config_1.PORT;
app_1.default.get('/', (req, res) => {
    res.send('Backend for takeUforward!');
});
app_1.default.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
