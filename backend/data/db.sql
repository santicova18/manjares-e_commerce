-- =========================
-- TABLA: admin
-- =========================
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin inicial (⚠️ luego encripta en backend)
INSERT INTO admin (nombre, email, password) VALUES
('Administrador', 'admin@tienda.com', '123456');


-- =========================
-- TABLA: categorias
-- =========================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

INSERT INTO categorias (nombre, descripcion) VALUES
('Frutas', 'Productos frescos del campo'),
('Verduras', 'Verduras orgánicas'),
('Granos', 'Productos secos');


-- =========================
-- TABLA: productos
-- =========================
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    unidad_medida VARCHAR(20),
    imagen_url VARCHAR(255),
    stock INT DEFAULT 0,
    is_disponible BOOLEAN DEFAULT TRUE,
    categoria_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Productos con imágenes (URL)
INSERT INTO productos (nombre, descripcion, precio, unidad_medida, stock, categoria_id, imagen_url) VALUES
('Papa', 'Papa criolla fresca', 2000, 'kg', 50, 2, 'https://images.unsplash.com/photo-1582515073490-dc06b3fbcf6b'),
('Manzana', 'Manzana roja importada', 3500, 'kg', 30, 1, 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce'),
('Arroz', 'Arroz blanco premium', 1800, 'kg', 100, 3, 'https://images.unsplash.com/photo-1586201375761-83865001e31c'),
('Tomate', 'Tomate fresco orgánico', 2500, 'kg', 40, 2, 'https://images.unsplash.com/photo-1592928302636-c83cf1c3a9bb');


-- =========================
-- TABLA: configuracion_tienda
-- =========================
CREATE TABLE configuracion_tienda (
    id INT PRIMARY KEY,
    telefono_ws VARCHAR(20) NOT NULL,
    prefijo_mensaje TEXT NOT NULL
);



-- =========================
-- TABLA: pedidos
-- =========================
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(100),
    telefono VARCHAR(20),
    producto_id INT,
    cantidad INT DEFAULT 1,
    estado VARCHAR(50) DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (producto_id) REFERENCES productos(id)
);