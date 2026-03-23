import { useState, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"

const formatPrecio = (valor) =>
  new Intl.NumberFormat("es-CO").format(Math.round(valor))

// ============================================
// FUNCIONES CRUD CON TOKEN DINÁMICO
// ============================================

const cargarProductos = async () => {
  // GET público - no requiere token
  const res = await fetch("/api/productos/list")
  if (!res.ok) {
    throw new Error("Error al cargar productos")
  }
  return res.json()
}

const cargarCategorias = async () => {
  // GET público - no requiere token
  const res = await fetch("/api/categorias/list")
  if (!res.ok) {
    throw new Error("Error al cargar categorías")
  }
  const data = await res.json()
  return data.lista
}

const guardarProducto = async (navigate, datos, editingId = null) => {
  const token = localStorage.getItem("token")

  if (!token) {
    alert("Sesión expirada. Inicia sesión de nuevo.")
    navigate("/admin")
    return
  }

  const url = editingId 
    ? `/api/productos/${editingId}` 
    : "/api/productos/"
  
  const method = editingId ? "PUT" : "POST"

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    })

    if (res.status === 401) {
      alert("Sesión expirada. Inicia sesión de nuevo.")
      localStorage.removeItem("token")
      navigate("/admin")
      return
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || "Error al guardar producto")
    }

    return await res.json()
  } catch (err) {
    throw err
  }
}

const eliminarProducto = async (navigate, id) => {
  const token = localStorage.getItem("token")

  if (!token) {
    alert("Sesión expirada. Inicia sesión de nuevo.")
    navigate("/admin")
    return
  }

  try {
    const res = await fetch(`/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    if (res.status === 401) {
      alert("Sesión expirada. Inicia sesión de nuevo.")
      localStorage.removeItem("token")
      navigate("/admin")
      return
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || "Error al eliminar producto")
    }

    return true
  } catch (err) {
    throw err
  }
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function AdminDashboard() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    unidad_medida: "kg",
    imagen_url: "",
    stock: 0,
    is_disponible: true,
    categoria_id: 1
  })

  // Check authentication
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/admin" />
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const [productosData, categoriasData] = await Promise.all([
        cargarProductos(),
        cargarCategorias()
      ])
      setProductos(productosData)
      setCategorias(categoriasData)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/admin")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const productData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      unidad_medida: formData.unidad_medida,
      imagen_url: formData.imagen_url,
      stock: parseInt(formData.stock),
      is_disponible: formData.is_disponible,
      categoria_id: parseInt(formData.categoria_id)
    }

    try {
      const editingId = editingProduct ? editingProduct.id : null
      await guardarProducto(navigate, productData, editingId)

      setShowForm(false)
      setEditingProduct(null)
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        unidad_medida: "kg",
        imagen_url: "",
        stock: 0,
        is_disponible: true,
        categoria_id: 1
      })
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = (producto) => {
    setEditingProduct(producto)
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precio: producto.precio.toString(),
      unidad_medida: producto.unidad_medida || "kg",
      imagen_url: producto.imagen_url || "",
      stock: producto.stock,
      is_disponible: producto.is_disponible,
      categoria_id: producto.categoria_id
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await eliminarProducto(navigate, id)
        fetchData()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  const toggleDisponibilidad = async (producto) => {
    const updateData = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      unidad_medida: producto.unidad_medida,
      imagen_url: producto.imagen_url,
      stock: parseInt(producto.stock),
      is_disponible: !producto.is_disponible,
      categoria_id: producto.categoria_id
    }

    try {
      await guardarProducto(navigate, updateData, producto.id)
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f2e8d9]" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Admin Navbar */}
      <nav className="bg-[#2c1810] border-b-4 border-[#c4874a] shadow-[0_4px_20px_rgba(44,24,16,0.4)] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-[#c4874a] p-1.5 rounded-full mr-3 text-xl">🌾</span>
          <h1 
            className="text-[#fdfaf5] font-bold text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Panel de Administración
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[#e8c99a] hover:text-[#fdfaf5] text-sm">Ver tienda</a>
          <button 
            onClick={handleLogout}
            className="text-[#e8c99a] hover:text-[#fdfaf5] text-sm border border-[#c4874a] px-4 py-2 rounded-lg hover:bg-[#5c3317] transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 
              className="text-3xl text-[#2c1810] font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gestión de Productos
            </h2>
            <p className="text-[#8b5e3c] mt-1">Administra el catálogo de la tienda</p>
          </div>
          <button 
            onClick={() => {
              setShowForm(true)
              setEditingProduct(null)
              setFormData({
                nombre: "",
                descripcion: "",
                precio: "",
                unidad_medida: "kg",
                imagen_url: "",
                stock: 0,
                is_disponible: true,
                categoria_id: 1
              })
            }}
            className="bg-[#5c3317] text-[#fdfaf5] px-6 py-3 rounded-2xl font-bold hover:bg-[#c4874a] hover:text-[#2c1810] transition-all duration-200 shadow-[0_4px_15px_rgba(92,51,23,0.3)]"
          >
            + Nuevo Producto
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-[#2c1810] bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-[#faf5ee] rounded-3xl p-8 max-w-2xl w-full shadow-[-8px_0_40px_rgba(44,24,16,0.3)] border-l-4 border-[#c4874a]">
              <h3 
                className="text-2xl text-[#2c1810] font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required
                      className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                      Precio
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.precio}
                      onChange={(e) => setFormData({...formData, precio: e.target.value})}
                      required
                      className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    rows={2}
                    className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                      Unidad
                    </label>
                    <input
                      type="text"
                      value={formData.unidad_medida}
                      onChange={(e) => setFormData({...formData, unidad_medida: e.target.value})}
                      placeholder="kg, bulto, unidad..."
                      className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                      Categoría
                    </label>
                    <select
                      value={formData.categoria_id}
                      onChange={(e) => setFormData({...formData, categoria_id: parseInt(e.target.value)})}
                      className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                    >
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#8b5e3c] text-xs uppercase tracking-widest font-medium block mb-1">
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    value={formData.imagen_url}
                    onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-[#f2e8d9] border-2 border-[#e8c99a] rounded-2xl px-4 py-3 text-[#2c1810] focus:outline-none focus:border-[#c4874a]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_disponible"
                    checked={formData.is_disponible}
                    onChange={(e) => setFormData({...formData, is_disponible: e.target.checked})}
                    className="w-5 h-5 accent-[#c4874a]"
                  />
                  <label htmlFor="is_disponible" className="text-[#2c1810]">
                    Disponible para venta
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingProduct(null)
                    }}
                    className="flex-1 border-2 border-[#e8c99a] text-[#8b5e3c] py-3 rounded-2xl font-bold hover:bg-[#f2e8d9] transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#5c3317] text-[#fdfaf5] py-3 rounded-2xl font-bold hover:bg-[#c4874a] hover:text-[#2c1810] transition shadow-[0_4px_15px_rgba(92,51,23,0.3)]"
                  >
                    {editingProduct ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-20 text-[#8b5e3c]">Cargando...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">Error: {error}</div>
        ) : (
          <div className="bg-[#faf5ee] rounded-3xl overflow-hidden border border-[#e8c99a] shadow-[0_4px_20px_rgba(44,24,16,0.08)]">
            <table className="w-full">
              <thead className="bg-[#2c1810] text-[#fdfaf5]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-widest">Producto</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-widest">Precio</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-right text-xs uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8c99a]">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-[#f2e8d9] transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {producto.imagen_url ? (
                          <img 
                            src={producto.imagen_url} 
                            alt={producto.nombre}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#e8c99a] flex items-center justify-center text-xl">
                            🌾
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[#2c1810]">{producto.nombre}</p>
                          <p className="text-sm text-[#8b5e3c]">{producto.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="font-bold text-[#5c3317] text-lg"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ${formatPrecio(producto.precio)}
                      </span>
                      <span className="text-[#c4874a] text-sm"> / {producto.unidad_medida}</span>
                    </td>
                    <td className="px-6 py-4 text-[#2c1810]">
                      {producto.stock} unidades
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleDisponibilidad(producto)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          producto.is_disponible 
                            ? "bg-[#4a5e3a] text-[#fdfaf5]" 
                            : "bg-[#8b5e3c] text-[#fdfaf5]"
                        }`}
                      >
                        {producto.is_disponible ? "✓ Disponible" : "Sin stock"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="px-4 py-2 bg-[#e8c99a] text-[#5c3317] rounded-xl hover:bg-[#c4874a] hover:text-[#2c1810] transition text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(producto.id)}
                          className="px-4 py-2 bg-[#8b5e3c] text-[#fdfaf5] rounded-xl hover:bg-[#2c1810] transition text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {productos.length === 0 && (
              <div className="text-center py-12 text-[#8b5e3c]">
                No hay productos disponibles. Crea el primero!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
