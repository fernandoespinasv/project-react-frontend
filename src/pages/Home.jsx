import { useState, useEffect } from 'react'
import axios from 'axios'
import CoinList from '../components/CoinList'

// Pagina principal: muestra la lista de criptos

function Home() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCoins() {
      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1'
        const res = await axios.get(url)
        setCoins(res.data)
      } catch (err) {
        setError('No se han podido cargar las criptomonedas. Inténtalo más tarde.')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getCoins()
  }, [])

  return (
    <main className="main">
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <CoinList coins={coins} />}
    </main>
  )
}

export default Home