// // middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin access only" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // req.user = await User.findById(decoded.id).select("-password");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach both id and isAdmin to req.user
      req.user = {
        id: decoded.id,
        isAdmin: decoded.isAdmin,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied, admin only" });
//   }
// };

export const adminOnly = (req, res, next) => {
  console.log("Decoded user in adminOnly →", req.user); // 👈 add this
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
