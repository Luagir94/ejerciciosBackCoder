const fs = require('fs')


const products = []
let counter = 0

class Contenedor {
    constructor(title, price, thumbnail) {
            this.id = undefined,
            this.title = title,
            this.price = price,
            this.thumbnail = thumbnail
    }

    save =  (obj) => {
        try {
            counter += 1
            this.id = counter
            products.push(obj)
             fs.writeFileSync('./desafio.txt', `${JSON.stringify(products)}`)
            console.log('Archivo guardado!')
        } catch (error) {
            console.log(error)
        }
    }


    getByID = (id) => console.log('getById' , products.find(x => x.id === id) )

    getAll = () => console.log(products)

    deleteById = async (id) => {
        try {
            const newArray = await products.filter(x => x.id !== id)
            await fs.promises.writeFile('./desafio.txt', `${JSON.stringify(newArray)}`)
            console.log('Producto eliminado', newArray)
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () =>{
        const newArray = products.splice(0,products.length)
        await fs.promises.writeFile('./desafio.txt', ``)
        console.log('Productos eliminados')
    }



}

// Instancio y guardo los productos nuevos
const productoUno = new Contenedor('cartuchera' , 100, 'www.dsfsd.com')
productoUno.save(productoUno)
const productoDos = new Contenedor('goma' , 10, 'www.dsfsd.com')
productoDos.save(productoDos)
const productoTres = new Contenedor('lapiz' , 20, 'www.dsfsd.com')
productoTres.save(productoTres)

//Obtengo todos los productos
productoUno.getAll()
//Obtengo el producto con ID 2
productoUno.getByID(2)
//Elimino el producto con ID 2
productoUno.deleteById(2)
//Metodo para borrar todo
// productoUno.deleteAll()



