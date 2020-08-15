const AuthService = require('../services/authentication.service');

module.exports = (req, res, next) => {

    if (!req.header('Authorization')) {
        return res.status(401).json({ error: { code: 'MISSING_AUTH_TOKEN', message: 'Need authorization token to access this endpoint' } });
    }

    const tokenSplit = req.header('Authorization').split(' ');

    if (!tokenSplit.length === 2) {
        return res.status(401).json({ error: { code: 'INVALID_AUTH_TOKEN_FORMAT', message: 'Format required "Authorization: Bearer [token]"' } });
    }

    const auth_scheme = tokenSplit[0];
    const auth_token = tokenSplit[1];

    if (!/^Bearer$/.test(auth_scheme)) {
        return res.status(401).json({ error: { code: 'INVALID_AUTH_TOKEN_FORMAT', message: 'Format required "Authorization: Bearer [token]"' } });
    }

    return AuthService().verifyBearerToken(auth_token, function (err, data) {
        if (err) return res.status(401).json({ error: { code: 'INVALID_AUTH_TOKEN', message: 'Token is expired/invalid' } });
        req.token = data;
        return next();
    }
    );

};
