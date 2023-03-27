const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user/user-model');

const {SECRET_KEY} = process.env;

const generateToken = (id) => jwt.sign({id}, SECRET_KEY, {expiresIn: '1h'});

const registrationController = async (req, res, next) => {
    try {
        const {email, subscription} = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });

        res.status(201).json({
            user: {
                email,
                subscription,
            },
        });
    } catch (err) {
        next(err);
    }
}

const loginController = async (req, res, next) => {
    try {
        const {_id, email, subscription} = req.body.user;
        const token = generateToken(_id);

        await User.findOneAndUpdate({email}, {token});

        res.status(200).json({
            token,
            user: {email, subscription},
        });
    } catch (err) {
        next(err.message);
    }
}

const logoutController = async (req, res, next) => {
    try {
        const {_id} = req.user;

        await User.findByIdAndUpdate(_id, {token: null}, {new: true});

        res.status(204).json({status: 204});
    } catch (err) {
        next(err.message);
    }
}

const getCurrentUserController = async (req, res, next) => {
    try {
        const {email, subscription} = req.user;
        res.status(200).json({email, subscription});
    } catch (err) {
        next(err.message);
    }
}

const updateSubscriptionUser = async (req, res, next) => {
    try {
        const key = 'subscription';
        const userSubscriptions = ["starter", "pro", "business"];

        if (!(key in req.user)) {
            return res.status(400).json({message: "missing field favorite"});
        }

        if (!userSubscriptions.includes(req.body[key])) {
            return res.status(400).json({message: `The subscript must have one of the following values: ${userSubscriptions}`});
        }

        const {email, subscription} = await User.findByIdAndUpdate(req.user._id, req.body, {new: true});

        if (!email) {
            return res.status(404).json({message: 'Contact not found'});
        }

        res.status(200).json({email, subscription});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    getCurrentUserController,
    updateSubscriptionUser,
}
