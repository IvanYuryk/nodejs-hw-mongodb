import createError from "http-errors";
import { findSession } from "../services/session.js";
import { findUser } from "../services/auth.js";

export const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return next (createError(401, "Authorization header is missing"));
    };

    const [bearer, accessToken] = authHeader.split(" ");

    if (bearer !== "Bearer") {
      return next(createError(401, "Token must start with Bearer"));
    };

    if (!accessToken) {
        return next(createError(401, "Token missing"));
      };

      const session = await findSession({ accessToken });
      if (!session) {
        return next(createError(401, "Session not found"));
      };

      const accessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
      if (accessTokenExpired) {
        return next(createError(401, "Access token expired"));
      };

      const user = await findUser({ _id: session.userId });

      if (!user) {
        return next(createError(401, "User not found"));
      };

      req.user = user;

      next();

};

