const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.post('/signup', userController.signup.post);
router.post('/check', userController.check.post);
router.post('/delete', userController.delete.post);
router.post('/update/info', userController.updateInfo.post);
router.post('/update/password', userController.updatePassword.post);
router.get('/info', userController.info.get);

module.exports = router;
