let express = require('express');
let router = express.Router();
let {
    login,
    register} = require('../controllers/authController');

/* POST */
router.post('/login', login);
router.post('/register', register);

module.exports = router;