from sqlalchemy import Column, Integer, String, Text
from app.core.connection import Base

class ConfiguracionTienda(Base):
    __tablename__ = "configuracion_tienda"

    id = Column(Integer, primary_key=True)
    telefono_ws = Column(String(20), nullable=False)
    prefijo_mensaje = Column(Text, nullable=False)
