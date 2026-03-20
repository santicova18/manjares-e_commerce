from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.core.connection import Base

class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)

    # Relación con Productos
    productos = relationship("Producto", back_populates="categoria")
