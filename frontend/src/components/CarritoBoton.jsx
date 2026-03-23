import { useCarrito } from "../context/CarritoContext"

function CarritoBoton({ onClick }) {
  const { totalItems } = useCarrito()

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-[#5c3317] hover:bg-[#c4874a] w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(44,24,16,0.4)] hover:shadow-[0_8px_40px_rgba(196,135,74,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
    >
      <span className="text-2xl text-[#fdfaf5]">🛒</span>
      
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#c4874a] text-[#2c1810] font-bold w-6 h-6 rounded-full text-xs flex items-center justify-center border-2 border-[#faf5ee] shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  )
}

export default CarritoBoton
