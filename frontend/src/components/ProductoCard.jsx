function ProductoCard({ producto }) {

  const mensaje = `${producto.nombre} - $${producto.precio} por ${producto.unidad_medida}`
  const urlWhatsApp = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">

      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{producto.nombre}</h2>
        <p className="text-sm text-gray-500 mt-1">{producto.descripcion}</p>

        <span className="block text-green-700 font-bold text-lg mt-3">
          ${producto.precio} / {producto.unidad_medida}
        </span>

        {producto.is_disponible ? (
          
            <a href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Comprar por WhatsApp
          </a>
        ) : (
          <button
            disabled
            className="mt-4 w-full bg-gray-200 text-gray-400 py-2 rounded-xl cursor-not-allowed"
          >
            Agotado
          </button>
        )}
      </div>

    </div>
  )
}

export default ProductoCard