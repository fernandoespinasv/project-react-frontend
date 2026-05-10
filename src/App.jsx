import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CoinDetail from './pages/CoinDetail'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Cripto Tracker</h1>
        <p>Top 20 criptomonedas por capitalización de mercado</p>
      </header>

      {/* Aquí defino las rutas de la app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </div>
  )
}

export default App