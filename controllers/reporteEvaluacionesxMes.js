const cx = require("../mysql_connect/crearcx")

exports.buscarmes = async (req, res) => {
    console.table(req.params)
    try {
        let sentencia = `SELECT eva.estatus, eva.ponderacion, eva.observaciones, per.nombre FROM periodos peri, personal per, evaluaciones eva
        WHERE peri.mes = '${req.params.mes}' and peri.anio = '${req.params.anio}' and peri.id = eva.id_periodo and eva.cedula_personal = per.cedula`
        
        await cx.query(sentencia, (e,r) => {
            if (e) {
                /* throw e */
                return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
            } else {
                /* console.table(r) */
                return res.json({message:'MES ENCONTRADO', result: r})
            }
        })
    } catch (error) {
        return res.status(500)
    }
}
