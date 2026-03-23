import { useState } from "react"
import { useCarrito } from "../context/CarritoContext"

const formatPrecio = (valor) =>
  new Intl.NumberFormat("es-CO").format(Math.round(valor))

function ProductoCard({ producto }) {
  const [cantidad, setCantidad] = useState(1)
  const { agregarAlCarrito } = useCarrito()

  const subtotal = producto.precio * cantidad

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad)
    setCantidad(1)
  }

  return (
    <div className="bg-[#faf5ee] rounded-3xl overflow-hidden border border-[#e8c99a] shadow-[0_4px_20px_rgba(44,24,16,0.08)] hover:shadow-[0_12px_40px_rgba(44,24,16,0.18)] hover:-translate-y-2 transition-all duration-400 group">

      {producto.imagen_url ? (
        <div className="relative overflow-hidden">
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#2c1810] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="h-56 w-full bg-[#e8c99a] flex items-center justify-center text-6xl">
          🌾
        </div>
      )}

      {producto.is_disponible ? (
        <div className="absolute top-3 right-3 bg-[#4a5e3a] text-[#fdfaf5] text-xs px-3 py-1 rounded-full font-medium tracking-wide">
          ✓ Disponible
        </div>
      ) : (
        <div className="absolute top-3 right-3 bg-[#8b5e3c] text-[#fdfaf5] text-xs px-3 py-1 rounded-full">
          Sin stock
        </div>
      )}

      <div className="p-5">
        <h2 
          className="text-[#2c1810] font-bold text-xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {producto.nombre}
        </h2>
        <p className="text-[#8b5e3c] text-sm mt-1 leading-relaxed">{producto.descripcion}</p>

        <div className="text-[#5c3317] font-bold text-2xl mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          ${formatPrecio(producto.precio)} <span className="text-sm font-normal text-[#c4874a]">/ {producto.unidad_medida}</span>
        </div>

        <div className="w-10 h-0.5 bg-[#e8c99a] my-4"></div>

        {producto.is_disponible ? (
          <>
            <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium mb-2 block">
              Cantidad ({producto.unidad_medida})
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={cantidad}
              onChange={(e) => setCantidad(parseFloat(e.target.value) || 0.1)}
              className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-center text-[#2c1810] font-bold text-lg focus:outline-none focus:border-[#c4874a] focus:bg-[#faf5ee] transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />

            <div className="bg-[#f2e8d9] rounded-2xl px-4 py-3 mt-3 flex justify-between items-center">
              <span className="text-[#8b5e3c] text-sm">Subtotal</span>
              <span className="text-[#2c1810] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                ${formatPrecio(subtotal)}
              </span>
            </div>

            <button
              onClick={handleAgregar}
              className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm tracking-widest uppercase bg-[#5c3317] text-[#fdfaf5] hover:bg-[#c4874a] hover:text-[#2c1810] active:scale-95 transition-all duration-200 shadow-[0_4px_15px_rgba(92,51,23,0.3)] hover:shadow-[0_4px_20px_rgba(196,135,74,0.4)]"
            >
              🛒  Agregar al pedido
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm tracking-widest uppercase cursor-not-allowed bg-[#e8c99a] text-[#8b5e3c] opacity-60"
          >
            Sin stock
          </button>
        )}
      </div>

    </div>
  )
}

export default ProductoCard
