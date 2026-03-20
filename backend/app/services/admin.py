from app.repo.admin import AdminRepository
from app.core.security import verify_password
from app.schemas.admin_schemas import AdminClaims
from fastapi import HTTPException


invalid_credentials= HTTPException(status_code=401, detail="Invalid credentials")



class AdminServices:
    def __init__(self, repo: AdminRepository):
        self.repo = repo

    
    def login(self,email:str , password:str):
        admin= self.repo.find_by_email(email)
        if not admin:
            raise invalid_credentials
        if not  verify_password(password, admin.password):
            raise invalid_credentials
        
        data= AdminClaims(email=admin.email, rol=admin.rol, nombre=admin.nombre)
        return data
       
    
        
        



