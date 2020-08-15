const bcrypt = require('bcryptjs');
const saltRounds = 8;


const bcryptService = () => {
    const password = async function (pw) {
        return bcrypt.hash(pw, saltRounds);
    };

    const comparePassword = async function (pw, hash) {
        return bcrypt.compare(pw, hash)
    };

    return {
        password,
        comparePassword,
    };
};

module.exports = bcryptService;

