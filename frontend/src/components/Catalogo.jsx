import { useEffect, useState } from "react"
import { getProductos, getCategorias } from "../services/api"
import ProductoCard from "./ProductoCard"

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getProductos(), getCategorias()])
      .then(([prods, cats]) => {
        setProductos(prods)
        setCategorias(cats)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center py-20 text-[#8b5e3c] text-lg">
      Cargando productos...
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center py-20 text-red-500 text-lg">
      Error: {error}
    </div>
  )

  const productosFiltrados = categoriaActiva
    ? productos.filter(p => p.categoria_id === categoriaActiva)
    : productos

  return (
    <div className="px-6 pb-16">

      {/* Título sección */}
      <div className="text-center mb-8">
        <h2
          className="text-4xl text-[#2c1810] font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Nuestros Productos
        </h2>
        <div className="w-16 h-1 bg-[#c4874a] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setCategoriaActiva(null)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
            categoriaActiva === null
              ? "bg-[#5c3317] text-[#fdfaf5] border-[#5c3317]"
              : "bg-transparent text-[#5c3317] border-[#c4874a] hover:bg-[#f2e8d9]"
          }`}
        >
          Todos
        </button>
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
              categoriaActiva === cat.id
                ? "bg-[#5c3317] text-[#fdfaf5] border-[#5c3317]"
                : "bg-transparent text-[#5c3317] border-[#c4874a] hover:bg-[#f2e8d9]"
            }`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <div className="flex justify-center items-center py-20 text-[#8b5e3c] text-lg">
          No hay productos en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {productosFiltrados.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Catalogo
