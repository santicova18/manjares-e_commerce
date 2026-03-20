from app.repo.base_repo import BaseRepository
from app.models.configuracion_tienda import ConfiguracionTienda
from sqlalchemy.orm import Session

class ConfiguracionTiendaRepository(BaseRepository[ConfiguracionTienda]):
    def __init__(self, db: Session):
        super().__init__(ConfiguracionTienda, db)