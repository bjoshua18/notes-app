const router = require('express').Router() // Para crear rutas

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/about', (req, res) => {
	res.render('about')
})

module.exports = router; // Exportamos el router