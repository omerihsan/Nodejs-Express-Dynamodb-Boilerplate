const authMiddleware = require('../../app/middlewares/auth.middleware')

const oauthRoutes = {
    'POST /signin' : 'signin.controller.signinUser',
    'POST /signup' : 'signup.controller.signupUser',
    'GET /profile': {
        path: 'user.controller.getUser',
        middlewares: [
            authMiddleware
        ],
    }
};

module.exports = oauthRoutes;
