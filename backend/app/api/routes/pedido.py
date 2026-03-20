from fastapi import APIRouter, Depends
from app.api.dependencies import get_pedido_services
from app.services.pedido_service import PedidoService
from app.schemas.pedido_schemas import PedidoCreate, PedidoUpdate
from app.core.security import get_current_admin

router = APIRouter()

@router.post("/")
def crear_pedido(pedido_in: PedidoCreate, pedido_service: PedidoService = Depends(get_pedido_services)):
    pedido = pedido_service.create_pedido(pedido_in)
    return {"MENSAJE": "Pedido creado correctamente", "PEDIDO": pedido}

@router.get("/list")
def listar_pedidos(pedido_service: PedidoService = Depends(get_pedido_services)):
    lista = pedido_service.list_pedidos()
    return {"lista": lista}

@router.get("/{pedido_id}")
def buscar_pedido(pedido_id: int, pedido_service: PedidoService = Depends(get_pedido_services)):
    buscado = pedido_service.get_pedido(pedido_id)
    return {"pedido": buscado}

@router.put("/{pedido_id}")
def actualizar_pedido(pedido_id: int, pedido_update: PedidoUpdate, pedido_service: PedidoService = Depends(get_pedido_services), current_admin = Depends(get_current_admin)):
    actualizado = pedido_service.update_pedido(pedido_id, pedido_update)
    return {"pedido": actualizado}

@router.delete("/{pedido_id}")
def borrar_pedido(pedido_id: int, pedido_service: PedidoService = Depends(get_pedido_services), current_admin = Depends(get_current_admin)):
    borrado = pedido_service.delete_pedido(pedido_id)
    return {"pedido": borrado}