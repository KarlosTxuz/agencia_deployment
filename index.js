import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();


//Conectar la base de datos
db.authenticate()
    .then( ()=> console.log('base de datos conectada'))
    .catch( error => console.log(error));


//Definir puerto


//habilitar pug
app.set('view engine', 'pug');


//OBTENER AÑO ACTUAL
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
})

//Agregar Body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);

var port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';


app.listen (port, host, ()=>{
    console.log(`El servidor esta funcionando en ${port}`)
})