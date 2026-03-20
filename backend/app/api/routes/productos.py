from fastapi import APIRouter
from app.api.dependencies import  get_producto_services
from app.services.producto_service import ProductoService
from app.schemas.producto_schemas import ProductoCreate
from app.core.security import get_current_admin
from fastapi import Depends

router= APIRouter()


@router.post("/")
def crear_producto(producto_in: ProductoCreate, producto_service: ProductoService = Depends(get_producto_services)):
    producto= producto_service.create_producto(producto_in)
    return {"MENSAJE": "Producto creado correctamente", "PRODUCTO": producto}

@router.get("/list")
def listar_producto(producto_service: ProductoService = Depends(get_producto_services)):
    lista=producto_service.list_productos()
    return {"lista": lista}

@router.get("/{producto_id}")
def buscar_producto(producto_id: int,producto: ProductoService = Depends(get_producto_services)):
    buscado= producto.get_producto(producto_id)
    return {"producto": buscado}

@router.put("/{producto_id}")
def actualizar_producto(producto_id:int,producto: ProductoService = Depends(get_producto_services), admin: ProductoService = Depends(get_current_admin)):
    actualizado= producto.update_producto(producto_id,producto)
    return{"producto": actualizado}

@router.delete("/{producto_id}")
def borrar_producto(producto_id:int , producto: ProductoService = Depends(get_producto_services), admin: ProductoService = Depends(get_current_admin )):
    borrado= producto.delete_producto(producto_id)
    return {"producto": borrado}



