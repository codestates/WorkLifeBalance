const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
 
// POST /user/login
router.post('/login', userController.login.post);
// POST /user/logout
router.post('/logout', userController.logout.post);
// POST /user/signup
router.post('/signup', userController.signup.post);
// POST /user/check
router.post('/check', userController.checek.post);
// POST /user/delete
router.post('/delete', userController.delete.post);
// POST /user/update
router.post('/update', userController.update.post);
// GET /user/info
router.get('/info', userController.info.get);

module.exports = router;