const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  console.log("Check auth");
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    console.log("Token found");
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



exports.validateRegister = (req, res, next) => {
  let errors = {};
  const {username, email, password, password_repeat} = req.body;
  if (!username) {
    errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
  } else if (username.length < 2) {
    errors.username = "Slapyvardis turi būti min. 2 simbolių!";
  } else if (username.length > 15) {
    errors.username = "Slapyvardis turi būti max. 15 simbolių!";
  } else if (!/^[a-zA-Z0-9 ]+$/.test(username)) {
    errors.username = "Slapyvardis turi būti sudarytas tik iš lotyniškų raidžių ir skaičių!";
  }

  if (!email) {
    errors.email = "Prašome užpildyti laukelį (El. paštas)";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  ) {
    errors.email = "Neteisingas El. pašto formatas";
  }
  if (!password) {
    errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
  } else if (password.length < 7) {
    errors.password = "Slaptažodis turi būti min. 7 simbolių!";
  } else if (password.length > 50) {
    errors.password = "Slaptažodis turi būti max. 50 simbolių!";
  } else if (!/\d/.test(password)) {
    errors.password = "Slaptažodis turi turėti min. 1 skaičių";
  }
  if (!password_repeat) {
    errors.password_repeat =
      "Prašome užpildyti laukelį (Patvirtinti naują slaptažodį)";
  } else if (password_repeat != password) {
    errors.password_repeat = "Slaptažodžiai nesutampa";
  }

  !Object.keys(errors).length ? next() : res.status(500).json({status: "error", data: errors});
};