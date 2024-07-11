import {randomBytes} from "node:crypto";

import {Session} from "../db/models/session.js";

import {ACCESS_LIFETIME, REFRESH_LIFETIME} from "../constants/index.js";

export const findSession = filter => Session.findOne(filter);

export const createSession = async(userId) => {
    await Session.deleteOne({ userId });

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    const accessTokenValidUntil = new Date(Date.now() + ACCESS_LIFETIME);
    const refreshTokenValidUntil = new Date(Date.now() + REFRESH_LIFETIME);

    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    });
};

export const deleteSession = filter => Session.deleteOne(filter);
