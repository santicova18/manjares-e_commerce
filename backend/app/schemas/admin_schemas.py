from pydantic import BaseModel , EmailStr

class AdminLogin(BaseModel):
    email : EmailStr
    password: str

class AdminClaims(BaseModel):
    email: EmailStr
    rol: str
    nombre: str
