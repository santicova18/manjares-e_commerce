from pydantic import BaseModel, ConfigDict
from typing import Optional
from decimal import Decimal


# Propiedades compartidas que todos los schemas de producto tendrán
class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio: Decimal
    unidad_medida: Optional[str] = None
    imagen_url: Optional[str] = None
    stock: int = 0
    is_disponible: bool = True
    categoria_id: int


# Schema para la creación de un producto
class ProductoCreate(ProductoBase):
    pass


# Schema para la actualización de un producto (todos los campos son opcionales)
class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[Decimal] = None
    unidad_medida: Optional[str] = None
    imagen_url: Optional[str] = None
    stock: Optional[int] = None
    is_disponible: Optional[bool] = None
    categoria_id: Optional[int] = None


# Schema para leer/retornar un producto desde la API
class Producto(ProductoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)