import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Página de detalle: coge el id de la URL y pide a la API la info completa de esa cripto

function CoinDetail() {
  // Sacamos el id de la URL. Como en App.jsx la ruta es "/coin/:id", aquí id será "bitcoin", "ethereum", etc.
  const { id } = useParams()

  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  async function getCoin() {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${id}`
      const res = await axios.get(url, {
        headers: {
          'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
        }
      })
      setCoin(res.data)
    } catch (err) {
      setError('No se ha podido cargar la informacion de la cripto.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  getCoin()
}, [id]) // si cambia el id (por ej. el usuario va de bitcoin a ethereum), se vuelve a llamar

  // Mientras carga o si ha fallado, salimos antes con un return rápido
  if (loading) {
    return <main className="main"><p className="loading">Cargando...</p></main>
  }
  if (error) {
    return <main className="main"><p className="error">{error}</p></main>
  }
  if (!coin) {
    return null
  }

  // Sacamos un par de campos del objeto para que el JSX quede más legible
  const precio = coin.market_data.current_price.eur
  const cambio = coin.market_data.price_change_percentage_24h || 0
  const colorCambio = cambio >= 0 ? 'green' : 'red'
  const marketCap = coin.market_data.market_cap.eur
  const volumen = coin.market_data.total_volume.eur
  const maximo24h = coin.market_data.high_24h.eur
  const minimo24h = coin.market_data.low_24h.eur

  return (
    <main className="main">
      <div className="coin-detail-header">
        <img src={coin.image.large} alt={coin.name} width="80" height="80" />
        <div>
          <h2>{coin.name} <small>({coin.symbol.toUpperCase()})</small></h2>
          <p>Rank #{coin.market_cap_rank}</p>
        </div>
      </div>

      <div className="coin-detail-info">
        <p><strong>Precio actual:</strong> {precio.toLocaleString('es-ES')} €</p>
        <p><strong>Cambio 24h:</strong> <span style={{ color: colorCambio }}>{cambio.toFixed(2)} %</span></p>
        <p><strong>Maximo 24h:</strong> {maximo24h.toLocaleString('es-ES')} €</p>
        <p><strong>Minimo 24h:</strong> {minimo24h.toLocaleString('es-ES')} €</p>
        <p><strong>Capitalizacion de mercado:</strong> {marketCap.toLocaleString('es-ES')} €</p>
        <p><strong>Volumen 24h:</strong> {volumen.toLocaleString('es-ES')} €</p>
      </div>
    </main>
  )
}

export default CoinDetail