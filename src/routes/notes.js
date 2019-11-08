const router = require('express').Router() // Para crear rutas

const Note = require('../models/Note')
const { isAuthenticated } = require('../helpers/auth')

// Agregar nota
router.get('/notes/add', isAuthenticated, (req, res) => {
	res.render('notes/new-note')
})

// Guardar nota
router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
		newNote.user = req.user.id
		await newNote.save(); // Guarda los datos
		req.flash('success_msg', 'Note Added Successfully') // Nombre de la alerta y el mensaje
		res.redirect('/notes') // Redireccionamos para ver todas las notas
	}
})

// Mostrar todas las notas del usuario
router.get('/notes', isAuthenticated, async (req, res) => {
	const notes = await	Note.find({user: req.user.id}).sort({date: 'desc'}) // Obtenemos todas las notas del usuario
	res.render('notes/all-notes', { notes }) // Renderizamos la vista con todas las notas
})

// Editar nota
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
	const note = await Note.findById(req.params.id)
	res.render('notes/edit-note', {note})
})

// Actualizar los datos de la nota
router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
	const { title, description } = req.body
	await Note.findByIdAndUpdate(req.params.id, { title, description })
	req.flash('success_msg', 'Note Updated Successfully')
	res.redirect('/notes')
})

// Eliminar nota
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	req.flash('success_msg', 'Note Deleted Successfully')
	res.redirect('/notes')
})

module.exports = router; // Exportamos el router