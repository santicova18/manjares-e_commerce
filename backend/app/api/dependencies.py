from sqlalchemy.orm import Session
from fastapi import Depends

from app.core.connection import get_db
from app.repo.admin import AdminRepository
from app.repo.producto_repo import ProductoRepository

from app.services.admin import AdminServices
from app.services.producto_service import ProductoService


# Repositories
def get_admin_services(db: Session = Depends(get_db)) -> AdminServices:
     AdminRepository(db)
     return AdminServices(db)


def get_producto_services(db: Session = Depends(get_db)) -> ProductoService:
     ProductoRepository(db)
     return ProductoService(db)


