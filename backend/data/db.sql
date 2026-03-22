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


-- =========================
-- TABLA: categorias
-- =========================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


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