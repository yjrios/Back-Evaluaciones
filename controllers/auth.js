const jwt = require('jsonwebtoken')

exports.autenticarte = (req, res) => {
    const galleta = req.get('galleta')
    jwt.verify(galleta, process.env.J_KEY, (err, decoded) => {
        if (err) {
            /* throw err */
            return res.status(401).json({ message: 'Sesión vencida' })
        } else {
            
            return res.status(200).json( decoded.data )
        }
    })
}

/* exports.nivelUsuario = (req, res) => {
    const id_nivel = req.user.id_nivel
    if (id_nivel) {
        return res.status(200).json({ message: 'Usuario Administrador' })
    } else {
        return res.status(401).json({ message: 'Usuario con credenciales insuficientes' })
    }
} */