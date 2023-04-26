const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        "secret_1D3._0A$)!_)N@!#()!I*E(AD<02L>?"
      );
      console.log(decoded);
      req.userInfo = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        message: "Permission denied",
      });
    }
  } else {
    res.status(403).json({
      message: "Permission denied",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    if (req.userInfo.role == "admin") {
      next();
    } else {
      res.status(403).json({
        message: "Permission denied",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "Permission denied",
    });
  }
};

