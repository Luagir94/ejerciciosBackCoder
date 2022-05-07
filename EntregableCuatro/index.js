const express = require('express')
const fs = require('fs')
const { Router } = express.Router
const { routerProducts } = require('./Routes/products')
const app = express()
app.use(routerProducts)
const server = app.listen( 8080 , ()=>{
    console.log(`Sv en puerto ${server.address().port}`)
})


app.get('/api',( req, res) =>{
 res.send(`Bienvenidos`)
})