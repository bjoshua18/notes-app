const router = require('express').Router() // Para crear rutas
const passport = require('passport')
const User = require('../models/User')

// Formulario de login
router.get('/users/signin', (req, res) => {
	res.render('users/signin')
})

// Recibe los datos del formulario de login y autenticamos
router.post('/users/signin', passport.authenticate('local', { // Llamamos a la funcion del autenticar
	successRedirect: '/notes', // Si todo fue correcto, redireccionamos a notes
	failureRedirect: '/users/signin', // Si hubo un error, redireccionamos al login
	failureFlash: true // Para poder enviar mensajes de flash
}))

// Formulario de registro
router.get('/users/signup', (req, res) => {
	res.render('users/signup')
})

// Recibe los datos del formulario de registro
router.post('/users/signup', async (req, res) => {
	// Guardamos los datos
	const { name, email, password, confirm_password } = req.body

	const errors = []
	// Validacion de inputs
	if(name.length <= 0)
		errors.push({text: 'Please, insert your name'})
	if(password != confirm_password)
		errors.push({text: 'Password do not match'})		
	if(password.length < 4)
		errors.push({text: 'Password must be at least 4 characters'})
	
	if(errors.length > 0)
		res.render('users/signup', {errors, name, email, password, confirm_password})
	else {
		// Comprobacion del email
		const emailUser = await User.findOne({email: email})
		if(emailUser){
			req.flash('error_msg', 'The email is already in use')
			res.redirect()
		}

		// Guardamos los datos
		const newUser = new User({ name, email, password })
		newUser.password = await newUser.encryptPassword(password)
		await newUser.save()
		req.flash('success_msg', 'You are registered')
		res.redirect('/users/signin')
	}		
})

router.get('/users/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router; // Exportamos el router