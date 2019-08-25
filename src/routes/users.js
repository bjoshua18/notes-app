const router = require('express').Router() // Para crear rutas

router.get('/users/signin', (req, res) => {
	res.send('Ingresando a la app')
})

router.get('/users/signup', (req, res) => {
	res.send('Formulario de autenticacion')
})

module.exports = router; // Exportamos el router