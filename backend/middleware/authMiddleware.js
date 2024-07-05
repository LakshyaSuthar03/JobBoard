import jwt from "jsonwebtoken";
import userModel from "../database/models/userModel.js";

export const authMiddleware = (req, res, next) => {

  const accessToken =
    req.cookies?.accessToken ||
    req.headers["authorization"]?.split(" ")[1] ||
    req.body.accessToken ||
    req.query.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {

    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden" });
    }

    const userDetail = await userModel.findById(decodedToken._id).select("-password");

      try {
        if (!userDetail) {
          return res.status(403).json({ message: "User not found" });
        }
      } catch (error) {
         return res.status(403).json({ message: "Forbidden" });
      }
      req.user = userDetail;
      next();
    });
  };

