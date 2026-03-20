from typing import List
from fastapi import HTTPException
from app.repo.pedido_repo import PedidoRepository
from app.schemas.pedido_schemas import PedidoCreate, PedidoUpdate
from app.models.pedido import Pedido

class PedidoService:
    def __init__(self, repo: PedidoRepository):
        self.repo = repo

    def get_pedido(self, pedido_id: int) -> Pedido:
        """Obtiene un pedido por su ID."""
        pedido = self.repo.get_by_id(pedido_id)
        if not pedido:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        return pedido

    def list_pedidos(self, skip: int = 0, limit: int = 100) -> List[Pedido]:
        """Obtiene una lista de pedidos con paginación."""
        return self.repo.list(skip=skip, limit=limit)

    def create_pedido(self, pedido_in: PedidoCreate) -> Pedido:
        """Crea un nuevo pedido."""
        pedido_data = pedido_in.model_dump()
        nuevo_pedido = Pedido(**pedido_data)
        return self.repo.create(nuevo_pedido)

    def update_pedido(self, pedido_id: int, pedido_update: PedidoUpdate) -> Pedido:
        """Actualiza un pedido existente."""
        db_pedido = self.get_pedido(pedido_id)
        
        update_data = pedido_update.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=400, detail="No hay datos para actualizar")

        return self.repo.update(db_obj=db_pedido, updates=update_data)

    def delete_pedido(self, pedido_id: int) -> Pedido:
        """Elimina un pedido."""
        db_pedido = self.get_pedido(pedido_id)
        self.repo.delete(db_obj=db_pedido)
        return db_pedido