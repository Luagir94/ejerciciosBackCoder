const fs = require('fs')

module.exports = class Products {
    constructor() {
        this.id = undefined
    }

    save = (product) => {
        try {
            if (fs.existsSync('./DB/desafio.txt')) {
                const data = JSON.parse(fs.readFileSync('./DB/desafio.txt', 'utf-8'))
                product.id = Date.now()
                data.push(product)
                fs.writeFileSync('./DB/desafio.txt', `${JSON.stringify(data)}`)
                return (data)
            } else {
                const array = []
                product.id = Date.now()
                array.push(product)
                fs.writeFileSync('./DB/desafio.txt', `${JSON.stringify(array)}`)
                return (array)
            }

        } catch (error) {
            console.log(error)
        }

        console.log('Archivo guardado!')
    }



    getAll = () => {
        const data = fs.readFileSync('./DB/desafio.txt', 'utf-8')
        return (data)
    }
    getByID = (id) => {
        const data = fs.readFileSync('./DB/desafio.txt', 'utf-8')
        const isInData = JSON.parse(data).find(x => x.id == id)

        return (isInData)
    }

    deleteById = (id) => {
        try {
            const data = fs.readFileSync('./DB/desafio.txt', 'utf-8')
            const newArray = JSON.parse(data)
            const filteredArray = newArray.filter(x => x.id !== id)

            fs.writeFileSync('./DB/desafio.txt', `${JSON.stringify(filteredArray)}`)
            console.log('Producto eliminado', filteredArray)
            return (filteredArray)
        } catch (error) {
            console.log(error)
        }
    }

    updateItem = (id, data) => {
        const datos = JSON.parse(fs.readFileSync('./DB/desafio.txt', 'utf-8'))
        console.log(datos);
        const index = datos.findIndex(p => p.id == id)
        if (index === -1) {
            const error = new Error('no existe un prod con ese id')
            error.tipo = 'db not found'
            throw error
        }

        const prodToUp = datos[index]

        const keys = Object.keys(data)
        for (const key of keys) {
            prodToUp[key] = data[key]
        }
        datos.splice(index, 1)
        datos.push(prodToUp)
        fs.writeFileSync('./DB/desafio.txt', `${JSON.stringify(datos)}`)
        return (datos)

    }
    deleteById = (id) => {
        try {
            const data = fs.readFileSync('./DB/desafio.txt', 'utf-8')
            const newArray = JSON.parse(data)
            const filteredArray = newArray.filter(x => x.id != id)
            console.log(data);
            fs.writeFileSync('./DB/desafio.txt', `${JSON.stringify(filteredArray)}`)
            return (filteredArray)
        } catch (error) {
            console.log(error)
        }
    }

}