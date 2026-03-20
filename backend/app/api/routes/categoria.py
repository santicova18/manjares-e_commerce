from fastapi import APIRouter, Depends
from app.api.dependencies import get_categoria_services
from app.services.categoria_service import CategoriaService
from app.schemas.categoria_schemas import CategoriaCreate, CategoriaUpdate
from app.core.security import get_current_admin

router = APIRouter()

@router.post("/")
def crear_categoria(categoria_in: CategoriaCreate, categoria_service: CategoriaService = Depends(get_categoria_services), current_admin = Depends(get_current_admin)):
    categoria = categoria_service.create_categoria(categoria_in)
    return {"MENSAJE": "Categoría creada correctamente", "CATEGORIA": categoria}

@router.get("/list")
def listar_categorias(categoria_service: CategoriaService = Depends(get_categoria_services)):
    lista = categoria_service.list_categorias()
    return {"lista": lista}

@router.get("/{categoria_id}")
def buscar_categoria(categoria_id: int, categoria_service: CategoriaService = Depends(get_categoria_services)):
    buscado = categoria_service.get_categoria(categoria_id)
    return {"categoria": buscado}

@router.put("/{categoria_id}")
def actualizar_categoria(categoria_id: int, categoria_update: CategoriaUpdate, categoria_service: CategoriaService = Depends(get_categoria_services), current_admin = Depends(get_current_admin)):
    actualizado = categoria_service.update_categoria(categoria_id, categoria_update)
    return {"categoria": actualizado}

@router.delete("/{categoria_id}")
def borrar_categoria(categoria_id: int, categoria_service: CategoriaService = Depends(get_categoria_services), current_admin = Depends(get_current_admin)):
    borrado = categoria_service.delete_categoria(categoria_id)
    return {"categoria": borrado}