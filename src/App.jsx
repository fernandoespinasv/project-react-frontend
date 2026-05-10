import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CoinDetail from './pages/CoinDetail'
import Search from './pages/Search'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}

export default App