// importo express
const express = require('express');
const router = express.Router();


//impoartar express validator
const { body } = require('express-validator');


//importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function(){

//ruta para el home
	router.get('/', proyectosController.proyectosHome);

	// para get 
	router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

	//para el post - para ALTA / ESCRIBIR  el proyecto
	router.post('/nuevo-proyecto',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.nuevoProyecto);
		//trim eliminaría los espacios
		//escape eliminaría los caracteres no-letra



	//Listar proyecto
	router.get('/proyectos/:url', proyectosController.proyectoPorUrl);//  ":url" puede ser cualquier nombre de var
     
     //Actualizar el proyecto
	 router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
	 router.post('/nuevo-proyecto/:id',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.actualizarProyecto
	 );

	 //Eliminar Proyecto
	 router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

	return router;
}
