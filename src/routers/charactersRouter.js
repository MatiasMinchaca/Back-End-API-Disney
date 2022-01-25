let express = require('express');
let router = express.Router();
let {characters, 
    characterCreate,
    characterDelete,
    characterUpdate,
    character} = require('../controllers/charactersController');
let verifyToken = require('../middlewares/verifyToken');
/* GET */
router.get('/', characters);
router.get('/:id', character);
/* POST */
router.post('/', verifyToken, characterCreate);
/* PUT */
router.put('/:id', verifyToken, characterUpdate);
/* DELETE */
router.delete('/:id', verifyToken, characterDelete);
module.exports = router;