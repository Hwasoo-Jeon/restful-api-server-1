"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get("/", (req, res, next) => {
    // 환경 변수를 사용하여 SUBMIT_URL 설정
    const { PUBLIC_URL } = process.env;
    res.render("index.ejs", {
        name: "방문자",
        SUBMIT_URL: PUBLIC_URL,
    });
});
router.post("/urlbody", (req, res, next) => {
    // 비구조화 할당
    const { key1 } = req.body;
    console.log(JSON.stringify(req.body));
    res.send(JSON.stringify({
        code: 200,
        result: key1,
    }));
});
exports.default = router;
