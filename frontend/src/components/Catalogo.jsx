import productos from "../data/productos"
import ProductoCard from "./ProductoCard"

function Catalogo() {
  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pt-10">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default Catalogo