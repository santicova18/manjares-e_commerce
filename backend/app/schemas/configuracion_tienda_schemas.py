from pydantic import BaseModel, ConfigDict
from typing import Optional

class ConfiguracionTiendaBase(BaseModel):
    telefono_ws: str
    prefijo_mensaje: str

class ConfiguracionTiendaCreate(ConfiguracionTiendaBase):
    pass

class ConfiguracionTiendaUpdate(BaseModel):
    telefono_ws: Optional[str] = None
    prefijo_mensaje: Optional[str] = None

class ConfiguracionTienda(ConfiguracionTiendaBase):
    id: int

    model_config = ConfigDict(from_attributes=True)