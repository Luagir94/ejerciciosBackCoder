const https = require('https')
const express = require('express')
const moment = require('moment')


const app = express()

const server = app.listen( 3000 , ()=>{
    console.log(`Sv en puerto ${server.address().port}`)
})


app.get('/',( req, res) =>{
    res.send('holis')
})