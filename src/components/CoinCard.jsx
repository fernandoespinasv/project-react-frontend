// Creamos tarjetas para mostrar la info de una cripto

function CoinCard(props) {
  const coin = props.coin

  // El cambio en 24h puede venir null en algunas criptos
  const cambio = coin.price_change_percentage_24h || 0
  // Si es positivo lo pintamos en verde, si es negativo, en rojo
  const colorCambio = cambio >= 0 ? 'green' : 'red'

  return (
    <div className="coin-card">
      <span className="coin-rank">#{coin.market_cap_rank}</span>
      <img src={coin.image} alt={coin.name} width="40" height="40" />
      <div className="coin-info">
        <h3>{coin.name} <small>({coin.symbol.toUpperCase()})</small></h3>
        <p className="coin-price">{coin.current_price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
        <p style={{ color: colorCambio }}>
          {cambio.toFixed(2)} %
        </p>
      </div>
    </div>
  )
}

export default CoinCard