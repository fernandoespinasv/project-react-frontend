// Creamos componentes pequeños para evitar hinchar nuestra App.jsx+
// Este componente recibe la lista de criptos y las pinta como una lista

function CoinList(props) {
  return (
    <ul>
      {props.coins.map(coin => (
        <li key={coin.id}>
          {coin.name} ({coin.symbol.toUpperCase()}) - {coin.current_price} €
        </li>
      ))}
    </ul>
  )
}

export default CoinList