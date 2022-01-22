const db = require('../database/models');
const { Op } = require('sequelize'); 

module.exports = {
    home : (req, res) => {
        const genresDB = db.Genre.findAll()
        const charactersDB = db.Character.findAll()
        const moviesOrSeriesDB = db.MovieOrSerie.findAll()
        Promise.all([genresDB, charactersDB, moviesOrSeriesDB])
        .then(([genres, characters, moviesOrSeries]) => {
            res.send({
                genres, 
                characters, 
                moviesOrSeries
            })
        })
    }
}