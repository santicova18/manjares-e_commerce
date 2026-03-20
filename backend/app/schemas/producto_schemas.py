from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from decimal import Decimal

class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio: Decimal = Field(..., gt=0, decimal_places=2)
    unidad_medida: Optional[str] = None
    imagen_url: Optional[str] = None
    stock: int = Field(default=0, ge=0)
    is_disponible: bool = True
    categoria_id: int

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    # Todos opcionales para permitir actualizaciones parciales
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[Decimal] = Field(None, gt=0)
    unidad_medida: Optional[str] = None
    imagen_url: Optional[str] = None
    stock: Optional[int] = Field(None, ge=0)
    is_disponible: Optional[bool] = None
    categoria_id: Optional[int] = None

class Producto(ProductoBase):
    id: int

    # Configuración para Pydantic v2
    model_config = ConfigDict(from_attributes=True)