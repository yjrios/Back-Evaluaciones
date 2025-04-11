const cx = require("../mysql_connect/crearcx")

exports.verificarPersonal = async(req, res, next) => {
    let sql = `SELECT * FROM personal WHERE cedula = '${req.body.cedula}'`
    try {
        cx.query(sql, (error, resultado) => {
            if (error) {
               /* throw error */
               return res.json({message: 'ERROR AL CONSULTAR'})
            } else {
                if (resultado.length !== 0) {
                    return res.status(401).json({message: 'DOCUMENTO EXISTENTE'})
                } else { 
                    next()
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: 'OCURRIO UN ERROR'
        })
    }
}

exports.add = async(req, res) => {
    let sentencia = 'INSERT INTO personal SET ?'
    const data = {
        cedula: req.body.id,
        cargo: req.body.puesto.toUpperCase(),
        nombre: req.body.nombre.toUpperCase() + ' ' + req.body.apellido.toUpperCase(),
        foto: req.file.filename
        }
    try {
        if (data) {
            cx.query(sentencia, data, (error, resultado) => {
                if (error) {
                    return res.json({message: 'ERROR AL REGISTRAR'})
                    /* throw error */
                } else {
                    return res.json({message: "REGISTRO EXITOSO"}).status(200)
                }
            })
        }
    } catch (error) {
        return res.status(500).json({ message: 'OCURRIO UN ERROR' })
    }
}
