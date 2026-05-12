# Proyecto_DesarrolloContinuo_Front

# Proyecto Final - Frontend
**Infraestructura para el Desarrollo Continuo**


---

## Descripción del Back

Interfaz de usuario para el sistema de renta de películas en línea. Construida con HTML, CSS y JavaScript. Se comunica con el backend via fetch y almacena el token JWT en localStorage para mantener la sesión del usuario.

---


## Páginas
 
| Archivo | Función |
|---|---|
| `index.html` | Login y registro de usuarios |
| `home.html` | Pantalla de bienvenida |
| `catalog.html` | Catálogo de películas disponibles |
| `movie.html` | Detalle de una película + botón de rentar |
| `rentadas.html` | Películas actualmente rentadas por el usuario |
| `cart.html` | Carrito |
 
---
 


## Módulos JavaScript
 
### `config.js`
Centraliza la URL del backend y expone la función `apiRequest`, que adjunta automáticamente el Bearer token en cada petición. Si el token es inválido o expirado (403), redirige al login y limpia el `localStorage`.
 
```js
const CONFIG = {
  BACKEND_URL: "https://e-stock-backend.jesustoral0204.workers.dev",
  ENV: "production"
};
```
 
### `auth.js`
Maneja el flujo completo de autenticación:
- `register()` - valida nombre, formato de email y longitud mínima de contraseña (8 caracteres). Si el registro es exitoso, hace login automático y redirige a `home.html`.
- `login()` - valida credenciales, guarda el token en `localStorage` y redirige a `home.html`.
- `logout()` - elimina el token y redirige a `index.html`.

### `movies.js`
Maneja el catálogo y detalle de película:
- `loadMovies()` - obtiene el listado de películas disponibles y las renderiza como tarjetas con imagen y título.
- `loadMovieDetail()` - carga el detalle completo de la película seleccionada (título, portada, descripción y botón de rentar).
- `rentMovie(movieId)` - envía la solicitud de renta y redirige a `rentadas.html` si es exitosa.

### `rentas.js`
Maneja las rentas activas del usuario:
- `loadRentedMovies()` - obtiene la lista de rentas del usuario autenticado y las renderiza con fecha de renta y botón de devolución.
- `returnMovie(id)` - envía la solicitud de devolución y recarga la lista.

### `api.js`
Funciones auxiliares de comunicación HTTP reutilizables.
 
### `cart.js`
Lógica del carrito de compra / resumen de renta.
 
### `catalog.js`
Lógica específica de la página del catálogo.
 
---
 


## Flujo de Navegación
 
```
index.html (login/registro)
    │
    ▼
home.html (bienvenida)
    │
    ├──> catalog.html -> movie.html -> [rentar] -> rentadas.html
    │
    └──> rentadas.html
```
 
---
 


## Stack Tecnológico
 
| Capa | Tecnología |
|---|---|
| **UI** | HTML5 + CSS3 + JavaScript vanilla |
| **Autenticación** | JWT vía `localStorage` |
| **Comunicación** | Fetch API |
| **CI/CD** | GitHub Actions + Wrangler |
| **Hosting** | Cloudflare Pages |
| **Secrets** | GitHub Environments |
 
---
 


## Pipeline CI/CD
 
El pipeline (`deploy.yml`) se activa en cada push a `main` y ejecuta dos jobs secuenciales usando `cloudflare/wrangler-action@v3`:
 
```
push a main
    │
    ├── deploy-dev  ->  Cloudflare Pages (branch: dev)
    │
    └── deploy-prod ->  Cloudflare Pages (branch: main)
```
 
```yaml
jobs:
  deploy-dev:
    environment: development
    # pages deploy . --branch=dev
 
  deploy-prod:
    needs: deploy-dev
    environment: production
    # pages deploy . --branch=main
```



## Estrategia de Ramas
 
```
main  ●────────────────────────────────────────────────────►  PROD
                                              ▲
                                              │  Requiere: aprobación manual
develop ●──────────────────────────────────────────────────►  DEV
         ▲                     ▲                    ▲
         │                     │                    │
      feature/              feature/             hotfix/
      catalog               auth                 fix-ui
```
 
| Rama | Tipo | Función |
|---|---|---|
| `main` | Estática | Código en producción |
| `develop` | Estática | Integración de features |
| `feature/x` | Dinámica | Desarrollo de nuevas funcionalidades |
| `hotfix/x` | Dinámica | Correcciones urgentes sobre `main` |
 
---
 


## Instalación Local
 
```bash
# Clonar el repositorio
git clone https://github.com/<usuario>/Proyecto_DesarrolloContinuo_Front.git
cd Proyecto_DesarrolloContinuo_Front
 
# No requiere instalación de dependencias (vanilla JS)
# Editar config.js para apuntar al backend local
# BACKEND_URL: "http://localhost:4000"
 
# Abrir index.html en el navegador o servir con:
npx serve .
```
