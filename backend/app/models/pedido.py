from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.connection import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    nombre_cliente = Column(String(100))
    telefono = Column(String(20))
    producto_id = Column(Integer, ForeignKey("productos.id"))
    cantidad = Column(Integer, default=1)
    estado = Column(String(50), default="pendiente")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relación
    producto = relationship("Producto", back_populates="pedidos")
