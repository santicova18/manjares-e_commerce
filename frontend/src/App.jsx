import Catalogo from "./components/Catalogo"
import Navbar from "./components/Navbar"
import SobreNosotros from "./components/SobreNosotros"

function App() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <Catalogo />
      <SobreNosotros />
    </div>
  )
}

export default App