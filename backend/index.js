
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

function lagrange(puntos, x) {
  let resultado = 0
  const n = puntos.length
  for (let i = 0; i < n; i++) {
    let termino = puntos[i][1]
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        termino *= (x - puntos[j][0]) / (puntos[i][0] - puntos[j][0])
      }
    }
    resultado += termino
  }
  return resultado
}

app.post('/api/interpolacion', (req, res) => {
  const { puntos, x } = req.body
  const resultado = lagrange(puntos, x)
  res.json({ resultado })
})

app.listen(3000, () => console.log('Servidor backend corriendo en http://localhost:3000'))
