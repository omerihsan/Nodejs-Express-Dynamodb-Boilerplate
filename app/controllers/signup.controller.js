const model_user = require('../models/User');
const bcryptService = require('../services/bcrypt.service');
const validation_email = require('../services/validation.service');
const { v4: uuidv4 } = require('uuid');

//TODO : check if the email already exists
//TODO : create user service
const SignupController = () => {
    const signupUser = async (req, res) => {
        const { body } = req;

        //quick/dirty way -> can be improved
        if (body.email == null || body.password == null || body.name == null) {
            return res.status(404).json({ error: { message: 'fields are required' } });
        }

        //Validating Email Format
        if (!validation_email(body.email)) {
            return res.status(400).json({ error: { message: 'Email not valid' } });
        }

        var passwordHash = await bcryptService().password(body.password);

        var _user = new model_user({
            uid: uuidv4(),
            email: body.email,
            password: passwordHash,
            name: body.name
        });

        //dynamoose model.create is another option which has overwirte set to false
        _user.save()
        .then(function () {
            res.status(200).json({
                message: 'User Created',
            });
        })
        .catch(function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: { message: err.message } });
            }
        });
    };

    return {
        signupUser
    };
};

module.exports = SignupController;