import { Link } from 'react-router-dom'

// Cabecera común a todas las paginas (pinchando en el titulo se vuelve al home)

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <h1>Cripto Tracker</h1>
      </Link>
      <p>Top 20 criptomonedas por capitalización de mercado</p>
    </header>
  )
}

export default Header