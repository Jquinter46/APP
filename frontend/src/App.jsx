import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const [puntos, setPuntos] = useState('')
  const [valor, setValor] = useState('')
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const puntosArray = puntos.split(';').map(pair => pair.trim().split(',').map(Number))
    const res = await fetch('http://localhost:3000/api/interpolacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ puntos: puntosArray, x: parseFloat(valor) })
    })
    const data = await res.json()
    setResultado(data.resultado)
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">
              <i className="bi bi-graph-up"></i> Interpolación de Lagrange
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Puntos</label>
                <input
                  type="text"
                  className="form-control"
                  value={puntos}
                  onChange={e => setPuntos(e.target.value)}
                  placeholder="Ej: 1,2; 2,4; 3,8"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Valor de x a interpolar</label>
                <input
                  type="number"
                  className="form-control"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                  placeholder="Ej: 2.5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-lightning-charge-fill"></i> Calcular
              </button>
            </form>

            {resultado !== null && (
              <div className="mt-4">
                <h4><i className="bi bi-bar-chart-line-fill"></i> Resultado:</h4>
                <table className="table table-bordered mt-2">
                  <thead>
                    <tr>
                      <th>x</th>
                      <th>Interpolación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{valor}</td>
                      <td>{resultado}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App