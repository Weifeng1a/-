const jwt = require("jsonwebtoken");

const secretKey = "secretKey";

// 生成token
const generateToken = function (payload) { 
  const token =
    "Bearer " +
    jwt.sign(payload, secretKey, {
      expiresIn:'10h',
    });
  return token;
};

// 验证token
const verifyToken = function (req, res, next) {
  const token = req.headers?.authorization.split(" ")[1];
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
      return res.json({ code: "401", msg: "token无效" });
    }
    console.log("verify decoded", decoded);
    next();
  });
};

module.exports={
    generateToken,
    verifyToken
}