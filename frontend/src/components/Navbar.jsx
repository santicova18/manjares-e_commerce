function Navbar() {
  return (
    <nav className="bg-[#2c1810] border-b-4 border-[#c4874a] shadow-[0_4px_20px_rgba(44,24,16,0.4)] sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
      
      <div className="flex items-center">
        <span className="bg-[#c4874a] p-1.5 rounded-full mr-3 text-xl">🌾</span>
        <div>
          <h1 
            className="text-[#fdfaf5] font-bold text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manjares del Campo
          </h1>
          <p className="text-[#e8c99a] text-xs tracking-widest uppercase">
            Del campo a tu mesa
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <a 
          href="#sobre-nosotros" 
          className="text-[#e8c99a] text-sm tracking-wide relative overflow-hidden hover:text-[#fdfaf5] transition-colors after:content-[''] after:block after:h-0.5 after:bg-[#c4874a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
        >
          Sobre Nosotros
        </a>
        <a 
          href="#catalogo" 
          className="text-[#e8c99a] text-sm tracking-wide relative overflow-hidden hover:text-[#fdfaf5] transition-colors after:content-[''] after:block after:h-0.5 after:bg-[#c4874a] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
        >
          Productos
        </a>
      </div>

    </nav>
  )
}

export default Navbar
