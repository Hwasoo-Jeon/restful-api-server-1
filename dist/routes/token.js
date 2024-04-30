"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_json_1 = __importDefault(require("../role.json"));
const router = express_1.default.Router();
/*
interface Roles {
  super: number;
  admin: number;
  member: number;
}

interface Authorization {
  super: string[];
  admin: string[];
  member: string[];
}

interface RoleData {
  role: Roles;
  authorization: Authorization;
}
*/
const roleData = role_json_1.default;
function getPermissionsForRole(inputRole) {
    // 입력받은 role이 유효한지 확인
    if (inputRole in roleData.role) {
        // role에 해당하는 인덱스를 찾아 권한 배열을 반환
        const roleIndex = roleData.role[inputRole];
        return roleData.authorization[roleIndex];
    }
    else {
        // 유효하지 않은 role의 경우
        return undefined;
    }
}
router.post("/role/:role", (req, res, next) => {
    // 환경 변수를 사용하여 SUBMIT_URL 설정
    const { PUBLIC_URL } = process.env;
    const userRole = req.query.role;
    const result = getPermissionsForRole(userRole);
    if (result) {
        res.json({
            code: 200,
            result: result,
        });
    }
    else {
        res.status(400).json({
            code: 400,
            message: "Invalid role",
        });
    }
});
exports.default = router;
