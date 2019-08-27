const router = require('express').Router() // Para crear rutas
const User = require('../models/User')

router.get('/users/signin', (req, res) => {
	res.render('users/signin')
})

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

module.exports = router; // Exportamos el router