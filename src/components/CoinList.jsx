import CoinCard from './CoinCard'

// Componente que recibe la lista de criptos y pinta una tarjeta por cada una

function CoinList(props) {
  return (
    <div className="coin-list">
      {props.coins.map(coin => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}

export default CoinList