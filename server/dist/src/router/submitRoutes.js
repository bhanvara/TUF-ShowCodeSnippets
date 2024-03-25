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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.X_RAPIDAPI_KEY);
const router = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
function makeSubmission(code_language, source_code, stdin) {
    return __awaiter(this, void 0, void 0, function* () {
        code_language = Buffer.from(code_language, 'base64').toString();
        let language_id = 0;
        if (code_language === 'C++') {
            language_id = 54;
        }
        else if (code_language === 'JavaScript') {
            language_id = 93;
        }
        else if (code_language === 'Java') {
            language_id = 62;
        }
        else if (code_language === 'Python') {
            language_id = 71;
        }
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
                language_id: language_id,
                source_code: source_code,
                stdin: stdin
            }
            // send base64_encoded message
            // data: {
            //   language_id: language_id,
            //   source_code: Buffer.from(source_code).toString('base64'),
            //   stdin: Buffer.from(stdin).toString('base64')
            // }
        };
        console.log('Making submission with options:', options);
        try {
            const response = yield axios_1.default.request(options);
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);
            return response.data.token;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
router.post('/submitCode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, code_language, stdin, source_code } = req.body;
    const submissionToken = yield makeSubmission(code_language, source_code, stdin);
    // convert code_language, stdin, source_code from base64 to string
    code_language = Buffer.from(code_language, 'base64').toString();
    stdin = Buffer.from(stdin, 'base64').toString();
    source_code = Buffer.from(source_code, 'base64').toString();
    if (!submissionToken) {
        res.status(500).send('Error generating submission token');
        return;
    }
    try {
        const [rows, fields] = yield dbconfig_1.pool.query('INSERT INTO submissions (username, code_language, stdin, source_code, submissionToken) VALUES (?,?,?,?,?)', [username, code_language, stdin, source_code, submissionToken]);
        res.json({ message: 'Submission successful' });
    }
    catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).send('Server error');
    }
}));
// CREATE TABLE submissions (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   code_language VARCHAR(255) NOT NULL,
//   stdin TEXT,
//   source_code TEXT NOT NULL,
//   submissionToken TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
exports.default = router;
