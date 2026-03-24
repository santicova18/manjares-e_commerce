from fastapi import FastAPI, APIRouter
from app.api.routes import productos, categoria, admin
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Manjares E-commerce API",
    description="API para la tienda de manjares.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
api_v1_router = APIRouter()
api_v1_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_v1_router.include_router(productos.router, prefix="/productos", tags=["Productos"])
api_v1_router.include_router(categoria.router, prefix="/categorias", tags=["Categorías"])

app.include_router(api_v1_router, prefix="/api")

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bienvenido a la API de Manjares E-commerce"}
