const model_user = require('../models/User');

const UserController = () => {

    const getUser = (req, res) => {
        const { token } = req
        //TODO: better approach would be to use dynamoose's model.get(key)
        model_user.scan('uid').contains(token.uid)
            .attributes(['email', 'name'])
            .exec(function (err, user) {
                if (err) {
                    res.status(500).json({ error: { message: 'Internal Server Error' } });
                }
                else if (user.count == 0) {
                    res.status(400).json({ error: { message: 'User not found' } });
                }
                else {
                    let _user = {
                        email : user[0].email,
                        name  : user[0].name
                    }
                    res.status(200).json({ message: 'Successful', data: _user });
                }

            });
    };
    return {
        getUser
    };
};

module.exports = UserController;