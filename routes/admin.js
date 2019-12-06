const express = require('express');
const adminController = require('../controllers/admin');

//validations
const validations = require('../util/validations/admin-validations');


const router = express.Router();

// /admin/lists => GET
router.get('/lists', adminController.getLists);

// /admin/list/:listId => GET
router.get('/list/:listId', adminController.getList);

// /admin/list => Post
router.post('/list', validations.editOrCreateListValidations, adminController.createList);

// /admin/list/:listId => Put
router.put('/list/:listId', validations.editOrCreateListValidations, adminController.editList);

// /admin/list/:listId => Delete
router.delete('/list/:listId', validations.removeListValidations, adminController.removeList);

// /admin/todo-item => Post
router.post('/todo-item/:listId', validations.addTodoItemValidations, adminController.addTodoItemToList);

// /admin/todo-item => Put
router.put('/todo-item/:id', validations.editTodoItemValidations, adminController.editTodoItemInList);

// /admin/todo-item/:todo-item-Id => Delete
router.delete('/todo-item/:id', adminController.removeTodoItemFromList);

module.exports = router;



