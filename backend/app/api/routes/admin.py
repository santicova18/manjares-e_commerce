from fastapi import APIRouter , Depends
from app.schemas.admin_schemas import AdminLogin
from app.api.dependencies import get_admin_services
from app.services.admin import AdminServices
from app.core.security import create_access_token

router= APIRouter()

@router.post("/login")
def login_admin(ad:AdminLogin, services: AdminServices= Depends(get_admin_services)):
    admin= services.login(ad.email, ad.password)
  tk = create_access_token({
    "sub": admin.email,
    "rol": admin.rol,
    "nombre": admin.nombre
})
    return {"token": tk}
