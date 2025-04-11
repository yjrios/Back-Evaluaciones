const mysql = require('mysql')

const cx = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

cx.connect( (e) => {
    if (e) {
        throw e
    }
})


module.exports = cx