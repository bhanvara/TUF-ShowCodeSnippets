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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconfig_1 = require("../config/dbconfig");
const router = express_1.default.Router();
router.get('/getEntries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield dbconfig_1.pool.query('SELECT * FROM submissions');
        res.json(rows);
    }
    catch (error) {
        console.error('Error getting entries:', error);
        res.status(500).send('Server error');
    }
}));
// CREATE TABLE submissions (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   code_language VARCHAR(255) NOT NULL,
//   stdin TEXT,
//   source_code TEXT NOT NULL,
//   output TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
exports.default = router;
