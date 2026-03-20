from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from app.schemas.admin_schemas import AdminClaims


# Security settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
VERIFICATION_TOKEN_EXPIRE_HOURS = 24  # tokens de verificación válidos 24 horas

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ==================== Password Functions ====================
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# ==================== Token Functions ====================
def create_access_token(
    data: dict, expires_delta: Optional[timedelta] = None
) -> str:
    """Crea un token de acceso para operaciones normales."""
    to_encode = data.copy()
    to_encode["type"] = "access"
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> AdminClaims:
    """Decodifica el token y extrae los claims."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        rol: str = payload.get("rol")
        nombre: str = payload.get("nombre", "")
        if email is None or rol is None:
            raise credentials_exception
        return AdminClaims(email=email, rol=rol, nombre=nombre)
    except JWTError:
        raise credentials_exception

def get_current_admin(token: str = Depends(oauth2_scheme)) -> AdminClaims:
    """Verifica el token y que el usuario tenga rol de admin."""
    claims = decode_access_token(token)
    if claims.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos de administrador"
        )
    return claims
