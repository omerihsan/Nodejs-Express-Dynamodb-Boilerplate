const tokens_config = {
    bearer_token:
    {
        secret: process.env.NODE_ENV === ('production' || 'prod') ? process.env.JWT_SECRET : 'super secret',
        expireTime: '5m',
    },
    bearer_refresh_token:
    {
        secret: process.env.NODE_ENV === ('production' || 'prod') ? process.env.JWT_OAUTH_REFRESH_TOKEN : 'super refresh secret',
        expireTime: '36h'
    }

};



module.exports = tokens_config;