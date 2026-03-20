function SobreNosotros() {
  return (
    <section
      className="text-white py-16 px-6 mt-12"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="bg-black/50 rounded-2xl py-12 px-6">
        
        <div className="max-w-3xl mx-auto text-center">
          
          <span className="text-5xl">🌱</span>
          
          <h2 className="text-3xl font-bold mt-4 mb-4">
            Del campo a tu mesa
          </h2>
          
          <p className="text-green-100 text-lg leading-relaxed">
            Somos una iniciativa colombiana que conecta directamente a los agricultores 
            con las familias. Sin intermediarios, sin complicaciones — solo productos 
            frescos del campo con un mensaje de WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            <div className="bg-green-700/70 rounded-2xl p-6">
              <span className="text-4xl">🥬</span>
              <h3 className="font-bold text-lg mt-3">Productos frescos</h3>
              <p className="text-green-200 text-sm mt-2">Cosechados y entregados en la misma semana</p>
            </div>

            <div className="bg-green-700/70 rounded-2xl p-6">
              <span className="text-4xl">🤝</span>
              <h3 className="font-bold text-lg mt-3">Trato directo</h3>
              <p className="text-green-200 text-sm mt-2">Habla directamente con nosotros por WhatsApp</p>
            </div>

            <div className="bg-green-700/70 rounded-2xl p-6">
              <span className="text-4xl">🌍</span>
              <h3 className="font-bold text-lg mt-3">Apoyo local</h3>
              <p className="text-green-200 text-sm mt-2">Cada compra apoya a familias campesinas colombianas</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default SobreNosotros