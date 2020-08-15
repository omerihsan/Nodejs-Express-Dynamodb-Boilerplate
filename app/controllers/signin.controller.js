const bcryptService = require('../services/bcrypt.service');
const authService = require('../services/authentication.service');
const model_user = require('../models/User');

const SigninController = () => {
    const signinUser = async (req, res) => {
        const { body } = req;

        if (body.email == undefined || body.password == undefined) {
            return res.status(400).json({ error: { message: 'email/password missing' } });
        }

        model_user.scan('email').contains(body.email).all().exec(async function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: { message: 'Internal server error' } });
            }

            if (user.count == 0) {
                return res.status(404).json({ error: { message: 'User not found' } });
            }

            const passwordMatch = await bcryptService().comparePassword(body.password, user[0].password);
            if (!passwordMatch) {
                return res.status(400).json({
                    error: {
                        message: 'incorrect password'
                    }
                });
            }

            const accessToken = authService().issueBearerToken({ uid: user[0].uid });
            const refreshToken = authService().issueRefreshToken({ uid: user[0].uid });

            return res.status(200).json({
                message: 'Sign-in Successful',
                data: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                }
            });
        });
    };

    return {
        signinUser,
    };

};



module.exports = SigninController;