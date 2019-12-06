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
    const listId = req.params.listID;

    try {
        const list = await List.findById(listId);
        // if the list is defined public anyone can get it.
        const userIsAuthorizedToGetList = list.isPublic || list.creator.toString() === req.userId.toString();
        errors.errorCheckHandler(list, 'List was not found.', 404);
        errors.errorCheckHandler(userIsAuthorizedToGetList, 'user is unauthorized.', 401);
        res.status(200).json({
                message: 'Fetched list successfully!',
                todoList: list,
            }
        );

    } catch (err) {
        errors.asyncErrorHandler(err, next);
    }


}

exports.createList = (req, res, next) => async {
    errors.validationResultErrorHandler(req);
    const listName = req.body.name;
    const isPublic = req.body.isPublic;




}

exports.editList = (req, res, next) => {

}

exports.removeList = (req, res, next) => {

}


exports.addTodoItemToList = (req, res, next) => {

}
exports.removeTodoItemFromList = (req, res, next) => {

}
exports.editTodoItemInList = (req, res, next) => {

}