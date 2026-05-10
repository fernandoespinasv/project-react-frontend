import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Barra de búsqueda. Al enviar, navega a la pagina de resultados con el termino en la URL.

function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault() // evitamos que el form recargue la página entera
    if (query.trim() === '') return // si está vacío no hago nada
    navigate(`/search?q=${query}`)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busca una criptomoneda..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar