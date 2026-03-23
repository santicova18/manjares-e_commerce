import { useCarrito } from "../context/CarritoContext"

const formatPrecio = (valor) =>
  new Intl.NumberFormat("es-CO").format(Math.round(valor))

const WHATSAPP_NUMERO = "573001234567"

function CarritoPanel({ isOpen, onClose }) {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, totalPrecio, totalItems } = useCarrito()

  const construirMensaje = () => {
    if (carrito.length === 0) return ""

    let mensaje = "Hola! Quiero hacer el siguiente pedido:\n\n"

    carrito.forEach((item) => {
      const subtotal = item.precio * item.cantidad
      mensaje += `🛒 ${item.nombre} - ${item.cantidad} ${item.unidad_medida} → $${formatPrecio(subtotal)}\n`
    })

    mensaje += `\nTotal: $${formatPrecio(totalPrecio)}\n\n¡Gracias!`

    return encodeURIComponent(mensaje)
  }

  const enviarWhatsApp = () => {
    const mensaje = construirMensaje()
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`
    window.open(url, "_blank")
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#2c1810] bg-opacity-60 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#faf5ee] shadow-[-8px_0_40px_rgba(44,24,16,0.3)] z-50 flex flex-col border-l-4 border-[#c4874a] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2c1810] px-6 py-5 border-b-4 border-[#c4874a] flex justify-between items-center">
          <div>
            <h2 
              className="text-[#fdfaf5] font-bold text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tu Pedido 🌾
            </h2>
            <p className="text-[#e8c99a] text-sm">{totalItems} productos</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#e8c99a] hover:text-[#fdfaf5] text-2xl w-8 h-8 flex items-center justify-center hover:bg-[#5c3317] rounded-full transition-all"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {carrito.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <span className="text-6xl mb-4">🌾</span>
              <p 
                className="text-[#8b5e3c] font-bold text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tu pedido está vacío
              </p>
              <p className="text-[#c4874a] text-sm mt-2">Agrega productos del catálogo</p>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#faf5ee] rounded-2xl p-4 border border-[#e8c99a] shadow-[0_2px_10px_rgba(44,24,16,0.06)]"
                >
                  <div className="flex justify-between items-start">
                    <h3 
                      className="text-[#2c1810] font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.nombre}
                    </h3>
                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="text-[#c4874a] hover:text-[#2c1810] hover:bg-[#e8c99a] w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-[#8b5e3c] text-xs">${formatPrecio(item.precio)} / {item.unidad_medida}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={item.cantidad}
                      onChange={(e) =>
                        actualizarCantidad(item.id, parseFloat(e.target.value) || 0.1)
                      }
                      className="bg-[#f2e8d9] border border-[#e8c99a] rounded-xl px-3 py-1.5 text-center text-[#2c1810] font-bold w-20 focus:outline-none focus:border-[#c4874a]"
                    />
                    <span 
                      className="text-[#5c3317] font-bold text-lg ml-auto"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ${formatPrecio(item.precio * item.cantidad)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#2c1810] px-6 py-5 border-t-4 border-[#c4874a]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#e8c99a] text-sm uppercase tracking-widest">Total del pedido:</span>
            <span 
              className="text-[#fdfaf5] font-bold text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ${formatPrecio(totalPrecio)}
            </span>
          </div>

          <button
            onClick={enviarWhatsApp}
            disabled={carrito.length === 0}
            className="w-full bg-[#c4874a] text-[#2c1810] font-bold py-4 rounded-2xl hover:bg-[#e8c99a] transition-all duration-200 text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(196,135,74,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            📲 Enviar por WhatsApp
          </button>
          
          <button
            onClick={vaciarCarrito}
            disabled={carrito.length === 0}
            className="w-full mt-2 text-[#e8c99a] text-xs uppercase tracking-widest hover:text-[#fdfaf5] transition-colors py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Vaciar pedido
          </button>
        </div>
      </aside>
    </>
  )
}

export default CarritoPanel
