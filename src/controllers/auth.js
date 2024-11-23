import * as authServices from "../services/auth.js";

const setupSession = (res, session) => {
    const {_id, refreshToken, refreshTokenValidUntil } = session;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });

    res.cookie("userId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });

};

export const registerController = async(req, res) => {
    const {name, email, _id, createdAt, updatedAt } = await authServices.register(req.body);


    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: {
            name,
            email,
            _id,
            createdAt,
            updatedAt,
        },
    });
};

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const refreshSessionController = async (req, res) => {
    const session = await authServices.refreshUserSession(req.cookie);

    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const logoutSessionController = async (req, res) => {
    if (req.cookies.userId) {
        await authServices.logout(req.cookies.userId);
    };

    res.clearCookie("userId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};


export const requestResetEmailController = async (req, res) => {
    const { token } = req.query;

    await authServices.requestResetEmail(token);

    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await authServices.resetPassword(req.body);

    res.json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {},
    })
};
