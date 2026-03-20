from fastapi import APIRouter, Depends
from app.api.dependencies import get_configuracion_tienda_services
from app.services.configuracion_tienda_service import ConfiguracionTiendaService
from app.schemas.configuracion_tienda_schemas import ConfiguracionTiendaCreate, ConfiguracionTiendaUpdate
from app.core.security import get_current_admin

router = APIRouter()

@router.post("/")
def crear_configuracion_tienda(configuracion_in: ConfiguracionTiendaCreate, configuracion_service: ConfiguracionTiendaService = Depends(get_configuracion_tienda_services), current_admin = Depends(get_current_admin)):
    configuracion = configuracion_service.create_configuracion_tienda(configuracion_in)
    return {"MENSAJE": "Configuración de tienda creada correctamente", "CONFIGURACION": configuracion}

@router.get("/list")
def listar_configuraciones_tienda(configuracion_service: ConfiguracionTiendaService = Depends(get_configuracion_tienda_services)):
    lista = configuracion_service.list_configuraciones_tienda()
    return {"lista": lista}

@router.get("/{configuracion_id}")
def buscar_configuracion_tienda(configuracion_id: int, configuracion_service: ConfiguracionTiendaService = Depends(get_configuracion_tienda_services)):
    buscado = configuracion_service.get_configuracion_tienda(configuracion_id)
    return {"configuracion": buscado}

@router.put("/{configuracion_id}")
def actualizar_configuracion_tienda(configuracion_id: int, configuracion_update: ConfiguracionTiendaUpdate, configuracion_service: ConfiguracionTiendaService = Depends(get_configuracion_tienda_services), current_admin = Depends(get_current_admin)):
    actualizado = configuracion_service.update_configuracion_tienda(configuracion_id, configuracion_update)
    return {"configuracion": actualizado}

@router.delete("/{configuracion_id}")
def borrar_configuracion_tienda(configuracion_id: int, configuracion_service: ConfiguracionTiendaService = Depends(get_configuracion_tienda_services), current_admin = Depends(get_current_admin)):
    borrado = configuracion_service.delete_configuracion_tienda(configuracion_id)
    return {"configuracion": borrado}