import express, { response } from 'express'
import { PORT } from './config.js'
import {
    getPersona,
    getPersonas,
    getUsuario,
    getPersonaUsuario
} from './database.js'

import bcrypt from 'bcrypt'


const app = express()
app.use(express.json())


app.listen(PORT, () => {
    console.log('Server Running on port', PORT)
})

// Datos de una persona en espesifico.
app.get('/personas/:id', async (req, res) => {
    const sintoma = await getPersona(req.params.id)
    res.status(200).send(sintoma)
})

// Trae a todas las personas registradas
app.get('/personas/', async (req, res) => {
    const sintoma = await getPersonas()
    res.status(200).send(sintoma)
})

// Datos personales del usuario.
app.get('/usuario/:id', async (req, res) => {
    const datosPersona = await getPersonaUsuario(req.params.id)

    let _datos = {
        id: datosPersona.id_conse01,
        nombre: datosPersona.conse01_nombre,
        apellido: datosPersona.conse01_apellido
    }

 
    res.status(200).send(_datos)
})

// Login de usuario
app.post('/usuario/', async (req, res) => {
    let respuesta = { resp : 'ok', mensaje : ''}
    const [usuario] = await getUsuario(req.body.mail)

    if(usuario.lenght < 1) { 
        respuesta.resp = 'error'
        respuesta.mensaje = 'No se encontró el usuario'
        res.status(200).send(JSON.stringify(respuesta))
    }
    
    const pass = usuario.CONSE06_PASS;
    const hash = pass.replace("$2y$", "$2a$") //De PHP a JS
    const result = bcrypt.compareSync(req.body.pass, hash)//Comparo ambas passwords

    if(result){
        respuesta = {
            ...respuesta, id : usuario.ID_CONSE06, nombre: usuario.conse01_nombre
        }

        res.status(200).send(JSON.stringify(respuesta))
    }else{
        respuesta.resp = 'error'
        respuesta.mensaje = 'No se encontró el usuario'
        res.status(200).send(JSON.stringify(respuesta))

    }
    
})