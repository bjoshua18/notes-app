const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

// Initializations
const app = express()
require('./database')

// Settings
app.set('port', process.env.PORT || 3000) // Indicamos el puerto
app.set('views', path.join(__dirname, 'views')) // Indicamos la ruta de la carpeta views

app.engine('.hbs', exphbs({ // Indicamos el motor de plantillas
	defaultLayout: 'main', // El nombre del layout por defecto
	layoutsDir: path.join(app.get('views'), 'layouts'), // La ruta de la carpeta 'layout'
	partialsDir: path.join(app.get('views'), 'partials'), // La ruta de la carpeta 'partials',
	extname: '.hbs' // La extension de los archivos
}))
app.set('view engine', '.hbs'); // Configuramos el motor de plantillas con la configuracion anterior

// Middlewares
app.use(express.urlencoded({extended: false})) // Para recibir datos de formularios
app.use(methodOverride('_method')) // Para que los formularios puedan tener los metodos put y delete
app.use(session({ // Para crear sesiones
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}))

// Global Variables

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Static Files
app.use(express.static(path.join(__dirname, 'public'))) // Indicamos la carpeta public

// Server is listenning
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})