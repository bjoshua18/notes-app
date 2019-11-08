const passport = require('passport') // Para validar usuarios y crear sesiones
const LocalStrategy = require('passport-local').Strategy // Modulo

const User = require('../models/User')

// Definimos la autenticacion
passport.use(new LocalStrategy({
	usernameField: 'email' // Necesitamos el email
}, async (email, password, done) => { // Validamos los datos
	const user = await User.findOne({email: email}) // Validamos el email
	if(!user) { // Si no hay email
		return done(null, false, { message: 'Not user found.' }) // No hay errores, ni usuarios y devolvemos un mensaje
	} else { // Si hay email
		const match = await user.matchPassword(password) // Validamos el password
		if(match) // Si coinciden
			return done(null, user) // No hay error, devolvemos el usuario
		else 
			return done(null, false, {message: 'Not user found. The email or password is incorrect.'})
	}
}))

// Creamos la sesion del usuario
passport.serializeUser((user, done) => {
	done(null, user.id)
})

// Para saber si el usuario ha iniciado sesion
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})