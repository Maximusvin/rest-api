const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {AppErrors, NotAuthorizedError} = require('../utils/errors');
const {User} = require("../models/user/user-model");
const {userRegistrationValidation, userLoginValidation} = require("../validations/userValidation");

const {SECRET_KEY} = process.env;

const checkSignupUserData = async (req, res, next) => {
    try {
        const {error, value} = userRegistrationValidation(req.body);

        if (error) return next(new AppErrors(400, error.details[0].message));

        const candidate = await User.exists({email: value.email});
        if (candidate) return next(new AppErrors(409, 'Email in use'));
        next();
    } catch (err) {
        next(err)
    }
}

const checkLoginUserData = async (req, res, next) => {
    try {
        const {error, value} = userLoginValidation(req.body);

        if (error) return next(new AppErrors(400, error.details[0].message));

        const user = await User.findOne({email: value.email});
        if (!user) return next(new NotAuthorizedError('Email or password is wrong'));

        const isPasswordCorrect = await bcrypt.compare(value.password, user.password);
        if (!isPasswordCorrect) return next(new NotAuthorizedError('Email or password is wrong'));

        req.body.user = user;

        next();
    } catch (err) {
        next(err)
    }
}

const checkJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return next(new NotAuthorizedError('Not authorized'));

        const payload = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(payload.id);

        if (!user) return next(new NotAuthorizedError('Not authorized'));

        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkSignupUserData,
    checkLoginUserData,
    checkJwt,
}