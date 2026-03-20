import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# URL de conexión (usando el driver pymysql)
DATABASE_URL = os.getenv("DATABASE_URL")


# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear una clase de sesión configurada
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para los modelos ORM
Base = declarative_base()

# Dependencia para obtener la sesión de BD (útil para FastAPI/Flask)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
