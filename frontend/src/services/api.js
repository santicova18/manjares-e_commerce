const BASE_URL = "https://manjares-ecommerce-production.up.railway.app/api"

// Helper para headers con JWT
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
})

// PRODUCTOS
export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/productos/list`)
  if (!res.ok) throw new Error("Error al cargar productos")
  return res.json()
}

export const getProductoById = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`)
  if (!res.ok) throw new Error("Producto no encontrado")
  return res.json()
}

export const createProducto = async (data) => {
  const res = await fetch(`${BASE_URL}/productos/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al crear producto")
  return res.json()
}

export const updateProducto = async (id, data) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al actualizar producto")
  return res.json()
}

export const deleteProducto = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })
  if (!res.ok) throw new Error("Error al eliminar producto")
  return res.json()
}

// CATEGORIAS
export const getCategorias = async () => {
  const res = await fetch(`${BASE_URL}/categorias/list`)
  if (!res.ok) throw new Error("Error al cargar categorías")
  const data = await res.json()
  return data.lista  // el backend responde { lista: [...] }
}

// ADMIN LOGIN
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error("Credenciales inválidas")
  const data = await res.json()
  localStorage.setItem("token", data.token)
  return data
}

export const logoutAdmin = () => localStorage.removeItem("token")
