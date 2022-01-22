let express = require('express');
let router = express.Router();
let {home} = require('../controllers/homeController');

/* GET */
router.get('/', home)

module.exports = router;