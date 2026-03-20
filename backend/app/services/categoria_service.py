from typing import List
from fastapi import HTTPException
from app.repo.categoria_repo import CategoriaRepository
from app.schemas.categoria_schemas import CategoriaCreate, CategoriaUpdate
from app.models.categoria import Categoria

class CategoriaService:
    def __init__(self, repo: CategoriaRepository):
        self.repo = repo

    def get_categoria(self, categoria_id: int) -> Categoria:
        """Obtiene una categoría por su ID."""
        categoria = self.repo.get_by_id(categoria_id)
        if not categoria:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")
        return categoria

    def list_categorias(self, skip: int = 0, limit: int = 100) -> List[Categoria]:
        """Obtiene una lista de categorías con paginación."""
        return self.repo.list(skip=skip, limit=limit)

    def create_categoria(self, categoria_in: CategoriaCreate) -> Categoria:
        """Crea una nueva categoría."""
        categoria_data = categoria_in.model_dump()
        nueva_categoria = Categoria(**categoria_data)
        return self.repo.create(nueva_categoria)

    def update_categoria(self, categoria_id: int, categoria_update: CategoriaUpdate) -> Categoria:
        """Actualiza una categoría existente."""
        db_categoria = self.get_categoria(categoria_id)
        
        update_data = categoria_update.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=400, detail="No hay datos para actualizar")

        return self.repo.update(db_obj=db_categoria, updates=update_data)

    def delete_categoria(self, categoria_id: int) -> Categoria:
        """Elimina una categoría."""
        db_categoria = self.get_categoria(categoria_id)
        self.repo.delete(db_obj=db_categoria)
        return db_categoria