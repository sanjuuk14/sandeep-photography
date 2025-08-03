import jwt from "jsonwebtoken";
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin, // ✅ this part
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
