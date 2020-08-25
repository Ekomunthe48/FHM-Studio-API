var connection = require('../Connect')
var sequelize = require('sequelize')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')
const { Sequelize, where } = require('sequelize')
const { response } = require('express')

const User = connection.define('users', {
    id_user: {
        field: 'id_user',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING
    },
    password: {
        field: 'password',
        type: Sequelize.STRING
    },
    date: {
        field: 'date',
        type: Sequelize.DATE
    }
}, {
    timestamps: false
})

exports.registration = async (req , res) => {
    try {
        console.log('body', req.body)

        const { username, email, password, } = req.body

        const result = await User.findAll({
            attributes: ['email'],
            where: {
                email
            }
        })

        if (result && result.length > 0) {
            return res.status(400).send("Email sudah terdaftar")
        }
        
        var post = {
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            date : new Date()
        }

        await User.create(post)
        
        return res.json({message: 'User created'})
    } catch(e) {
        console.log('error: '+e)
        return res.status(500).send( "Cannot generated")
    }
}

exports.login = async (req, res) => {
    try {
        console.log('body: ' + JSON.stringify(req.body))

        const { email, password } = req.body
    
        const user = await User.findOne({
            where: {
                password: bcrypt.compareSync(password, password),
                email
            }
        })
        
        if (!user) {
            return res.json({message: 'Email/password is wrong'})
        }
        
        const token = jwt.sign({user}, config.secret, {
            expiresIn : 1440
        })
        
        return res.json({ token })
    } catch(e) {
        console.log(e)
        res.status(500).send('Internal server error')
    }
}

exports.secretPage = function(req,res){
    res.json({message: "This page only for auth user only"})
}

