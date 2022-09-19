import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const authWare = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Access Denied!",
      });
    }
    try {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  export default authWare;
  