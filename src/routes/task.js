const express = require('express');
const router = express.Router();
const controller = require('../controllers/task');

router.post('/', controller.createTask);
router.get('/', controller.getTasks);
router.put('/:id', controller.updateTask);

router.patch('/:id/assign', controller.assignTask);
router.post('/:id/comment', controller.addComment);

module.exports = router;