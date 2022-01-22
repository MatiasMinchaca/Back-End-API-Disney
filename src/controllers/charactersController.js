const db = require('../database/models');
const { Op } = require('sequelize'); 

module.exports = {
    characters: (req, res) => {
        const search = req.query
        if(Object.keys(search).length > 0){
            if(Object.keys(search)[0] == 'name'){
                if(Object.keys(search)[1] == 'age' && Object.keys(search)[1] != undefined){
                    db.Character.findAll({
                        where: {
                                name: {
                                        [Op.like]: `%${Object.values(search)[0]}%`
                                },
                                age: Object.values(search)[1]
                        },
                        attributes: ['image', 'name']
                    })
                    .then(characters => {
                        if(characters.length > 0){
                            res.status(200).json(characters)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    }).catch(error => console.log(error))
                }else{
                    db.Character.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    name: {
                                        [Op.like]: `%${Object.values(search)[0]}%`
                                    }
                                }
                            ]
                        },
                        attributes: ['image', 'name']
                    })
                    .then(characters => {
                        if(characters.length > 0){
                            res.status(200).json(characters)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    }).catch(error => console.log(error))
                }
            }else if(Object.keys(search)[0] == 'age'){
                if(Object.keys(search)[1] == 'name' && Object.keys(search)[1] != undefined){
                    db.Character.findAll({
                        where: {
                                name: {
                                        [Op.like]: `%${Object.values(search)[1]}%`
                                },
                                age: Object.values(search)[0]
                        },
                        attributes: ['image', 'name']
                    })
                    .then(characters => {
                        if(characters.length > 0){
                            res.status(200).json(characters)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    }).catch(error => console.log(error))
                }else{
                    db.Character.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    age: {
                                        [Op.like]: `${Object.values(search)[0]}`,
                                    },
                                }
                            ]
                        },
                        attributes: ['image', 'name']
                    })
                    .then(characters => {
                        if(characters.length > 0){
                            res.status(200).json(characters)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    }).catch(error => console.log(error))
                }
                
            }else if(Object.keys(search)[0] == 'movie'){
                db.MovieOrSerie.findOne({
                    where: {
                        id: Object.values(search)[0]
                    },
                    include: [
                        {association: 'Characters', 
                        attributes: ['image', 'name']
                    }
                    ]
                }).then(moviesOrSeries => {
                    if(moviesOrSeries != null){
                        let characters = moviesOrSeries.Characters
                        if(characters !== null){
                            res.status(200).json(characters)
                        } else{
                            res.status(404).json({
                                error: 'No Content'
                            })
                        }
                    }else{
                        res.status(404).json({
                            error: 'No Content'
                        })
                    }
                })
            }else{
                db.Character.findAll({
                    attributes: ['image', 'name']
                })
                .then(characters => {
                    if(characters !== null){
                        res.status(200).json(characters)
                    } else{
                        res.status(404).json({
                            error: 'No Content'
                        })
                    }
                }).catch(error => console.log(error))
            }
        }else{
            db.Character.findAll({
                attributes: ['image', 'name']
            })
            .then(characters => {
                if(characters !== null){
                    res.status(200).json(characters)
                } else{
                    res.status(404).json({
                        error: 'No Content'
                    })
                }
            }).catch(error => console.log(error))
        }
        
    },
    character: (req, res) => {
        db.Character.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association: 'MoviesOrSeries'}
            ]
        }).then(character => {
            if(character !== null){
                res.status(200).json(character)
            } else{
                res.status(404).json({
                    error: 'No Content'
                })
            }
        }).catch(error => console.log(error))
    },
    characterCreate: (req, res) => {
        let {
            image,
            name,
            age,
            weight,
            history,
            moviesOrSeriesId
        } = req.body
        db.Character.create({
            image,
            name,
            age,
            weight,
            history
        }).then(() => {
            res.status(201).json({
                message: 'Created successfully'
            })
        }).catch(error => console.log(error))
    },
    characterUpdate: (req, res) => {

    },
    characterDelete: (req, res) => {
        db.Character.findOne({
            where: {
                id: req.params.id
            }
        }).then(character => {
            if(character != null){
                db.CharacterMovieOrSerie.destroy({
                    where: {
                        character_id: character.id
                    }
                }).then(() => {
                    db.Character.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(() => {
                        res.status(201).json({
                            message: 'Delete successfully'
                        })
                    })
                })
            }else{
                res.status(404).json({
                    error: 'No Content'
                })
            }
            
        })
    },
    characterSearch: (req, res) => {
        console.log(req.query)
    }
}
