const db = require('../database/models');
const axios = require('axios')
module.exports = {
    test: (req, res) => {
        const genresDB = db.Genre.findAll()
        const charactersDB = db.Character.findAll()
        const moviesOrSeriesDB = db.MovieOrSerie.findAll()
        Promise.all([genresDB, charactersDB, moviesOrSeriesDB])
        .then(([genres, characters, moviesOrSeries]) => {
            res.render('test', {
                genres, 
                characters, 
                moviesOrSeries
            })
        })
        
    },
    movieEditView: (req, res) => {
        db.MovieOrSerie.findOne({
            where: {
                id: req.params.id
            }
        }).then(movieOrSerie => {
            db.Character.findAll()
            .then(characters => {
                if(movieOrSerie != null){
                    res.render('testEditMovie', {
                        movieOrSerie,
                        characters
                    })
                }else {
                    res.status(404).json({
                        error: 'No content'
                    })
                }
            })
            
        })
    },
    characterEditView: (req, res) => {
        db.Character.findOne({
            where: {
                id: req.params.id
            }
        }).then(character => {
            if(character != null){
                res.render('testEditCharacter', {
                    character
                })
            }else {
                res.status(404).json({
                    error: 'No content'
                })
            }
        })
    },
}