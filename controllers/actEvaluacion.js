const cx = require("../mysql_connect/crearcx")

exports.evaluaciones = (req, res) => {
    const sql = `UPDATE evaluaciones INNER JOIN periodos ON evaluaciones.id_periodo = periodos.id SET evaluaciones.ponderacion = '${req.body.ponderacion}', evaluaciones.observaciones = '${req.body.observaciones}', evaluaciones.estatus = '${req.body.estatus}' WHERE evaluaciones.cedula_personal = '${req.params.cedula}' AND evaluaciones.id_periodo = periodos.id AND periodos.estatus = 'ABIERTO'`

    cx.query(sql, (e,r) => {
        if (e) {
            /* throw e */
            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
        } else {
            res.json(r)
        }
    })
}