const express = require('express');
const router = express.Router();
const { feedbackController } = require('../controller');

router.post('/update', feedbackController.update.post);
router.get('/info', feedbackController.info.get);

module.exports = router;
