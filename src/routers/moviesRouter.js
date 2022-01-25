let express = require('express');
let router = express.Router();
let {
    movies,
    movieCreate,
    movieDelete,
    movieUpdate,
    movie} = require('../controllers/moviesController');
let verifyToken = require('../middlewares/verifyToken')

/* GET */
router.get('/', movies);
router.get('/:id', movie);
/* POST */
router.post('/', verifyToken, movieCreate);
/* PUT */
router.put('/:id', verifyToken, movieUpdate);
/* DELETE */
router.delete('/:id', verifyToken, movieDelete);

module.exports = router;