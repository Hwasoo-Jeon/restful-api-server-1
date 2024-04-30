import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

function getRoleInfo(role: String) {
  const payload = { username: role };
  const token = jwt.sign(payload, secretKey);
}

export { getRoleInfo };
