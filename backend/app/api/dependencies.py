from sqlalchemy.orm import Session
from fastapi import Depends

from app.core.connection import get_db
from app.repo.admin import AdminRepository
from app.repo.producto_repo import ProductoRepository
from app.repo.categoria_repo import CategoriaRepository


from app.services.admin import AdminServices
from app.services.producto_service import ProductoService
from app.services.categoria_service import CategoriaService



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




