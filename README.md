# Employee Hub Monorepo

Este monorepo contiene dos proyectos principales dedicados a la gestión de empleados dentro de una empresa:

- [employee-hub-backend](https://github.com/RodriEscalera/employeer-hub/tree/main/backend), que ofrece una API RESTful para operaciones CRUD sobre los empleados,
- [employee-hub-frontend](https://github.com/RodriEscalera/employeer-hub/tree/main/frontend), que proporciona una interfaz de usuario amigable para interactuar con el backend.

## Backend: Node.js, Express, y MongoDB

El backend de Employee Hub está diseñado para ser robusto, escalable, y fácil de mantener, usando tecnologías modernas como _Node.js_, _Express_, y _MongoDB_.

Su estructura está pensada para soportar autenticación, manejo de errores, y operaciones CRUD.

### Tecnologías principales

- **Node.js** como entorno de ejecución para JavaScript en el servidor.
- **Express** para la creación de la API RESTful.
- **MongoDB** como base de datos NoSQL para almacenar datos de empleados.
- **Docker** para contenerizar la aplicación y sus dependencias, asegurando un entorno consistente.

### Configuración inicial

Para configurar y ejecutar el backend:

1. **Instalación de Docker**: Se requiere tener Docker y Docker Compose previamente instalados en el sistema.
2. **Variables de Entorno**: Creá un archivo _.env_ en el directorio `/backend` basado en _.env.example_, ajustando las variables según tu entorno local o de producción.
3. **Docker Compose**: Ejecutá `$ docker compose up` desde el directorio raíz para construir y arrancar los contenedores de la aplicación y la base de datos.

### Desarrollo

- **Estructura del Proyecto**: El código está organizado en módulos por funcionalidad (controllers, models, services, routes).
- **Autenticación y Autorización**: Se encuentran implementadas utilizando JWT para manejar sesiones de usuarios y controlar el acceso a las APIs.
- **Manejo de Errores**: Estructura para capturar y manejar errores de forma centralizada, facilitando el debug y la respuesta a clientes.

### Scripts disponibles

- `$ npm start`: Ejecuta la aplicación en modo producción.
- `$ npm run dev`: Inicia la aplicación en modo desarrollo, con reinicio automático al realizar cambios.
- `$ npm run build`: Compila el código TypeScript a JavaScript en el directorio /dist.

## Frontend: Next.js y React

El frontend de Employee Hub utiliza _Next.js_ para ofrecer una experiencia de usuario moderna y eficiente, aprovechando server-side rendering para un mejor rendimiento y SEO.

### Tecnologías principales

- **Next.js**: Framework de React para producción que ofrece renderizado del lado del servidor y generación de sitios estáticos.
- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Material UI**: Biblioteca de componentes React para un diseño rápido y coherente.

### Configuración inicial

Para configurar y ejecutar el frontend:

1. **Instalación de Docker**: Verificá que Docker y Docker Compose estén instalados en tu sistema.
2. **Variables de Entorno**: Asegurate de configurar las variables necesarias en _.env_ en el directorio `/frontend`, basándote en _.env.example_.
3. **Docker Compose**: Desde el directorio raíz, ejecuta `$ docker-compose up` para iniciar el servicio frontend. Esto compilará y servirá la aplicación.

### Desarrollo

- **Componentes y Estilos**: Usa Material UI y CSS Modules para componentes y estilos, facilitando un desarrollo consistente y modular.
- **Formularios y Validación**: Manejo de formularios con validación de entradas para garantizar la integridad de los datos.
- **Autenticación**: Implementación de flujos de autenticación y autorización en el cliente, interactuando con el backend.

### Scripts disponibles

- `$ npm run dev`: Inicia el servidor de desarrollo de Next.js, con hot reloading.
- `$ npm start`: Sirve la aplicación en modo producción.
- `$ npm run build`: Compila la aplicación para producción.
