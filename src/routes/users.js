const router = require('express').Router() // Para crear rutas

router.get('/users/signin', (req, res) => {
	res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
	res.render('users/signup')
})

module.exports = router; // Exportamos el router