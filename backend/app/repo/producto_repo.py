from app.repo.base_repo import BaseRepository
from app.models.producto import Producto
from sqlalchemy.orm import Session

class ProductoRepository(BaseRepository[Producto]):
    def __init__(self, db: Session):
        super().__init__(Producto, db)