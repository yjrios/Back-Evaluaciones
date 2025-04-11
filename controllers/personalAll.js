const cx = require("../mysql_connect/crearcx")

exports.personal = async (req, res) => {

    let sql = `SELECT personal.cedula AS id, personal.nombre AS name, personal.cargo FROM personal`
    let sqlperodo = `SELECT periodos.mes AS periodo FROM periodos ORDER BY id DESC LIMIT 1`
    cx.query(sql, (e, r) => {
        if (e) {
            /* throw e */
            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
        } else {
            cx.query(sqlperodo, (er, re) => {
                if (er) {
                    /* throw er */
                    return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
                } else {
                    /* console.log(re[0].periodo) */
                    res.json({personal: r, periodo: re[0].periodo})
                }
            })
        }
    })
}
