from sqlalchemy import Column, Integer, String, Text, Boolean, DECIMAL, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.connection import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)
    precio = Column(DECIMAL(10, 2), nullable=False)
    unidad_medida = Column(String(20))
    imagen_url = Column(String(255))
    stock = Column(Integer, default=0)
    is_disponible = Column(Boolean, default=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    categoria = relationship("Categoria", back_populates="productos")
  
