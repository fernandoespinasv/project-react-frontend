import { useState, useEffect } from 'react'
import axios from 'axios'
import CoinList from './components/CoinList'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true) // Empiezo en true porque al principio se está cargando
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCoins() {
      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1'
        const res = await axios.get(url)
        setCoins(res.data)
      } catch (err) {
        // Si la API falla, guardo un mensaje para enseñar en pantalla
        setError('No se han podido cargar las criptomonedas. Inténtalo más tarde.')
        console.log(err)
      } finally {
        // Esto se ejecuta haya ido bien o mal, así me aseguro de quitar el "Cargando..."
        setLoading(false)
      }
    }
    getCoins()
  }, [])

  return (
    <div>
      <h1>Cripto Tracker</h1>
      <p>Lista de criptomonedas con datos de CoinGecko</p>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <CoinList coins={coins} />}
    </div>
  )
}

export default App