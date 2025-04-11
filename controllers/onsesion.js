const cx = require("../mysql_connect/crearcx")
const bcpt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.comenzar = async (req,res) => {
    try {
        let sesion = `SELECT usu.nombre_completo AS nombre, usu.contrasena_encriptada AS password, usu.rol
        FROM usuario usu
        WHERE usu.usuario_nombre = '${req.body.usuario}'`

        cx.query(sesion, async (e,r) => {
            if (e) {
                throw e
            } else {
                if (r.length === 0) {
                    return res.json({message:'USUARIO'}).status(404)
                } else {
                    if ( !bcpt.compareSync(req.body.password, r[0].password)) {
                        return res.json({message:'Contrasena'}).status(404)
                    } else {
                        const cookie = jwt.sign( {data: {usuario: r[0].usuario, nombre: r[0].nombre, rol: r[0].rol === 'ADMIN' ? true : false } }, process.env.J_KEY, {expiresIn: process.env.J_DATE})
                        return res.json( { cookie: cookie, evaluar: r[0].rol === 'ADMIN' ? false : true } )
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500)
    }
}