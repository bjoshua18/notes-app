const router = require('express').Router() // Para crear rutas

const Note = require('../models/Note')

router.get('/notes/add', (req, res) => {
	res.render('notes/new-note')
})

router.post('/notes/new-note', async (req, res) => {
	const { title, description } = req.body // Obtenemos el titulo y la descripcion del formulario enviado

	// Validacion de datos
	const errors = []
	if(!title)
		errors.push({text: 'Please, write a title'})

	if(!description)
		errors.push({text: 'Please, write a description'})
	
	if(errors.length > 0)
		res.render('notes/new-note', {
			errors,
			title,
			description
		})
	// Si todo va bien
	else {
		const newNote = new Note({ title, description }) // Crea un objeto Note
		await newNote.save(); // Guarda los datos
		res.redirect('/notes') // Redireccionamos para ver todas las notas
	}
})

router.get('/notes', async (req, res) => {
	const notes = await	Note.find().sort({date: 'desc'}) // Obtenemos todas las notas
	res.render('notes/all-notes', { notes }) // Renderizamos la vista con todas las notas
})

module.exports = router; // Exportamos el router