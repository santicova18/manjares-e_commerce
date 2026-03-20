from app.repo.base_repo import BaseRepository
from app.models.pedido import Pedido
from sqlalchemy.orm import Session

class PedidoRepository(BaseRepository[Pedido]):
    def __init__(self, db: Session):
        super().__init__(Pedido, db)