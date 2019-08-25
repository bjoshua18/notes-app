const router = require('express').Router() // Para crear rutas

const Note = require('../models/Note')

// Agregar nota
router.get('/notes/add', (req, res) => {
	res.render('notes/new-note')
})

// Guardar nota
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

// Mostrar todas las notas
router.get('/notes', async (req, res) => {
	const notes = await	Note.find().sort({date: 'desc'}) // Obtenemos todas las notas
	res.render('notes/all-notes', { notes }) // Renderizamos la vista con todas las notas
})

// Editar nota
router.get('/notes/edit/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	res.render('notes/edit-note', {note})
})

// Actualizar los datos de la nota
router.put('/notes/edit-note/:id', async (req, res) => {
	const { title, description } = req.body
	await Note.findByIdAndUpdate(req.params.id, { title, description })
	res.redirect('/notes')
})

// Eliminar nota
router.delete('/notes/delete/:id', async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	res.redirect('/notes')
})

module.exports = router; // Exportamos el router