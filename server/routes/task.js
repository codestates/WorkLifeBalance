const express = require('express');
const router = express.Router();
const { taskController } = require('../controller');

router.post('/create', taskController.create.post);
router.post('/update', taskController.update.post);
router.post('/delete', taskController.delete.post);
router.post('/check', taskController.check.post);
router.get('/list', taskController.list.get);

module.exports = router;
