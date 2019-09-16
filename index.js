const express = require('express');
const routes = require('./routes');
const path = require('path'); 
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//helpers con algunas funciones
const helpers = require('./helpers');

//crea la conexion a la db
const db = require('./config/db');

//importar el modelo
require('./models/Proyectos');

db.sync()
	.then(() => console.log('Conectado al Servidor'))
	.catch(error => console.log(error));

// crear una app de express

const app = express();

//agregamos expres validator a toda la aplicación
app.use(express.static('public'));

//donde cargaer los archivos estaáticos
// app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Pasar var dump a la aplicación
app.use((req,res,next) => {
	res.locals.vardump = helpers.vardump;
	next();
})

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes() );


app.listen(3000);


