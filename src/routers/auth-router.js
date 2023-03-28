const {Router} = require('express');
const {
    registrationController,
    loginController,
    logoutController,
    getCurrentUserController,
    updateSubscriptionUser,
} = require("../controllers/auth-controller");
const {
    checkSignupUserData,
    checkLoginUserData,
    checkJwt,
} = require("../middlewares/authMiddleware");

const authRouter = Router();

authRouter.post('/register', checkSignupUserData, registrationController);
authRouter.post('/login', checkLoginUserData, loginController);
authRouter.post('/logout', checkJwt, logoutController);
authRouter.get('/current', checkJwt, getCurrentUserController);
authRouter.patch('/', checkJwt, updateSubscriptionUser);

module.exports = authRouter;