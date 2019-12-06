const express = require('express');
const adminController = require('../controllers/admin');

//validations
const validations = require('../util/validations/admin-validations');


const router = express.Router();

// /admin/lists => GET
router.get('/lists', adminController.getLists);

// /admin/list/:listID => GET
router.get('/list/:listID', adminController.getList);

// /admin/list => Post
router.post('/list', validations.editOrCreateListValidations, adminController.createList);

// /admin/list/:listID => Put
router.put('/list/:listID', validations.editOrCreateListValidations, adminController.editList);

// /admin/list/:listID => Delete
router.delete('/list/:listID', validations.removeListValidations, adminController.removeList);

// /admin/todo-item => Post
router.post('/todo-item/:listID', adminController.addTodoItemToList);

// /admin/todo-item => Put
router.put('/todo-item/:id', adminController.editTodoItemInList);

// /admin/todo-item/:todo-item-Id => Delete
router.delete('/todo-item/:id', adminController.removeTodoItemFromList);

module.exports = router;



