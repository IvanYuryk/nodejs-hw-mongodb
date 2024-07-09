import createError from "http-errors";
import { signup, findUser } from "../services/auth.js";
import {compareHash} from "../utils/hash.js";
import { createSession } from "../services/session.js";

export const signupController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
      throw createError(409, 'Email in use');
    }
      const newUser = await signup(req.body);
      const data = {
        name: newUser.name,
        email: newUser.email,
      };
      res.status(201).json({
        status: 'success',
        data,
        message: 'User signed up successfully',
      });
    };
 

  export const signinController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
      if (!user) {
        throw createError(404, 'Email not found');
      }
      
      const passwordCompare = await compareHash(password, user.password);
      if (!passwordCompare) {
        throw createError(401, 'Password invalid');
    }

    const {accessToken, refreshToken, _id, refreshTokenValidUntil} = await createSession(user._id);
    
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });


    res.json({
        status: 'success',
        message: "User signed in successfully",
        data: {
            accessToken: accessToken,
        }
    });
};