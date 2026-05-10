import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // Aquí guardamos las criptos que devuelve la API
  const [coins, setCoins] = useState([])

  // useEffect se ejecuta al montar el componente (el "[]"" del final es para que solo se ejecute una vez)
  useEffect(() => {
    async function getCoins() { // Función que hace GET a la API elegida
      // Cogemos las 20 primeras y ordenadas por capitalización del mercado
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1'
      const res = await axios.get(url)
      console.log(res.data) // Para ver en la consola del navegador lo que llega
      setCoins(res.data)
    }
    getCoins()
  }, [])

  return (
    <div>
      <h1>Cripto Tracker</h1>
      <p>Lista de criptomonedas con datos de CoinGecko</p>
      <pre>{JSON.stringify(coins, null, 2)}</pre>
    </div>
  )
}

export default App