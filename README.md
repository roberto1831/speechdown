# SpeechDown: Aplicación Web con IA para Apoyo Terapéutico del Habla

![SpeechDown](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)
![Node.js](https://img.shields.io/badge/Node.js-18.x-5FA04E?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4A9446?style=flat&logo=mongodb)

SpeechDown es una aplicación web full-stack diseñada para apoyar la terapia del habla en niños con Síndrome de Down. Utiliza Inteligencia Artificial generativa para crear actividades, cuentos y juegos personalizados, proporcionando a padres y terapeutas herramientas interactivas y un sistema para monitorear el progreso.

## 🌟 Características Principales

- **Gestión de Perfiles:** Sistema de autenticación para padres/terapeutas y gestión de perfiles individuales para cada niño.
- **Generador de Actividades con IA:** Creación de cuentos y actividades terapéuticas en tiempo real utilizando la API de Google Gemini, basadas en prompts específicos.
- **Texto a Voz (Text-to-Speech):** Retroalimentación auditiva de alta calidad para que los niños puedan escuchar el contenido generado.
- **Seguimiento de Progreso:** Registro del desempeño del niño en cada actividad y visualización de la evolución a través de gráficos.
- **Biblioteca de Recursos:** Funcionalidad para guardar las actividades favoritas y crear un banco de recursos personalizado.
- **Interfaz Adaptativa:** Diseño responsive y amigable, construido con Vue.js y Tailwind CSS.

## 🛠️ Stack Tecnológico

| Área          | Tecnología                                                                   |
|---------------|------------------------------------------------------------------------------|
| **Frontend** | Vue.js 3 (Vite), Pinia, Vue Router, Tailwind CSS, Chart.js                     |
| **Backend** | Node.js, Express.js                                                          |
| **Base de Datos** | MongoDB (con Mongoose)                                                       |
| **Autenticación** | JSON Web Tokens (JWT)                                                        |
| **IA & Servicios**| Google Gemini (Generación de texto), Google Cloud Text-to-Speech             |

## 🚀 Puesta en Marcha Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/roberto1831/speechdown.git
cd sistema_speech
```

### 2. Configuración del Backend

Navega a la carpeta del backend e instala las dependencias.

```bash
cd backend
npm install
```

Crea un archivo `.env` en la raíz de la carpeta `/backend` a partir del ejemplo.

```bash
cp .env.example .env
```

Ahora, edita el archivo `.env` y añade tus claves secretas:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=mongodb+srv://mi_usuario:hMukL4RIrZ5sZOFr@cluster0.cs1gamf.mongodb.net/?
GOOGLE_API_KEY=AIzaSyAbdcPihSpir2NjIOgt0vCgphETWFpT2vk
PORT=3000
```

### 3. Configuración del Frontend

Abre una nueva terminal, navega a la carpeta del frontend e instala las dependencias.

```bash
cd frontend
npm install
```

El frontend se conectará a la URL del backend definida en `.env.local`. Por defecto, ya está configurado para `http://localhost:3000`.

### 4. Ejecutar la Aplicación

Necesitarás dos terminales abiertas simultáneamente.

- **En la terminal del Backend:**

```bash
# Inicia el servidor de Node.js (con recarga automática)
npm run dev
```
El servidor backend estará corriendo en `http://localhost:3000`.

- **En la terminal del Frontend:**

```bash
# Inicia el servidor de desarrollo de Vite
npm run dev
```
La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que Vite indique).

---


## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
