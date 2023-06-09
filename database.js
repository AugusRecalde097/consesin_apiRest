import mysql from 'mysql2'
import { 
    MYSQL_DB
    ,MYSQL_USER
    ,MYSQL_HOST
    ,MYSQL_PASS } from './config.js'

const pool = mysql.createPool({
    database: MYSQL_DB,
    user: MYSQL_USER,
    host: MYSQL_HOST,
    password: MYSQL_PASS,

}).promise();

/** Función con la que se puede traer un sintoma por ID*/
export async function getPersona(id){
    const [persona_row] = await pool.query(
        `SELECT * FROM conse_01_personas WHERE id_conse01 = ${id}`
    )
   return persona_row[0];
}

/** Función con la que se puede traer un sintoma por ID */
export async function getPersonas(){
    const [personas_row] = await pool.query(
        `SELECT * FROM conse_01_personas`
    )
   return personas_row;
}

export async function getPersonaUsuario(id){
    const [persona_row] = await pool.query(
        `select id_conse01, conse01_nombre, conse01_apellido from conse_06_usuarios, conse_01_personas 
            WHERE conse_06_usuarios.RELA_CONSE01 = conse_01_personas.ID_CONSE01 
            and conse_06_usuarios.ID_CONSE06 = ${id}`
    )
   return persona_row[0]; 
}

/** Función con la que se puede traer un sintoma por ID */
export async function getUsuario(mail){
    const [personas_row] = await pool.query(
        `select conse_06_usuarios.*, id_conse01, conse01_nombre, conse01_apellido 
        from conse_06_usuarios, conse_01_personas 
        WHERE conse_06_usuarios.RELA_CONSE01 = conse_01_personas.ID_CONSE01 and conse06_mail = '${mail}'`
    )
   return personas_row;
}