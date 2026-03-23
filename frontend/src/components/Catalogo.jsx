import { useEffect, useState } from "react"
import { getProductos } from "../services/api"
import ProductoCard from "./ProductoCard"

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center py-20 text-green-700 text-lg">
      Cargando productos...
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center py-20 text-red-500 text-lg">
      Error: {error}
    </div>
  )

  if (productos.length === 0) return (
    <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
      No hay productos disponibles.
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pt-10">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default Catalogo
