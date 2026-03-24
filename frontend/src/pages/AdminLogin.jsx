import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // If already logged in with valid token, redirect to home
  const token = localStorage.getItem("token")
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload && payload.exp * 1000 > Date.now()) {
        return <Navigate to="/admin/dashboard" />
      }
    } catch (e) {
      localStorage.removeItem("token")
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("https://manjares-ecommerce-production.up.railway.app/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem("token", data.token)
        navigate("/admin/dashboard")
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || "Credenciales incorrectas. Intenta de nuevo.")
      }
    } catch (err) {
      setError("Credenciales incorrectas. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <div className="max-w-sm mx-auto mt-20 bg-[#fdfaf5] rounded-2xl shadow-[0_4px_30px_rgba(107,76,42,0.15)] p-8 w-full">
        <h2 className="text-[#3d5a2e] font-bold text-2xl text-center">
          Panel Administrativo
        </h2>
        <p className="text-[#6b4c2a] text-sm text-center mb-6">
          Acceso restringido
        </p>
        
        <div className="w-12 h-1 bg-[#d4a574] mx-auto mb-6 rounded-full"></div>

        <div className="space-y-4">
          <div>
            <label className="text-[#6b4c2a] text-sm font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full border border-[#d4a574] rounded-xl px-4 py-2.5 bg-[#fdfaf5] text-[#3d5a2e] focus:outline-none focus:ring-2 focus:ring-[#8fa878]"
            />
          </div>

          <div>
            <label className="text-[#6b4c2a] text-sm font-medium block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#d4a574] rounded-xl px-4 py-2.5 bg-[#fdfaf5] text-[#3d5a2e] focus:outline-none focus:ring-2 focus:ring-[#8fa878]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#3d5a2e] text-[#fdfaf5] py-3 rounded-xl font-semibold hover:bg-[#5a7a3a] transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
