import express, { response } from 'express'

import {
    getPersona,
    getPersonas,
    getUsuario,
    getPersonaUsuario
} from './database.js'

import bcrypt from 'bcrypt'

import cors from "cors";

const corsOptions = {
  origin: "http://127.0.0.1:5173", // specify the allowed origin
  methods: ["POST", "GET"], // specify the allowed methods
  credentials: true, // allow sending credentials (cookies, authentication)
};


const app = express()
app.use(express.json())
app.use(cors(corsOptions));


app.listen(8080, () => {
    console.log('Server Running on port 8080')
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