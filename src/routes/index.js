const router = require('express').Router() // Para crear rutas

router.get('/', (req, res) => {
	res.send('Index')
})

router.get('/about', (req, res) => {
	res.send('About')
})

module.exports = router; // Exportamos el router