const cx = require("../mysql_connect/crearcx")


exports.activar = (req, res) => {
    let tpoPermiso = req.body.permiso === 'PERMISO' ? "evaluaciones.estatus_permiso = 'ACTIVO'" : "evaluaciones.estatus_vacacional = 'ACTIVO'"
    
    const sql = `UPDATE evaluaciones INNER JOIN periodos ON evaluaciones.id_periodo = periodos.id SET ${tpoPermiso}
                WHERE evaluaciones.cedula_personal = '${req.body.datos.id}' AND periodos.estatus = 'ABIERTO'`

    cx.query(sql, (e,r) => {
        if (e) {
            /* throw e */
            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
        } else {
            return res.status(200).json(r)
        }
    })

}