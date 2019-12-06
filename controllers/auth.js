const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const files = require('../util/files/file');
const errors = require('../util/errors/error-handlers');

//mongoose model
const User = require('../models/user');
const List = require('../models/list');
const TodoItem = require('../models/todoItem');


exports.signup = async (req, res, next) => {
    errors.validationResultErrorHandler(req);
    errors.errorCheckHandler(req.file, 'No image provided.', 422);
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const imagePath = req.file.path;

    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashPassword,
            imagePath: imagePath
        });

    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};


exports.login = async (req, res, next) => {
    errors.validationResultErrorHandler(req);
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    try {
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
        res.status(200).json({token: token, userId: user._id.toString()});

    } catch (err) {
        errors.asyncErrorHandler(err, next);

    }
};

exports.getUserProfile = async (req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        errors.errorCheckHandler(user, 'User Not Found', 404);
        let profile = {
            name: user.name,
            email: user.email,
            imagePath: user.imagePath
        };
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
}

exports.editUserProfile = async (req, res, next) => {
    errors.validationResultErrorHandler(req);
    errors.errorCheckHandler(req.file, 'No image provided.', 422);
    const filePath = req.file.path;
    const email = req.body.email;
    const name = req.body.name;

    try {
        const user = await User.findById(req.userId);
        errors.errorCheckHandler(user, 'User Not Found', 404);
        if (filePath !== user.imagePath) {
            files.clearImage(user.imagePath);
        }
        user.imagePath = filePath;
        user.email = email;
        user.name = name;
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





