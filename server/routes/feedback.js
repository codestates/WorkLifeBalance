const express = require('express');
const router = express.Router();
const { feedbackController } = require('../controller');

router.post('/update', feedbackController.update.post);
router.post('/info', feedbackController.info.post);

module.exports = router;
