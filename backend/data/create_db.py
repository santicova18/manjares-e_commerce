import pymysql
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

# --- DATOS DE CONEXIÓN (Cámbialos por tus credenciales de la nube) ---


# URL de conexión (Asegúrate de tener instalada la librería 'cryptography')
DATABASE_URL = os.getenv("DATABASE_URL")

def run_sql_file(filename):
    try:
        # 1. Crear el motor de conexión
        engine = create_engine(DATABASE_URL)
        
        # 2. Leer el archivo .sql
        print(f"📂 Leyendo archivo: {filename}...")
        with open(filename, 'r', encoding='utf-8') as f:
            # Separamos por ';' para ejecutar comando por comando
            sql_commands = f.read().split(';')

        # 3. Ejecutar comandos
        with engine.connect() as connection:
            print("🚀 Conectado a la nube. Ejecutando scripts...")
            
            for command in sql_commands:
                clean_command = command.strip()
                if clean_command:
                    connection.execute(text(clean_command))
            
            connection.commit()
            print("✅ ¡Todo ejecutado con éxito en la base de datos!")

    except FileNotFoundError:
        print(f"❌ Error: No encontré el archivo '{filename}'")
    except Exception as e:
        print(f"❌ Error de conexión o SQL: {e}")

if __name__ == "__main__":
    # Nombre del archivo SQL que quieres subir
    run_sql_file("data/db.sql")