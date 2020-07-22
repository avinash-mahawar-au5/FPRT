const jwt = require("jsonwebtoken");
const User = require('../models/User')
const { SECRET_KEY } = require("../config");

// const isAuth = (req, res, next) => {
//   const token = req.header("authToken");

//   if (token) {
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err)
//         return res.status(401).json({ code: 401, message: "Session Expired" });

//       req.user = decoded.data;
//     });
//   }
//   next();
// };

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    const { userId } = decoded;

    User.findOne({ _id: userId })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Auth Failed" });
        }
        req.userData = user;
        console.log("auth success");
        return next();
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    return res.status(401).json({ message: "Auth Failed" });
  }
};

module.exports = { isAuth };
