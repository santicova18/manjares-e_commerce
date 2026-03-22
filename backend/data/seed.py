from app.core.connection import SessionLocal
from app.core.security import hash_password
from app.models.admin import Admin
from app.models.categoria import Categoria
from app.models.producto import Producto


def seed():
    db = SessionLocal()
    try:
        # ── Admin ──────────────────────────────────────────────
        if not db.query(Admin).first():
            db.add(Admin(
                nombre="Administrador",
                email="admin@tienda.com",
                password=hash_password("123456"),
                rol="admin"
            ))
            db.commit()
            print("✓ Admin creado")
        else:
            print("- Admin ya existe, saltando")

        # ── Categorías ─────────────────────────────────────────
        if not db.query(Categoria).first():
            categorias = [
                Categoria(nombre="Frutas",   descripcion="Productos frescos del campo"),
                Categoria(nombre="Verduras", descripcion="Verduras orgánicas"),
                Categoria(nombre="Granos",   descripcion="Productos secos"),
            ]
            db.add_all(categorias)
            db.commit()
            print("✓ Categorías creadas")
        else:
            print("- Categorías ya existen, saltando")

        # ── Productos ──────────────────────────────────────────
        if not db.query(Producto).first():
            # Recuperar IDs reales de categorías
            frutas   = db.query(Categoria).filter(Categoria.nombre == "Frutas").first()
            verduras = db.query(Categoria).filter(Categoria.nombre == "Verduras").first()
            granos   = db.query(Categoria).filter(Categoria.nombre == "Granos").first()

            productos = [
                Producto(
                    nombre="Papa",
                    descripcion="Papa criolla fresca",
                    precio=2000,
                    unidad_medida="kg",
                    stock=50,
                    categoria_id=verduras.id,
                    imagen_url="https://images.unsplash.com/photo-1582515073490-dc06b3fbcf6b"
                ),
                Producto(
                    nombre="Manzana",
                    descripcion="Manzana roja importada",
                    precio=3500,
                    unidad_medida="kg",
                    stock=30,
                    categoria_id=frutas.id,
                    imagen_url="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
                ),
                Producto(
                    nombre="Arroz",
                    descripcion="Arroz blanco premium",
                    precio=1800,
                    unidad_medida="kg",
                    stock=100,
                    categoria_id=granos.id,
                    imagen_url="https://images.unsplash.com/photo-1586201375761-83865001e31c"
                ),
                Producto(
                    nombre="Tomate",
                    descripcion="Tomate fresco orgánico",
                    precio=2500,
                    unidad_medida="kg",
                    stock=40,
                    categoria_id=verduras.id,
                    imagen_url="https://images.unsplash.com/photo-1592928302636-c83cf1c3a9bb"
                ),
            ]
            db.add_all(productos)
            db.commit()
            print("✓ Productos creados")
        else:
            print("- Productos ya existen, saltando")

        print("\nSeed completado.")

    except Exception as e:
        db.rollback()
        print(f"Error durante el seed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()