let express = require('express');
let router = express.Router();
let {
    login,
    register} = require('../controllers/authController');

/* GET */
router.get('/', login)
router.get('/', register)

module.exports = router;