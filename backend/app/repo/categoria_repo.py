from app.repo.base_repo import BaseRepository
from app.models.categoria import Categoria
from sqlalchemy.orm import Session

class CategoriaRepository(BaseRepository[Categoria]):
    def __init__(self, db: Session):
        super().__init__(Categoria, db)