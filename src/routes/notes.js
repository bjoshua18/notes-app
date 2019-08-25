const router = require('express').Router() // Para crear rutas

router.get('/notes', (req, res) => {
	res.send('Notes from database')
})

module.exports = router; // Exportamos el router