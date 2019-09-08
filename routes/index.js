// importo express
const express = require('express');
const router = express.Router();


//impoartar express validator
const { body } = require('express-validator/check');


//importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function(){

//ruta para el home
	router.get('/', proyectosController.proyectosHome);

	// para get
	router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

	//para el post
	router.post('/nuevo-proyecto',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.nuevoProyecto);
		//trim eliminaría los espacios
		//escape eliminaría los caracteres no-letra



	//Listar proyecto
	router.get('/proyectos/:url', proyectosController.proyectoPorUrl);//  ":url" puede ser cualquier nombre de var
     
     //Actualizar el proyecto
     router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

	return router;
}
