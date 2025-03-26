const express = require('express');
const router = express.Router();
const adminControllers = require('../controller/admin.controller');


//register user
router.post('/register', adminControllers.registerAdminController);




module.exports = router;