import jwt from "jsonwebtoken";

const secretKey = "admin123";

export default function checkAdmin(req, res, next) {
  var token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "You are not authorized" });
  if (token === undefined)
    return res.status(401).json({ message: "You are not authorized" });
  token = token.replace("Bearer ", "");

  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(400).json({ message: "Invalid token" });
      if (user.data.role !== "admin")
        return res.status(401).json({ message: "You are not authorized" });

      next();
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}
