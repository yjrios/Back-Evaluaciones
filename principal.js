const xpss = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const app = xpss()

app.use(cors())
app.use(morgan('tiny'))
app.use(xpss.json({limit: '50mb'}))
app.use(xpss.urlencoded({extended: false}))
app.use(cors())
dotenv.config({path: `.env`})

app.use('/v1/act', require('./paths/roads.js'))


app.set('port', process.env.CHANNEL || '9000')

app.listen(app.get('port'), () => {
    console.log(`LISTENNIG ${app.get('port')}`)
})
