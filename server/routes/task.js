const express = require('express');
const router = express.Router();
const { taskController } = require('../controller');

router.post('/create', taskController.create.post);
router.post('/update', taskController.update.post);
router.post('/delete', taskController.delete.post);
router.post('/check', taskController.check.post);
router.post('/list', taskController.list.post);
router.post('/info', taskController.info.post);

module.exports = router;
