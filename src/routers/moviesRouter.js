let express = require('express');
let router = express.Router();
let {
    movies,
    movieCreate,
    movieDelete,
    movieUpdate,
    movie,
    movieSearch} = require('../controllers/moviesController');

/* GET */
router.get('/', movies)
router.get('/:id', movie)
/* POST */
router.post('/', movieCreate)
/* PUT */
router.put('/:id', movieUpdate)
/* DELETE */
router.delete('/:id', movieDelete)

module.exports = router;