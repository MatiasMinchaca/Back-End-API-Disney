let express = require('express');
let router = express.Router();
let {
    test} = require('../controllers/testController');

/* GET */
router.get('/', test)


module.exports = router;