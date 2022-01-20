const express = require('express');
const router = express.Router();
const { userController } = require('../controller/index');

// POST /user/login
// ? router.post('/login', userController.login.post);

// POST /user/logout
// POST /user/signup

// POST /user/check
router.post('/check', userController.check.post);

// POST /user/delete
router.post('/delete', userController.delete.post);

// POST /user/update
router.post('/update', userController.update.post);

// GET /user/info

module.exports = router;
