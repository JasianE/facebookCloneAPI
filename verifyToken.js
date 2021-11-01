//Verifies token using JWT
const jwt = require('jsonwebtoken')
const express = require('express')

function verifyToken(req,res,next){
    const bearer = req.headers['authorization']

    if(typeof bearer === 'undefined'){
        res.sendStatus(403)
    } else{
        const token = bearer.split(' ')[1]
        req.token = token
        next()
    }
}

export default verifyToken

