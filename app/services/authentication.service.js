const jwt = require('jsonwebtoken');
const JWTConfig = require('../../config/JWT.config')

const authService = () => {
  const issueBearerToken = function (payload) {
    return jwt.sign(payload, JWTConfig['bearer_token'].secret, { expiresIn: JWTConfig['bearer_token'].expireTime });
  }

  const verifyBearerToken = function (token, cb) {
    return jwt.verify(token, JWTConfig['bearer_token'].secret, {}, cb);
  }

  const issueRefreshToken = function (payload) {
    return jwt.sign(payload, JWTConfig['bearer_refresh_token'].secret, { expiresIn: JWTConfig['bearer_refresh_token'].expireTime });
  }

  const verifyRefreshToken = function (token, cb) {
    return jwt.verify(token, JWTConfig['bearer_refresh_token'].secret, {}, cb);
  }

  return {
    issueBearerToken,
    verifyBearerToken,
    issueRefreshToken,
    verifyRefreshToken
  };
};

module.exports = authService;


