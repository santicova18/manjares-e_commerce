import Catalogo from "../components/Catalogo"
import Navbar from "../components/Navbar"
import SobreNosotros from "../components/SobreNosotros"
import CarritoBoton from "../components/CarritoBoton"
import CarritoPanel from "../components/CarritoPanel"
import { useState } from "react"

function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#f2e8d9]" style={{ fontFamily: "'Lato', sans-serif" }}>
      <Navbar />
      <SobreNosotros />
      <div className="relative -mt-10">
        <div className="h-10 bg-gradient-to-b from-transparent to-[#f2e8d9]"></div>
        <div id="catalogo" className="bg-[#f2e8d9] pb-16">
          <Catalogo />
        </div>
      </div>
      <CarritoBoton onClick={() => setIsOpen(true)} />
      <CarritoPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Home
