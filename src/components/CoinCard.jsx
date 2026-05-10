import { Link } from 'react-router-dom'
import Sparkline from './Sparkline'

// Tarjeta para mostrar la info de una cripto. Ahora es clicable y lleva a CoinDetail

function CoinCard(props) {
  const coin = props.coin
  const cambio = coin.price_change_percentage_24h || 0
  const colorCambio = cambio >= 0 ? 'green' : 'red'

  // Array de precios de los ultimos 7 dias para la mini grafica
  const sparkData = coin.sparkline_in_7d ? coin.sparkline_in_7d.price : []

  return (
    <Link to={`/coin/${coin.id}`} className="coin-card">
      <span className="coin-rank">#{coin.market_cap_rank}</span>
      <img src={coin.image} alt={coin.name} width="40" height="40" />
      <div className="coin-info">
        <h3>{coin.name} <small>({coin.symbol.toUpperCase()})</small></h3>
        <p className="coin-price">{coin.current_price} €</p>
        <p style={{ color: colorCambio }}>
          {cambio.toFixed(2)} %
        </p>
        <Sparkline data={sparkData} color={colorCambio} />
      </div>
    </Link>
  )
}

export default CoinCard