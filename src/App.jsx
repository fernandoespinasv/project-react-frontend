import { useState, useEffect } from 'react'
import axios from 'axios'
import CoinList from './components/CoinList'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    async function getCoins() {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1'
      const res = await axios.get(url)
      setCoins(res.data)
    }
    getCoins()
  }, [])

  return (
    <div>
      <h1>Cripto Tracker</h1>
      <p>Lista de criptomonedas con datos de CoinGecko</p>
      <CoinList coins={coins} />
    </div>
  )
}

export default App