from sqlalchemy.orm import Session
from fastapi import Depends

from app.core.connection import get_db
from app.repo.admin import AdminRepository
from app.repo.producto_repo import ProductoRepository
from app.repo.categoria_repo import CategoriaRepository
from app.repo.configuracion_tienda_repo import ConfiguracionTiendaRepository
from app.repo.pedido_repo import PedidoRepository

from app.services.admin import AdminServices
from app.services.producto_service import ProductoService
from app.services.categoria_service import CategoriaService
from app.services.configuracion_tienda_service import ConfiguracionTiendaService
from app.services.pedido_service import PedidoService


# Repositories
def get_admin_services(db: Session = Depends(get_db)) -> AdminServices:
     repo = AdminRepository(db)
     return AdminServices(repo)


def get_producto_services(db: Session = Depends(get_db)) -> ProductoService:
     repo = ProductoRepository(db)
     return ProductoService(repo)

def get_categoria_services(db: Session = Depends(get_db)) -> CategoriaService:
     repo = CategoriaRepository(db)
     return CategoriaService(repo)

def get_configuracion_tienda_services(db: Session = Depends(get_db)) -> ConfiguracionTiendaService:
     repo = ConfiguracionTiendaRepository(db)
     return ConfiguracionTiendaService(repo)

def get_pedido_services(db: Session = Depends(get_db)) -> PedidoService:
     repo = PedidoRepository(db)
     return PedidoService(repo)


