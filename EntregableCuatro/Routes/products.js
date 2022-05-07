const { Router } = require('express')
const express = require('express')
const { productController } = require('../Controllers/productsController')

const routerProducts = new Router()

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true }))

routerProducts.get('/api/products', productController.getAll)
routerProducts.get('/api/products/:idProd', productController.getById)
routerProducts.post('/api/products', productController.newProduct)
routerProducts.put('/api/products/:idProd', productController.modifyProduct)
routerProducts.delete('/api/products/:idProd', productController.deleteProduct)

module.exports = { routerProducts }