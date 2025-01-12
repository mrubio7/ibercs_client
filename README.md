# IBERCS Frontend

El **Frontend de IBERCS** es la interfaz gráfica de usuario de la plataforma IBERCS, diseñada para proporcionar información relevante sobre equipos, jugadores y competiciones del mundo de Counter-Strike en España. Este proyecto utiliza tecnologías modernas como **Vue 3**, **TypeScript**, y **Vite** para ofrecer un rendimiento óptimo y una experiencia de usuario fluida.

---

## 🚀 Características

- 🌟 **Estadísticas de Jugadores**: Información detallada sobre el rendimiento de los jugadores.
- 🌍 **Clasificaciones de Equipos**: Ranking dinámico basado en el rendimiento.
- 🏆 **Competiciones**: Información actualizada de competiciones en curso, futuras y pasadas.
- 🔍 **Buscador de Jugadores**: Encuentra jugadores disponibles para formar equipo.
- 🎨 **Dark Mode**: Compatible con modo oscuro.
- ⚡ **Desempeño Rápido**: Optimizado para navegadores modernos usando **Vite**.

---

## 📂 Estructura del Proyecto

```plaintext
src/
├── assets/           # Archivos estáticos como imágenes o fuentes.
├── components/       # Componentes reutilizables de Vue.
├── entities/         # Tipos y modelos de datos.
├── router.ts         # Configuración de rutas (Vue Router).
├── services/         # Servicios para llamadas a APIs.
└── pages/            # Vistas de las páginas principales.
```
---

## 🛠️ Tecnologías

- **Framework**: Vue 3
- **Librerías**:
  - TypeScript
  - Vite
  - TailwindCSS
- **Ruteo**: Vue Router
- **Autenticación**: OAuth2 con FACEIT

---
## 🔑 Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Yarn](https://yarnpkg.com/) o [npm](https://www.npmjs.com/)

---

## 🚗 Ejecución Local

1. **Clona el repositorio**:

```bash
 git clone <URL-del-repositorio>
 cd ibercs-frontend
```

2. **Instala las dependencias**

```bash
 npm install
```

2. **Inicia el servidor de desarrollo**
```bash
 npm run dev
```

## 🌐 Rutas Principales

| Ruta                      | Descripción                                      |
|---------------------------|--------------------------------------------------|
| `/`                       | Página de inicio.                               |
| `/ladder/players`         | Clasificación de jugadores.                     |
| `/ladder/teams`           | Clasificación de equipos.                       |
| `/team/:team_name`        | Perfil de un equipo específico.                 |
| `/player/:player_name`    | Perfil de un jugador específico.                |
| `/my-profile`             | Perfil del usuario autenticado.                 |
| `/tournaments`            | Listado de torneos activos.                     |
| `/match/:match_id`        | Detalles de un partido específico.              |
| `/looking-for-team`       | Lista de jugadores buscando equipo.             |
| `/esea`                   | Clasificaciones ESEA.                           |
