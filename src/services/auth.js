import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Handlebars from "handlebars";
import * as path from "node:path";
import * as fs from "node:fs/promises";

import { UserCollection } from "../db/models/User.js";
import { SessionCollection } from "../db/models/Session.js";
import { accessTokenLifeTime, refreshTokenLifeTime } from "../constants/users.js";

import {SMTP, TEMPLATES_DIR } from "../constants/index.js";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendMail.js";

const createSession = () => {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: Date.now() + accessTokenLifeTime,
        refreshTokenValidUntil: Date.now() + refreshTokenLifeTime
    };
};

const emailTemplatePath = path.join(
    TEMPLATES_DIR,
    'verify-email.html',
);

const appDomain = env(SMTP.APP_DOMAIN);
const jwtSecret = env(SMTP.JW_SECRET);

export const register = async (payload) => {
    const { email, password } = payload;
    const user = await UserCollection.findOne({ email });


    if (user) {
        throw createHttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    return await UserCollection.create({
        ...payload,
        password: hashPassword
    });


};

export const login = async ({ email, password }) => {
    const user = await UserCollection.findOne({email});

    if (!user) {
        throw createHttpError(401, "Email or password invalid, try again:)");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw createHttpError(401, "Email or password invalid, try again:)");
    }

    await SessionCollection.deleteOne({ userId: user._id });

    const newSession = createSession();

    return SessionCollection.create({
        userId: user._id,
        ...newSession
    });
};

export const refreshUserSession = async (refresh, userId) => {
    const session = await SessionCollection.findOne(userId, refresh);


    if (!session) {
        throw createHttpError(401, "Session not found");
    };

    if (Date.now() > session.refreshTokenValidUntil) {
        throw createHttpError(401, "Session token expired");
    };

    await SessionCollection.deleteOne({ userId: session.userId });

    const newSession = createSession();

    return SessionCollection.create({
        userId: session.userId,
        ...newSession
    });
};

export const logout = async (sessionId) => {
    await SessionCollection.deleteOne({ _id: sessionId });
};

export const findSession = filter => SessionCollection.findOne(filter);

export const findUser = filter => UserCollection.findOne(filter);

export const requestResetToken = async(email) => {
    const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  };

  const resetToken = jwt.sign(
    {
        sub: user._id,
        email,
    },
    jwtSecret,
    {
        expiresIn: "5m",
    },
  );

  const templateSource = await fs.readFile(emailTemplatePath, "utf-8");

const template = Handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${appDomain}/reset-pwd?token=${resetToken}`,
});

 const send  = await sendEmail({
    to: email,
    subject: 'Reset your password',
    html,
  });

  if (!send) {
    throw createHttpError(500, "Failed to send the email, please try again later.");
  }

  return send;
};

export const resetPwd = async (payload) => {
    let entries;

    try {
      entries = jwt.verify(payload.token, jwtSecret);

    } catch (err) {
      if (err instanceof Error) throw createHttpError(401, "Token is expired or invalid.");
    }

    const user = await UserCollection.findOne({
      email: entries.email,
      _id: entries.sub,
    });

    if (!user) {
        throw createHttpError(404, "User not found!");
    }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

   return await UserCollection.updateOne(
      { _id: user._id },
      { password: encryptedPassword },
    );
};
