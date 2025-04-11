const cx = require("../mysql_connect/crearcx")
const jwtvalido = require('jsonwebtoken')

exports.activas = async (req, res) => {
    /* const tokenCuenta = jwtvalido.decode(req.params.cuenta) */
    
    let sql = `SELECT CONCAT_WS('/', pe.mes, pe.anio) AS periodo, per.cedula AS id, per.nombre AS name, per.cargo, per.foto,
    eva.ponderacion, eva.estatus_vacacional, eva.estatus_permiso, eva.estatus, eva.observaciones AS observacion
    FROM evaluaciones eva INNER JOIN personal per INNER JOIN periodos pe
    ON eva.id_periodo = pe.id
    AND eva.cedula_personal = per.cedula
    WHERE pe.estatus = 'ABIERTO'`
    /* AND eva.estatus = 'EVALUAR' */
    
    cx.query(sql, (e, r) => {
        if (e) {
            /* throw e */
            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
        } else {
            res.json(r)
        }
    })
}

exports.faltantes = async (req, res) => {
    /* const tokenCuenta = jwtvalido.decode(req.params.cuenta) */
    
    let sql = `SELECT COUNT(*) AS resultado
    FROM evaluaciones eva INNER JOIN personal per INNER JOIN periodos pe
    ON eva.id_periodo = pe.id
    AND eva.cedula_personal = per.cedula
    WHERE pe.estatus = 'ABIERTO'
    AND eva.estatus = 'EVALUAR'`
    
    cx.query(sql, (e, r) => {
        if (e) {
            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
        } else {
            res.json(r)
        }
    })
}