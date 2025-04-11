const multer = require('multer')
const xpss = require('express') 
const road = xpss.Router()


var storage = multer.diskStorage({
    destination: function (req, img, cb) {
      cb(null, '../../photos')
      /* cb(null, './photos') */
    },
    filename: function (req, img, cb) {
      const prefijounico  = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, prefijounico + img.originalname)
    }
  })

var upload = multer({ storage: storage })


const all = require('../controllers/personalAll')
const update = require('../controllers/actEvaluacion')
const jobPerido = require('../controllers/habilitarPeriodo')
const jobPersonal = require('../controllers/nuevoPersonal')
const actPermiso = require('../controllers/activarPermisos')
const evaluaciones = require('../controllers/evaluacionesActivas')
const sesion = require('../controllers/onsesion')
const authentic = require('../controllers/auth')
const pormes = require('../controllers/reporteEvaluacionesxMes')
const newUser = require('../controllers/adduser')

road.get('/personalAll', all.personal)
road.get('/evaluaciones/activas', evaluaciones.activas)
road.get('/evaluaciones/:mes/:anio', pormes.buscarmes)
road.put('/evaluado/:cedula', update.evaluaciones)
road.get('/verify', authentic.autenticarte)
road.get('/verificar/faltantes', evaluaciones.faltantes)
road.post('/user/add', [newUser.validarusuario,newUser.crear])
road.post('/abrirperiodo', [jobPerido.validarPeriodo,jobPerido.addPeriodo])
road.post('/activarpermiso', actPermiso.activar)
road.post('/go', sesion.comenzar)
road.post('/periodo/desactivar', jobPerido.cerrarPeriodo)
road.post('/personal/nuevo', upload.single('picture'),[jobPersonal.verificarPersonal,jobPersonal.add])


module.exports = road
