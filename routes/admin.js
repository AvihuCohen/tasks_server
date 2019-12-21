const express = require('express');
const adminController = require('../controllers/admin');

//validations
const validations = require('../util/validations/admin-validations');

// middleware
const isAuth = require('../middlewares/is-auth');


const router = express.Router();

// /admin/lists => GET
router.get('/lists', isAuth, adminController.getLists);

// /admin/list/:listId => GET
router.get('/list/:listName', isAuth, adminController.getList);

// /admin/list => Post
router.post('/list', isAuth, validations.editOrCreateListValidations, adminController.createList);

// /admin/list/:listId => Put
router.put('/list/:listId', isAuth, validations.editOrCreateListValidations, adminController.editList);

// /admin/list/:listId => Delete
router.delete('/list/:listId', isAuth, validations.removeListValidations, adminController.removeList);

// /admin/todo-item => Post
router.post('/todo-item/:listId', isAuth, validations.addTodoItemValidations, adminController.addTodoItemToList);

// /admin/todo-item => Put
router.put('/todo-item/:id', isAuth, validations.editTodoItemValidations, adminController.editTodoItemInList);

// /admin/todo-item/:todo-item-Id => Delete
router.delete('/todo-item/:id', isAuth, adminController.removeTodoItemFromList);

module.exports = router;



