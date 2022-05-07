const Products = require("../DB/index.js")
const Joi = require('joi');
const product = new Products()

const validateProduct = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        price: Joi.number()
            .min(1)
            .precision(2)
            .required()
        , 
        thumbnail: Joi.string()
        .required()

    })
    return (schema.validate({ title: data.title, price: data.price, thumbnail: data.thumbnail }))
}
const validateProductMod = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            ,
        price: Joi.number()
            .min(1)
            .precision(2)
            
        , 
        thumbnail: Joi.string()
        

    })
    return (schema.validate({ title: data.title, price: data.price, thumbnail: data.thumbnail }))
}

const productController = {
    getAll: (req, res) => {
        const productos = product.getAll()
        !productos ? res.status(404).send('Los productos no fueron encontrados') : res.send(productos)
    },
    getById: (req, res) => {
        const id = req.params.idProd
        const producto = product.getByID(id)
        !producto ? res.status(404).send('El producto no fue encontrado') : res.send(producto)
    },
    newProduct: (req, res) => {
        const { error, value } = validateProduct(req.body);
        if (!error) {
        const newProd = product.save(req.body)
        res.json(newProd)
        } else {
            const mensaje = error.details[0].message;
            res.status(400).send(mensaje);
        }

    },
    modifyProduct: (req, res) => {
        const id = req.params.idProd
        const { error, value } = validateProductMod(req.body);
        if (!error) {
            try {
                const modifiedProd = product.updateItem(id, req.body)
                res.json(modifiedProd)
            } catch (error) {
                if (error.tipo === 'db not found') {
                    res.status(404).json({ error: error.message })
                } else {
                    res.status(500).json({ error: error.message })
                }
            }
        } else {
            const mensaje = error.details[0].message;
            res.status(400).send(mensaje);
        }


    },
    deleteProduct:(req, res) => {
        const id = req.params.idProd
        const eliminado = product.deleteById(id)
        !eliminado ? res.status(404).send('El producto no fue encontrado') : res.send(`Producto Eliminado`)
    }




}

module.exports ={productController}