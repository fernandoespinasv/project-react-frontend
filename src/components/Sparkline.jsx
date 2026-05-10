// Componente para dibujar una mini gráfica con SVG. Recibe un array de precios y un color

function Sparkline(props) {
  console.log('Sparkline data:', props.data)
  const data = props.data
  const color = props.color || '#1e40af'

  // Si no hay datos no pinto nada
  if (!data || data.length === 0) return null

  const width = 120
  const height = 30

  // Saco el máximo y el mínimo para escalar la grafica
  const max = Math.max(...data)
  const min = Math.min(...data)
  const rango = max - min || 1 // por si max == min, evito una división por cero

  // Convierto cada valor a un punto del SVG
  const puntos = data.map((valor, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((valor - min) / rango) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} style={{ marginTop: '5px' }}>
      <polyline
        points={puntos}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default Sparkline