from typing import List
from fastapi import HTTPException
from app.repo.configuracion_tienda_repo import ConfiguracionTiendaRepository
from app.schemas.configuracion_tienda_schemas import ConfiguracionTiendaCreate, ConfiguracionTiendaUpdate
from app.models.configuracion_tienda import ConfiguracionTienda

class ConfiguracionTiendaService:
    def __init__(self, repo: ConfiguracionTiendaRepository):
        self.repo = repo

    def get_configuracion_tienda(self, configuracion_id: int) -> ConfiguracionTienda:
        """Obtiene una configuración de tienda por su ID."""
        configuracion = self.repo.get_by_id(configuracion_id)
        if not configuracion:
            raise HTTPException(status_code=404, detail="Configuración de tienda no encontrada")
        return configuracion

    def list_configuraciones_tienda(self, skip: int = 0, limit: int = 100) -> List[ConfiguracionTienda]:
        """Obtiene una lista de configuraciones de tienda con paginación."""
        return self.repo.list(skip=skip, limit=limit)

    def create_configuracion_tienda(self, configuracion_in: ConfiguracionTiendaCreate) -> ConfiguracionTienda:
        """Crea una nueva configuración de tienda."""
        configuracion_data = configuracion_in.model_dump()
        nueva_configuracion = ConfiguracionTienda(**configuracion_data)
        return self.repo.create(nueva_configuracion)

    def update_configuracion_tienda(self, configuracion_id: int, configuracion_update: ConfiguracionTiendaUpdate) -> ConfiguracionTienda:
        """Actualiza una configuración de tienda existente."""
        db_configuracion = self.get_configuracion_tienda(configuracion_id)
        
        update_data = configuracion_update.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=400, detail="No hay datos para actualizar")

        return self.repo.update(db_obj=db_configuracion, updates=update_data)

    def delete_configuracion_tienda(self, configuracion_id: int) -> ConfiguracionTienda:
        """Elimina una configuración de tienda."""
        db_configuracion = self.get_configuracion_tienda(configuracion_id)
        self.repo.delete(db_obj=db_configuracion)
        return db_configuracion