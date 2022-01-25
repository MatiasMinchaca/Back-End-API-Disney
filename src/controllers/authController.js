const db = require('../database/models');
let bcrypt = require('bcryptjs');
const sgMail = require('../services/sendgrid')
const jwt = require('jsonwebtoken')
const {jsonToken} = require('../../config/index')

module.exports = {
    register: (req, res) => {
        let {
            name,
            user_name,
            email,
            password
        } = req.body

        const msg = {
            to: email,
            from: 'matiasezequielminchaca@gmail.com',
            subject: 'Welcome',
            text: 'You just registered on our site',
            html: '<p>You just registered on our site-Matias Minchaca-challenge Back End NodeJS</p>'
        }

        if (!name && !email && !password) {
            return res.status(404).json({
                error: 'The indicated fields are required'
            });
        }else if(!name) {
            return res.status(404).json({
                error: 'The "name" field cannot be empty'
            });
        }else if(!email) {
            return res.status(404).json({
                error: 'The "email" field cannot be empty'
            });
        }else if(!password) {
            return res.status(404).json({
                error: 'The "password" field cannot be empty'
            });
        }else {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(userConfirm => {
                if(userConfirm == null){
                    db.User.create({
                        name,
                        user_name: user_name ? user_name : `User-${name}`,
                        email,
                        password: bcrypt.hashSync(password, 12)
                    }).then(user => {
                        try {
                            sgMail.send(msg)
                        } catch (err) {
                            return res.status(err.code).json(err.message)
                        }
                        res.status(201).json({
                            message: 'Success to register'
                        })
                    })
                }else {
                    res.status(404).json({
                        error: 'There is already a user with that email'
                    })
                }
            })
        }

    },
    login: (req, res) => {
        let {
            email,
            password
        } = req.body

        if(!email && !password){
            return res.status(404).json({
                error: 'The indicated fields are required'
            })
        }else if(!email){
            return res.status(404).json({
                error: 'The "email" field cannot be empty'
            })
        }else if(!password){
            return res.status(404).json({
                error: 'The "password" field cannot be empty'
            })
        }else {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if(!user){
                    res.status(404).json({
                        error: 'Password or Email do not match'
                    })
                }else if(!bcrypt.compareSync(password, user.dataValues.password)){
                    return res.status(404).json({
                        error: 'Password or Email do not match'
                    })
                }else {
                    const token = jwt.sign({id: user.id}, jsonToken.token,{
                        expiresIn: 60 * 60 * 24
                    })
                    res.json({auth: true, token})
                }
            })
            
        }

    }
}
