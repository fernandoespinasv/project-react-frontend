import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'

// Página de resultados de busqueda

function Search() {
  // Saco el ?q=... de la URL
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function buscar() {
      try {
        setLoading(true) // reset por si el usuario hace otra búsqueda
        const url = `https://api.coingecko.com/api/v3/search?query=${query}`
        const res = await axios.get(url, {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
          }
        })
        // El endpoint devuelve varias cosas (coins, exchanges, nfts...), solo nos interesan las criptos
        setResults(res.data.coins)
      } catch (err) {
        setError('Ha ocurrido un error al buscar.')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    buscar()
  }, [query]) // si cambia el query se vuelve a llamar

  return (
    <main className="main">
      <Link to="/" className="back-link">← Volver a la lista</Link>
      <h2 className="search-page-title">Resultados para: "{query}"</h2>

      {loading && <p className="loading">Buscando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>No se han encontrado criptomonedas con ese nombre.</p>
      )}
      {!loading && !error && results.length > 0 && (
        <ul className="search-results">
          {results.map(coin => (
            <li key={coin.id}>
              <Link to={`/coin/${coin.id}`} className="search-result-item">
                <img src={coin.thumb} alt={coin.name} width="30" height="30" />
                <span>{coin.name} ({coin.symbol})</span>
                {coin.market_cap_rank && <span className="rank">#{coin.market_cap_rank}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Search