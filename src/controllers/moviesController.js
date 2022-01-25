const db = require('../database/models');
const { Op } = require('sequelize'); 
const moment = require('moment')
const axios = require('axios')
module.exports = {
    movies: (req, res) => {
        const search = req.query
        if(Object.keys(search).length > 0){
            if(Object.keys(search)[0] == 'title'){
                db.MovieOrSerie.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: `%${Object.values(search)[0]}%`
                                }
                            }
                        ]
                    },
                    order:[
                        ['title', Object.keys(search)[1] == 'order' && Object.keys(search)[1] != undefined ? Object.values(search)[1] !== undefined ? Object.values(search)[1].toUpperCase() == 'ASC' || Object.values(search)[1].toUpperCase() == 'DESC' ? Object.values(search)[1].toUpperCase() : 'ASC' : 'ASC' : 'ASC' ]
                    ],
                    attributes: ['image', 'title', 'created_date']
                }).then(MoviesOrSeries => {
                    if(MoviesOrSeries.length > 0){
                        res.status(200).json(MoviesOrSeries)
                    } else{
                        res.status(404).json({
                            error: 'No Content'
                        })
                    }
                })
            }else if(Object.keys(search)[0] == 'genre'){
                db.Genre.findOne({
                    where: {
                        id: Object.values(search)[0]
                    },
                    include: [
                        {association: 'MoviesOrSeries',
                        attributes: ['image', 'title', 'created_date']
                    }
                    ]
                }).then(genre => {
                    let dataMovies = genre.MoviesOrSeries
                    if(dataMovies.length > 0){
                        res.status(200).json(dataMovies)
                    } else{
                        res.status(404).json({
                            error: 'No Content'
                        })
                    }
                })
            }else if(Object.keys(search)[0] == 'order'){
                if(Object.keys(search)[1] == 'title'){
                    db.MovieOrSerie.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    title: {
                                        [Op.like]: `%${Object.values(search)[1]}%`,
                                    },
                                }
                            ]
                        },
                        order:[
                            ['title', Object.values(search)[0] !== undefined ? Object.values(search)[0].toUpperCase() == 'ASC' || Object.values(search)[0].toUpperCase() == 'DESC' ? Object.values(search)[0].toUpperCase() : 'ASC' : 'ASC']
                        ],
                        attributes: ['image', 'title', 'created_date']
                    }).then(MoviesOrSeries => {
                        if(MoviesOrSeries.length > 0){
                            res.status(200).json(MoviesOrSeries)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    })
                }else{
                    db.MovieOrSerie.findAll({
                        order:[
                            ['title', Object.values(search)[0] !== undefined ? Object.values(search)[0].toUpperCase() == 'ASC' || Object.values(search)[0].toUpperCase() == 'DESC' ? Object.values(search)[0].toUpperCase() : 'ASC' : 'ASC']
                        ],
                        attributes: ['image', 'title', 'created_date']
                    }).then(MoviesOrSeries => {
                        if(MoviesOrSeries.length > 0){
                            res.status(200).json(MoviesOrSeries)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    })
                }
            }else{
                db.MovieOrSerie.findAll({
                    order: [
                        ['title', 'ASC']
                    ],
                    attributes: ['image', 'title', 'created_date']
                })
                .then(MoviesOrSeries => {
                    if(MoviesOrSeries.length > 0){
                        res.status(200).json(MoviesOrSeries)
                    } else{
                        res.status(404).json({
                            error: 'No Content'
                        })
                    }
                }).catch(error => console.log(error))
            }
        }else {
            db.MovieOrSerie.findAll({
                order: [
                    ['title', 'ASC']
                ],
                attributes: ['image', 'title', 'created_date']
            })
            .then(MoviesOrSeries => {
                if(MoviesOrSeries !== null){
                    res.status(200).json(MoviesOrSeries)
                } else{
                    res.status(404).json({
                        error: 'No Content'
                    })
                }
            }).catch(error => console.log(error))
        }
    },
    movie: (req, res) => {
        db.MovieOrSerie.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association: 'Characters'}
            ]
        })
        .then(movieOrSerie => {
            if(movieOrSerie !== null){
                res.status(200).json(movieOrSerie)
            } else{
                res.status(404).json({
                    error: 'No Content'
                })
            }
        }).catch(error => console.log(error))
    },
    movieCreate: (req, res) => {
        let {
            image,
            title,
            qualification,
            created_date,
            characterIds,
            genresIds
        } = req.body;
        if(!title){
            res.status(404).json({
                error: 'The "title" field cannot be empty'
            })
        }else{
            db.MovieOrSerie.create({
                image: !image ? 'default image.jpg' : image,
                title,
                qualification: qualification > 5 ? 5 : qualification,
                created_date: !created_date ? moment.utc().format('YYYY-MM-DD') : moment(created_date).format("YYYY-MM-DD") 
            })
            .then(MovieOrSerie => {
                if(characterIds != undefined && characterIds.length > 0){
                    if(Array.isArray(characterIds)){
                        let arrayId = characterIds.map(id => {
                            return {
                                movies_or_series_id: MovieOrSerie.id,
                                character_id: id
                            };
                        })
                        db.CharacterMovieOrSerie.bulkCreate(arrayId)
                        .then(() => {
                            res.status(201).json({
                                message: `Created successfully movie or serie: ${MovieOrSerie.title}`
                            })
                        }).catch(error => console.log(error))
                    }else{
                        db.CharacterMovieOrSerie.create({
                            movies_or_series_id: MovieOrSerie.id,
                            character_id: characterIds
                        })
                        .then(() => {
                            res.status(201).json({
                                message: `Created successfully movie or serie: ${MovieOrSerie.title}`
                            })
                        }).catch(error => console.log(error))
                    }
                }else{
                    res.status(201).json({
                        message: `Created successfully movie or serie: ${MovieOrSerie.title}`
                    })
                }
            }).catch(error => console.log(error))
        }
    },
    movieUpdate: (req, res) => {
        let {
            image,
            title,
            qualification,
            created_date,
            characterIds
        } = req.body;

        const updated = (movieOrSerie) => {
            db.MovieOrSerie.update({
                image: image ? image : movieOrSerie.image,
                title: title ? title : movieOrSerie.title,
                qualification: qualification ? qualification : movieOrSerie.qualification,
                created_date: created_date ? created_date : movieOrSerie.created_date
            },{
                where: {
                    id: movieOrSerie.id
                }
            }).then(() => {
                res.status(201).json({
                    message: `Updated successfully movie or serie: ${title}`
                })
            })
        }

        db.MovieOrSerie.findOne({
            where: {
                id: req.params.id
            }
        }).then(movieOrSerie => {
            if(movieOrSerie != null){
                if(characterIds != undefined){
                    if(Array.isArray(characterIds)){
                        let arrayId = characterIds.map(id => {
                            return {
                                movies_or_series_id: movieOrSerie.id,
                                character_id: id
                            };
                        })
                        db.CharacterMovieOrSerie.findAll({
                            where: {
                                movies_or_series_id: movieOrSerie.id,
                                character_id: characterIds
                            }
                        }).then(conections => {
                            if(conections != null){
                                updated(movieOrSerie)
                            }else {
                                db.CharacterMovieOrSerie.bulkCreate(arrayId)
                                .then(() => {
                                    updated(movieOrSerie)
                                }).catch(error => console.log(error))
                            }
                        })
                        
                    }else {
                        db.CharacterMovieOrSerie.findOne({
                            where: {
                                movies_or_series_id: movieOrSerie.id,
                                character_id: characterIds
                            }
                        }).then(conection => {
                            if(conection != null) {
                                updated(movieOrSerie)
                            }else {
                                db.CharacterMovieOrSerie.create({
                                    movies_or_series_id: movieOrSerie.id,
                                    character_id: characterIds
                                }).then(() => {
                                    updated(movieOrSerie)
                                })
                            }
                        })
                    }
                }else {
                    updated(movieOrSerie)
                }
                
            }else {
                res.status(404).json({
                    error: 'Failed to update'
                })
            }
        })
        

    },
    movieDelete: (req, res) => {
        db.MovieOrSerie.findOne({
            where: {
                id: req.params.id
            }
        }).then(movieOrSerie => {
            if(movieOrSerie !== null){
                db.GenreMovieOrSerie.destroy({
                    where: {
                        movies_or_series_id: movieOrSerie.id
                    }
                }).then(() => {
                    db.CharacterMovieOrSerie.destroy({
                        where: {
                            movies_or_series_id: movieOrSerie.id
                        }
                    }).then(() => {
                        db.MovieOrSerie.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(() => {
                            res.status(204).json({
                                message: 'Delete successfully'
                            })
                        }).catch(error => console.log(error))
                })
                }).catch(error => console.log(error))
            } else{
                res.status(404).json({
                    error: 'Failed to delete'
                })
            }
        }).catch(error => console.log(error))
    }
}
