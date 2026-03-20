from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime

class PedidoBase(BaseModel):
    nombre_cliente: Optional[str] = None
    telefono: Optional[str] = None
    producto_id: int
    cantidad: int = Field(default=1, ge=1)
    estado: str = "pendiente"

class PedidoCreate(PedidoBase):
    pass

class PedidoUpdate(BaseModel):
    nombre_cliente: Optional[str] = None
    telefono: Optional[str] = None
    producto_id: Optional[int] = None
    cantidad: Optional[int] = Field(None, ge=1)
    estado: Optional[str] = None

class Pedido(PedidoBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)