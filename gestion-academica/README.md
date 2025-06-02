# Gestión Académica

Este proyecto es una aplicación web para gestionar estudiantes, asignaturas y profesores. Utiliza una API REST para la persistencia de datos con MySQL.

## Estructura del Proyecto

```
gestion-academica
├── src
│   ├── app.js                  # Punto de entrada de la aplicación
│   ├── db.js                   # Manejo de la conexión a la base de datos MySQL
│   ├── routes
│   │   ├── estudiantes.js       # Rutas para operaciones CRUD de estudiantes
│   │   ├── asignaturas.js       # Rutas para operaciones CRUD de asignaturas
│   │   └── profesores.js         # Rutas para operaciones CRUD de profesores
│   └── controllers
│       ├── estudiantesController.js  # Lógica de negocio para estudiantes
│       ├── asignaturasController.js  # Lógica de negocio para asignaturas
│       └── profesoresController.js    # Lógica de negocio para profesores
├── package.json                 # Configuración del proyecto para npm
├── .env                         # Variables de entorno para la configuración
└── README.md                    # Documentación del proyecto
```

## Requisitos

- Node.js
- MySQL

## Instalación

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   ```

2. Navega al directorio del proyecto:
   ```
   cd gestion-academica
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Configura las variables de entorno en el archivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_la_base_de_datos
   ```

## Ejecución

Para iniciar la aplicación, ejecuta el siguiente comando:
```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Funcionalidades

- Registro, consulta, actualización y eliminación de estudiantes.
- Registro, consulta, actualización y eliminación de asignaturas.
- Registro, consulta, actualización y eliminación de profesores.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.