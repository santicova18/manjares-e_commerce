from typing import List
from fastapi import HTTPException
from app.repo.producto_repo import ProductoRepository
from app.schemas.producto_schemas import ProductoCreate, ProductoUpdate
from app.models.producto import Producto


class ProductoService:
    def __init__(self, repo: ProductoRepository):
        self.repo = repo

    def get_producto(self, producto_id: int) -> Producto:
        """Obtiene un producto por su ID."""
        producto = self.repo.get_by_id(producto_id)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return producto

    def list_productos(self, skip: int = 0, limit: int = 100) -> List[Producto]:
        """Obtiene una lista de productos con paginación."""
        return self.repo.list(skip=skip, limit=limit)

    def create_producto(self, producto_in: ProductoCreate) -> Producto:
        """Crea un nuevo producto."""
        # La base de datos lanzará un error de integridad si categoria_id no es válido
        producto_data = producto_in.model_dump()
        nuevo_producto = Producto(**producto_data)
        return self.repo.create(nuevo_producto)

    def update_producto(self, producto_id: int, producto_update: ProductoUpdate) -> Producto:
        """Actualiza un producto existente."""
        db_producto = self.get_producto(producto_id) 
        
        update_data = producto_update.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=400, detail="No hay datos para actualizar")

        return self.repo.update(db_obj=db_producto, updates=update_data)

    def delete_producto(self, producto_id: int) -> Producto:
        """Elimina un producto."""
        db_producto = self.get_producto(producto_id) # Reutiliza get_producto para encontrar y manejar el 404
        self.repo.delete(db_obj=db_producto)
        return db_producto