const cx = require("../mysql_connect/crearcx")
const jwtvalido = require('jsonwebtoken')
const bcpt = require('bcrypt')
const jump = 15


exports.validarusuario = async (req, res, next) => {
    try {
        let sentencia = `SELECT * FROM usuario WHERE usuario_nombre = '${req.body.usuario}'`
        await cx.query(sentencia, (e,r) => {
            if (e) {
                /* throw e */
                return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
            } else {
                if (r.length === 0) {
                    next()
                } else {
                    return res.json({message:'Cuenta de correo en uso'})
                }
            }
        })
    } catch (error) {
        return res.status(500)
    }
}

exports.crear = async (req,res) => {
    try {
        let pass_encptdo = bcpt.hashSync(req.body.password, jump)
        let datos_completos = {
            contrasena_encriptada: pass_encptdo,
            usuario_nombre: req.body.usuario.toLowerCase(),
            nombre_completo: req.body.nombre.toUpperCase(),
            rol: req.body.tipo_usuario.toUpperCase()
        }

        let post = "INSERT INTO usuario SET ?"
        await cx.query(post, datos_completos, (e,r) => {
            if (e) {
                /* throw e */
                return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
            } else {
                return res.json(r)
            }
        })
    } catch (error) {
        return await res.status(500)
    }
}


exports.buscarxcuenta = async (req,res) => {
    try {
        const tokenCuenta = jwtvalido.decode(req.params.cuenta)
        /* let post = `SELECT id, cuenta FROM act_usuarios WHERE cuenta = '${tokenCuenta.data.cuenta}'` */
        let post = `SELECT id, cuenta FROM act_usuarios`
        await cx.query(post, req.body, (e,r) => {
            if (e) {
                throw e
            } else {
                return res.json(r)
            }
        })
    } catch (error) {
        return await res.status(500)
    }
}

