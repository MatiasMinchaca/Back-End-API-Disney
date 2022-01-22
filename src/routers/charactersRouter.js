let express = require('express');
let router = express.Router();
let {characters, 
    characterCreate} = require('../controllers/charactersController');

/* GET */
router.get('/', characters)
/* POST */
router.post('/', characterCreate)

module.exports = router;