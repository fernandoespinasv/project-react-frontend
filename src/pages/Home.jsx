import { useState, useEffect } from 'react'
import axios from 'axios'
import CoinList from '../components/CoinList'
import SearchBar from '../components/SearchBar'

// Pagina principal: barra de busqueda + lista de criptos

function Home() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCoins() {
      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=true'
        const res = await axios.get(url, {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
          }
        })
        setCoins(res.data)
      } catch (err) {
        setError('No se han podido cargar las criptos. Intentalo mas tarde.')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getCoins()
  }, [])

  return (
    <main className="main">
      <SearchBar />
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p className="legend">Las mini-graficas muestran la evolucion del precio en los ultimos 7 dias.</p>
          <CoinList coins={coins} />
        </>
      )}
    </main>
  )
}

export default Home