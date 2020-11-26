const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

// 1. Crear una conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/bit_contactos', { useNewUrlParser: true, useUnifiedTopology: true })

// Mensajes para saber si la conexión fue exitosa o no
mongoose.connection.on('error', (error) => {
  console.error('Error al intentar conectarse a MongoDB ', error)
})
mongoose.connection.once('open', () => {
  console.log('Conexión exitosa con DB')
})

// 2. Define la estructura interna de la colección
const contactoSchema = new mongoose.Schema({
  nombre: String,
  telefono: String
})

// 3. El modelo, que servira para comunicarme con una especifica colección
const Contacto = mongoose.model('contactos', contactoSchema)

app.get('/contactos', (solicitud, respuesta) => {

  Contacto.find({}, (error, resultados) => {
    respuesta.send(resultados)
  })

})

// http://localhost:3000/
// http://127.0.0.1:3000/
app.get('/', (solicitud, respuesta) => {
  console.log(solicitud.query)
  // solicitud.params // /libros/1
  // solicitud.query // /?nombre=Jeisson
  // solicitud.body // { nombre: 'Jeisson' } archivos

  respuesta.send('Oye, estas equivocado')
})

app.listen(3000, () => {
  console.log('Ya he estoy encendido y listo para escuchar')
})
