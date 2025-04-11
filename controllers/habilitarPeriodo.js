const cx = require("../mysql_connect/crearcx")
/* const {Resend} = require('resend') */
const nodemailer = require("nodemailer")

exports.addPeriodo = (req, resp) => {
    const sql = `INSERT INTO periodos SET ?`
    let conteo = 0

         cx.query(sql,req.body, (e,r) => {
            if (e) {
                throw e
            } else {
                let sql2 = `INSERT INTO evaluaciones SET ?`
                let sql1 = `SELECT p.cedula FROM personal p`

                cx.query(sql1, (er,re) => {
                    if (er) {
                        return resp.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
                    } else {
                        re.forEach(ele => {
                            let json = {
                                cedula_personal: ele.cedula,
                                estatus_vacacional: 'INACTIVO',
                                estatus_permiso: 'INACTIVO',
                                id_periodo: r.insertId,
                                estatus: 'EVALUAR',
                                ponderacion: 0,
                                observaciones: ''
                            }
                            cx.query(sql2, json, (err,res) => {
                                if (err) {
                                    return resp.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
                                } else {
                                    conteo = conteo + 1
                                }
                            })
                        })
                        return resp.status(200).json({conteo:conteo})
                    }
                })
                
            }
    })

}

exports.validarPeriodo = async (req, res, next) => {
    try {
        let deshabilitarAnterior = "UPDATE periodos SET estatus = 'CERRADO' WHERE estatus = 'ABIERTO'"
        let sentencia = `SELECT * FROM periodos WHERE mes = '${req.body.mes}' and anio = '${req.body.anio}'`
        await cx.query(sentencia, (e,r) => {
            if (e) {
               /*  throw e */
                return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
            } else {
                if (r.length === 0) {
                    cx.query(deshabilitarAnterior, (e,r) => {
                        if (e) {
                            return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
                        } else {
                            next()
                        }
                    })
                } else {
                    return res.json({message:'MES REGISTRADO'})
                }
            }
        })
    } catch (error) {
        return res.status(500)
    }
}

exports.cerrarPeriodo = async (req, res) => {
    try {
        let deshabilitarPeriodo = `UPDATE periodos SET estatus = 'CERRADO' WHERE estatus = 'ABIERTO'AND mes = '${req.body.mes}' AND anio = '${req.body.anio}'`
        
        await cx.query(deshabilitarPeriodo, async (e,r) => {
            if (e) {
                /* throw e */
                return res.json({message:'EXISTEN PROBLEMAS DE COMUNICACION'})
            } else {
                if (r.affectedRow !== 0) {
                    const message = `Se finalizaron completamente las evaluaciones del período actual ${req.body.mes}-${req.body.anio}.`
                    const transporter = nodemailer.createTransport({
                        host: process.env.KEYMAIL_HOST,
                        port: process.env.KEYMAIL_PORT,
                        secure: false, // true for port 465, false for other ports
                        auth: {
                            user: process.env.KEYMAIL_USER,
                            pass: process.env.KEYMAIL_WORDPASS
                        }
                    })

                    const info = await transporter.sendMail({
                        from: `"Departamento de Sistemas" ${process.env.KEYMAIL_FROM}`, // sender address
                        to: process.env.KEYMAIL_TO, // list of receivers
                        subject: "No reply", // Subject line
                        text: message
                        });

                        console.log(info)
                }
                return res.json({message:'MES CERRADO'})
            }
        })
    } catch (error) {
        return res.status(500)
    }
}

