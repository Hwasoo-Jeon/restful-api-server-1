import express, { NextFunction, Response, Request } from "express";
import roleDataJson from "../role.json";
const router = express.Router();
// roleData.json 파일의 구조에 맞춘 타입 정의
interface RoleData {
  role: {
    [key: string]: number;
  };
  authorization: {
    [key: string]: string[];
  };
}
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

const roleData: RoleData = roleDataJson;

function getPermissionsForRole(inputRole: string): string[] | undefined {
  // 입력받은 role이 유효한지 확인
  if (inputRole in roleData.role) {
    // role에 해당하는 인덱스를 찾아 권한 배열을 반환
    const roleIndex = roleData.role[inputRole];
    return roleData.authorization[roleIndex];
  } else {
    // 유효하지 않은 role의 경우
    return undefined;
  }
}

router.post(
  "/role/:role",
  (req: Request, res: Response, next: NextFunction) => {
    // 환경 변수를 사용하여 SUBMIT_URL 설정
    const { PUBLIC_URL } = process.env;
    const userRole = req.query.role as string;
    const result = getPermissionsForRole(userRole);
    if (result) {
      res.json({
        code: 200,
        result: result,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Invalid role",
      });
    }
  }
);

export default router;
