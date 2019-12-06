const errors = require('../util/errors/error-handlers');

//mongoose model
const User = require('../models/user');
const List = require('../models/list');
const TodoItem = require('../models/todoItem');

exports.getLists = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 10;
        const totalItems = await List.find({creator: req.userId}).countDocuments();
        const userLists = await List.find({creator: req.userId})
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        errors.errorCheckHandler(userLists, "User doesn't has any list.", 404);
        res.status(200).json({
                message: 'Fetched all user lists successfully!',
                todoLists: userLists,
                totalItems: totalItems
            }
        );
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};

exports.getList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const list = await List.findById(listId);
        // if the list is defined public anyone can get it.
        const userIsAuthorizedToGetList = list.isPublic || list.creator.toString() === req.userId.toString();
        errors.errorCheckHandler(list, 'List was not found.', 404);
        errors.errorCheckHandler(userIsAuthorizedToGetList, 'User is unauthorized.', 401);
        res.status(200).json({
                message: 'Fetched list successfully!',
                todoList: list,
            }
        );

    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};

exports.createList = async (req, res, next) => {
    errors.validationResultErrorHandler(req);
    const listName = req.body.name;
    const isPublic = req.body.isPublic;
    const list = new List({
        name: listName,
        isPublic: isPublic,
        tasks: [],
        creator: req.userId,
        isRemovable: true
    });

    try {
        console.log("Line 63 - Potential bug");
        await list.save();
        const user = await User.findById(req.userId);
        user.lists.push(list);
        await user.save();
        res.status(200).json({
            message: 'Create a new list successfully.',
            creator: {_id: user._id, name: user.name},
            list: list
        });
    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};

exports.editList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        errors.validationResultErrorHandler(req);
        const listName = req.body.name;
        const isPublic = req.body.isPublic;
        const list = await List.findById(listId);
        errors.errorCheckHandler(list, 'List not found.', 404);
        const isAuthorized = list.creator.toString() === req.userId.toString();
        errors.errorCheckHandler(isAuthorized, 'Not authorized to edit list!', 401);
        list.name = listName;
        list.isPublic = isPublic;
        await list.save();
        res.status(200).json({
            message: 'Edit list successfully.',
            creator: {_id: user._id, name: user.name},
            list: list
        });

    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }
};

exports.removeList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const list = await List.findById(listId);
        const taskIds = list.tasks.map(task => task._id);
        await TodoItem.deleteMany({_id : {$in: taskIds}});
        await List.findByIdAndRemove(listId);
        const user = await User.findById(req.userId);
        user.lists.pull(listId);
        await user.save();
        res.status(200).json({
            message: 'Removed list successfully.',
        });
    }catch (err) {
    errors.asyncErrorHandler(err, next);
    }
};


exports.addTodoItemToList = (req, res, next) => {

};

exports.removeTodoItemFromList = (req, res, next) => {

};

exports.editTodoItemInList = (req, res, next) => {

};