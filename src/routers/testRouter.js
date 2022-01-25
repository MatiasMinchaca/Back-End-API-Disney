let express = require('express');
let router = express.Router();
let {
    test, 
    characterEditView, 
    movieEditView} = require('../controllers/testController');

/* GET */
router.get('/', test);
router.get('/character/:id', characterEditView);
router.get('/movie/:id', movieEditView);

module.exports = router;