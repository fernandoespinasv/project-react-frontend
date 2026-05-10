import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Cabecera común a todas las páginas. Pinchando en el título se vuelve al home
// También muestra dos datos globales del mercado

function Header() {
  const [globalData, setGlobalData] = useState(null)

  useEffect(() => {
    async function getGlobalData() {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/global', {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
          }
        })
        setGlobalData(res.data.data)
      } catch (err) {
        // Si falla no pasa nada, simplemente no mostramos los datos globales
        console.log(err)
      }
    }
    getGlobalData()
  }, [])

  return (
    <header className="header">
      <Link to="/" className="header-link">
        <h1>Cripto Tracker</h1>
      </Link>
      <p>Top 20 criptomonedas por capitalización de mercado</p>

      {globalData && (
        <div className="header-stats">
          <span>
            Capitalización total: <strong>{Math.round(globalData.total_market_cap.eur).toLocaleString('es-ES')} €</strong>
          </span>
          <span>
            Dominancia BTC: <strong>{globalData.market_cap_percentage.btc.toFixed(1)} %</strong>
          </span>
        </div>
      )}
    </header>
  )
}

export default Header