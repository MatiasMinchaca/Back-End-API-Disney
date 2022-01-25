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
            history
        } = req.body
        if (!name && !age && !weight && !history) {
            res.status(404).json({
                error: 'The indicated fields are required'
            })
        }else if(!name) {
            res.status(404).json({
                error: 'The "name" field cannot be empty'
            })
        }else if(!age){
            res.status(404).json({
                error: 'The "age" field cannot be empty'
            })
        }else if(!weight){
            res.status(404).json({
                error: 'The "weight" field cannot be empty'
            })
        }else if(!history){
            res.status(404).json({
                error: 'The "history" field cannot be empty'
            })
        }else {
            db.Character.create({
                image: image ? image : 'default image.jpg',
                name,
                age,
                weight,
                history
            }).then(character => {
                res.status(201).json({
                    message: `Created successfully character: ${character.name}`
                })
            }).catch(error => console.log(error))
        }
        
    },
    characterUpdate: (req, res) => {
        let {
            image,
            name,
            age,
            weight,
            history
        } = req.body
        db.Character.findOne({
            where: {
                id: req.params.id
            }
        }).then(character => {
            if(character !== null){
                db.Character.update({
                    image: image ? image : character.image,
                    name: name ? name : character.name,
                    age: age ? age : character.age,
                    weight: weight ? weight : character.weight,
                    history: history ? history : character.history
                },{
                    where: {
                        id: character.id
                    }
                }).then(() => {
                    res.status(201).json({
                        message: `Updated successfully character: ${name}`
                    })
                })
            } else{
                res.status(404).json({
                    error: 'Failed to update'
                })
            }
        })
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
                            id: character.id
                        }
                    }).then(() => {
                        res.status(201).json({
                            message: 'Delete successfully'
                        })
                    })
                })
            }else{
                res.status(404).json({
                    error: 'Failed to delete'
                })
            }
            
        })
    },
    characterSearch: (req, res) => {
        console.log(req.query)
    }
}
