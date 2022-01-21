const express = require('express');
const router = express.Router();
const { taskController } = require('../controller');

// POST /task/create
router.post('/create', taskController.create.post);
// POST /task/update
router.post('/update', taskController.update.post);
// POST /task/delete
router.post('/delete', taskController.delete.post);
// POST /task/check
router.post('/check', taskController.check.post);
// GET /task/list
router.get('/list', taskController.list.get);

module.exports = router;
