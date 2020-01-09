const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const files = require('../util/files/file');
const errors = require('../util/errors/error-handlers');

//mongoose model
const User = require('../models/user');
const List = require('../models/list');
const TodoItem = require('../models/todoItem');


exports.signUp = async (req, res, next) => {
    try {
        errors.validationResultErrorHandler(req);

        let imagePath;

        if (!req.file) {
            imagePath = 'images/default-logo.jpg'
        } else {
            imagePath = req.file.path;
        }


        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const gender = req.body.gender;


        const hashPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            name: name,
            gender: gender,
            birthday: "",
            phone: "",
            password: hashPassword,
            imagePath: imagePath,
            lists: []
        });

        await user.save();

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'fitzFarSeerIsTheTrueKingOfTheSixDuchies',
            {expiresIn: '1h'}
        );

        const expiresTimeInMiliseconds = (1000 * 60 * 60);
        res.status(200).json({
            message: 'User signed up successfully.',
            token: token,
            user: {name: user.name, email: user.email, gender: user.gender, birthday: user.birthday, phone: user.phone},
            expiresTimeInMiliseconds: expiresTimeInMiliseconds
        });
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};


exports.login = async (req, res, next) => {
    try {
        errors.validationResultErrorHandler(req);

        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email});
        errors.errorCheckHandler(user, 'A user with this email could not be found.', 401);

        const isEqual = await bcrypt.compare(password, user.password);
        errors.errorCheckHandler(isEqual, 'Wrong password', 401);

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'fitzFarSeerIsTheTrueKingOfTheSixDuchies',
            {expiresIn: '1h'}
        );
        const expiresTimeInMiliseconds = (1000 * 60 * 60);

        res.status(200).json({
                token: token,
                user: {name: user.name, email: user.email, gender: user.gender, birthday: user.birthday, phone: user.phone},
                expiresTimeInMiliseconds: expiresTimeInMiliseconds,
                message: 'User Logged in successfully.'
            }
        );

    } catch (err) {
        console.log(err);
        errors.asyncErrorHandler(err, next);

    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        errors.errorCheckHandler(user, 'User Not Found', 404);

        res.status(200).json({
            user: {name: user.name, email: user.email, gender: user.gender, birthday: user.birthday, phone: user.phone},
        });
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
}

//Todo - to update that user doesn't need to send a file
exports.editUserProfile = async (req, res, next) => {
    try {
        // console.log("editing profile", req.body);

        const user = await User.findById(req.userId);
        errors.errorCheckHandler(user, 'User Not Found', 404);

        let password = user.password;
        if (req.body.password) {
            let newPassword = await bcrypt.hash(req.body.password, 12);
            password = newPassword;

        }
        const email = req.body.email;
        const name = req.body.name;
        const birthday = req.body.birthday;
        const phone = req.body.phone;
        const gender = req.body.gender;


        user.email = email ? email : user.email;
        user.name = name ? name : user.name;
        user.birthday = birthday ? birthday : user.birthday;
        user.phone = phone ? phone : user.phone;
        user.gender = gender ? gender : user.gender;
        user.password = password;

        const result = await user.save();
        res.status(200).json({message: 'User profile was updated.', user: result});
    } catch (e) {
        errors.asyncErrorHandler(err, next);
    }
}
exports.deleteAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        files.clearImage(user.imagePath);
        await TodoItem.deleteMany({creator: user._id});
        await List.deleteMany({creator: user._id});
        await User.findByIdAndRemove(user._id);
        res.status(200).json({message: 'Account was deleted.'});
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};

