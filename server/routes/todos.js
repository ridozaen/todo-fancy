const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const isAuthorized = require('../middleware/authorization');


router.get('/', todoController.showTodo);
router.post('/', todoController.addTodo);
router.put('/:id', isAuthorized,todoController.updateTodo);
router.put('/done/:id',isAuthorized,todoController.doneTodo);
router.delete('/:id', isAuthorized, todoController.deleteTodo);

module.exports = router;