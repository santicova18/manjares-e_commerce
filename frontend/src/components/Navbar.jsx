function Navbar() {
  return (
    <nav className="text-white px-6 py-4 flex items-center justify-between shadow-lg"
  style={{
    background: "linear-gradient(to right, #14532d, #16a34a)"
  }}
>
      
     <div className="flex items-center gap-2">
  <span className="text-2xl">🌿</span>
  <h1 
    className="text-2xl tracking-wide"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    Manjares del Campo
  </h1>
</div>

      <button className="bg-white text-green-800 font-semibold px-4 py-2 rounded-xl hover:bg-green-100 transition">
        Iniciar sesión
      </button>

    </nav>
  )
}

export default Navbar