import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Página de detalle de una cripto.

function CoinDetail() {
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
        setError('No se ha podido cargar la información de la criptomoneda.')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getCoin()
  }, [id])

  if (loading) {
    return <main className="main"><p className="loading">Cargando...</p></main>
  }
  if (error) {
    return <main className="main"><p className="error">{error}</p></main>
  }
  if (!coin) {
    return null
  }

  // Datos del market_data
  const precio = coin.market_data.current_price.eur
  const cambio = coin.market_data.price_change_percentage_24h || 0
  const colorCambio = cambio >= 0 ? 'green' : 'red'
  const marketCap = coin.market_data.market_cap.eur
  const volumen = coin.market_data.total_volume.eur
  const maximo24h = coin.market_data.high_24h.eur
  const minimo24h = coin.market_data.low_24h.eur

  // La descripción viene con etiquetas HTML dentro (<a>, <strong>...). Las quito con un regex sencillo
  const descripcionLimpia = coin.description.en.replace(/<[^>]*>/g, '')
  // Si es muy larga la corto, si no enorme
  const descripcion = descripcionLimpia.length > 500
    ? descripcionLimpia.substring(0, 500) + '...'
    : descripcionLimpia

  // Web oficial (a veces el array viene vacío o con strings vacíos)
  const webOficial = coin.links.homepage[0]

  return (
    <main className="main">
      <Link to="/" className="back-link">← Volver a la lista</Link>

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
        {coin.genesis_date && <p><strong>Fecha de creacion:</strong> {coin.genesis_date}</p>}
      </div>

      {descripcion && (
        <div className="coin-detail-description">
          <h3>Descripcion</h3>
          <p>{descripcion}</p>
        </div>
      )}

      {webOficial && (
        <div className="coin-detail-links">
          <h3>Enlaces</h3>
          <a href={webOficial} target="_blank" rel="noopener noreferrer">Web oficial</a>
        </div>
      )}
    </main>
  )
}

export default CoinDetail