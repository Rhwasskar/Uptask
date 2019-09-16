const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req,res)=> {

	const proyectos = await Proyectos.findAll();

	// const keis = keys(proyectos);
	// console.log(keis);

	res.render('index',
	{
		nombrePagina : "Proyectos",
		proyectos,
		// keis,
	})
		
	}
exports.formularioProyecto = async (req, res) => {
	const proyectos = await Proyectos.findAll();
	res.render('nuevoProyecto', {
		nombrePagina : "Nuevo Proyecto",
		proyectos
	});
	// console.log('pasando pasando pasando pasando pasando' + proyectos.toString())
}

exports.nuevoProyecto = async (req,res) => {
	const proyectos = await Proyectos.findAll();

	const { nombre } = req.body;
	let errores = [];

	if (!nombre) {
		errores.push({'texto': 'Agrega un nombre al Proyecto'})
	}

	if(errores.length > 0 ){
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo Proyecto',
			errores,
			proyectos
		});
	} else {
		//los hooks corren en determinado tiempo

		// const url =slug(nombre).toLowerCase(); 
		 //el slug quita los espacios, los convierte en guiones
		await Proyectos.create({ nombre });
		res.redirect('/');
		// .then(() => console.log('Insertado Correctamente'))
		//++.catch(error => console.log(error));

	}
 }

 exports.proyectoPorUrl = async (req,res) =>{
 	// res.send(req.params.url); //devuelve la URL
 	const proyectosPromise =  Proyectos.findAll();
	const proyectoPromise = Proyectos.findOne({
		where:{
			url:req.params.url
		}
	});
	const [proyectos,proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

 	if (!proyecto) return next();

 	//render a la vista

 	res.render('Tareas',{ 
 		nombrePagina : 'Tareas del Proyecto',
 		proyecto,
 		proyectos
 	});

 }

 exports.formularioEditar = async(req,res) => {
	 
 	const proyectosPromise =  Proyectos.findAll();
	const proyectoPromise = Proyectos.findOne({
		where:{
			id:req.params.id
		}
	});
	const [proyectos,proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
 	// const proyectoPromise = await Proyectos.findOne({where{url: req.params.id }});


 	//render a la vista
 	res.render('nuevoProyecto',{
 		nombrePagina : 'Editar Proyecto',
 		proyectos,
		 proyecto

	 });
	//  console.log(proyecto.dataValues);

 }
	

 exports.actualizarProyecto = async (req,res) => {
	const proyectos = await Proyectos.findAll();

	const { nombre } = req.body;
	let errores = [];

	if (!nombre) {
		errores.push({'texto': 'Agrega un nombre al Proyecto'})
	}

	if(errores.length > 0 ){
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo Proyecto',
			errores,
			proyectos
		});
	} else {
		//los hooks corren en determinado tiempo

		// const url =slug(nombre).toLowerCase(); 
		 //el slug quita los espacios, los convierte en guiones
		await Proyectos.update(
			{ nombre: nombre },  //QUÉ ACTUALIZO
			{where: { id: req.params.id }}		//ESTE SERÍA EL WHERE
		);
		res.redirect('/');
		// .then(() => console.log('Insertado Correctamente'))
		//++.catch(error => console.log(error));

	}
 }

 exports.eliminarProyecto = async (req,res,next) =>{
	 //Req contiene la info, ypodemos utilizar query o params.
	 const {urlProyecto} = req.query; 

	 const resultado = await Proyectos.destroy({where: {url:urlProyecto }})
	
	 if (!resultado){
		 return next();

	 } 
	 res.status(200).send('Proyecyo eliminado correctamente');
	 

 }
