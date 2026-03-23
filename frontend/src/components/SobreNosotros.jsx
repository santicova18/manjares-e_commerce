function SobreNosotros() {
  const scrollToCatalogo = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="sobre-nosotros"
      className="mt-0 pt-0"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh"
      }}
    >
      <div 
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: 'linear-gradient(135deg, rgba(44,24,16,0.85) 0%, rgba(92,51,23,0.7) 50%, rgba(196,135,74,0.4) 100%)' }}
      >
        
        <span className="bg-[#c4874a] bg-opacity-20 border border-[#c4874a] text-[#e8c99a] text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 inline-block">
          🌱 Cosecha de la semana
        </span>
        
        <h2 
          className="text-5xl md:text-7xl text-[#fdfaf5] font-bold leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Del campo a tu mesa
        </h2>
        
        <div className="w-24 h-0.5 bg-[#c4874a] mx-auto mb-6"></div>
        
        <p className="text-[#e8c99a] text-lg max-w-xl mx-auto leading-relaxed opacity-90">
          Somos una iniciativa colombiana que conecta directamente a los agricultores 
          con las familias. Sin intermediarios, sin complicaciones — solo productos 
          frescos del campo con un mensaje de WhatsApp.
        </p>

        <button 
          onClick={scrollToCatalogo}
          className="bg-[#c4874a] text-[#2c1810] font-bold px-8 py-4 rounded-full mt-8 hover:bg-[#e8c99a] transition-all duration-300 shadow-[0_4px_20px_rgba(196,135,74,0.4)] text-sm tracking-widest uppercase"
        >
          Ver productos →
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-16" style={{ marginTop: '-4rem' }}>
        
        <div className="bg-[#faf5ee] rounded-2xl p-6 border-t-4 border-[#c4874a] shadow-[0_8px_30px_rgba(44,24,16,0.15)] hover:shadow-[0_16px_40px_rgba(44,24,16,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
          <div className="bg-[#f2e8d9] w-14 h-14 flex items-center justify-center rounded-full mb-4 text-2xl border-2 border-[#e8c99a]">
            🥬
          </div>
          <h3 
            className="text-[#2c1810] font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Productos frescos
          </h3>
          <p className="text-[#8b5e3c] text-sm leading-relaxed mt-2">
            Cosechados y entregados en la misma semana
          </p>
        </div>

        <div className="bg-[#faf5ee] rounded-2xl p-6 border-t-4 border-[#c4874a] shadow-[0_8px_30px_rgba(44,24,16,0.15)] hover:shadow-[0_16px_40px_rgba(44,24,16,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
          <div className="bg-[#f2e8d9] w-14 h-14 flex items-center justify-center rounded-full mb-4 text-2xl border-2 border-[#e8c99a]">
            🤝
          </div>
          <h3 
            className="text-[#2c1810] font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trato directo
          </h3>
          <p className="text-[#8b5e3c] text-sm leading-relaxed mt-2">
            Habla directamente con nosotros por WhatsApp
          </p>
        </div>

        <div className="bg-[#faf5ee] rounded-2xl p-6 border-t-4 border-[#c4874a] shadow-[0_8px_30px_rgba(44,24,16,0.15)] hover:shadow-[0_16px_40px_rgba(44,24,16,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
          <div className="bg-[#f2e8d9] w-14 h-14 flex items-center justify-center rounded-full mb-4 text-2xl border-2 border-[#e8c99a]">
            🌍
          </div>
          <h3 
            className="text-[#2c1810] font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Apoyo local
          </h3>
          <p className="text-[#8b5e3c] text-sm leading-relaxed mt-2">
            Cada compra apoya a familias campesinas colombianas
          </p>
        </div>

      </div>
    </section>
  )
}

export default SobreNosotros
