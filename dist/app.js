"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path")); //파일 및 디렉토리 경로 작업 용도
const cookie_parser_1 = __importDefault(require("cookie-parser")); //cookie-parser 미들웨어를 불러옵니다. 이는 요청된 쿠키를 파싱하여 req.cookies로 접근하게 함.
const morgan_1 = __importDefault(require("morgan")); //morgan 미들웨어를 불러옵니다. HTTP 요청 로거로서, 요청에 대한 정보를 로그로 기록하는 데 사용
// import { fileURLToPath } from "url";
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const test_1 = __importDefault(require("./routes/test"));
const app = (0, express_1.default)();
//logger 설정
morgan_1.default.token("date", function (req, res) {
    return new Date().toLocaleString();
});
morgan_1.default.token("access", function (req, res) {
    return req.ip;
});
morgan_1.default.format("myformat", "[ :date ] :access :method :url :status :response-time ms");
app.use((0, morgan_1.default)("myformat")); //HTTP 요청 로그를 개발자 친화적 형식으로 출력
app.use(express_1.default.json()); //들어오는 요청 본문(body)을 JSON 형식으로 파싱
app.use(express_1.default.urlencoded({ extended: true })); //URL 인코딩된 데이터를 파싱합니다. extended: false는 라이브러리 querystring을 사용함(ex form 태그)
app.use((0, cookie_parser_1.default)()); //요청된 쿠키를 파싱
app.use(express_1.default.static(path_1.default.join(__dirname, "public"))); //정적 파일을 제공하기 위한 경로를 설정합니다. 여기서 __dirname은 현재 실행 중인 스크립트가 위치한 디렉토리의 절대 경로
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "public/views")); // view 파일들이 모여있는 폴더 지정
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use("/test", test_1.default);
exports.default = app;
