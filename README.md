# 🗣️ SpeechDown – Aplicación Web con IA para Apoyo Terapéutico del Habla

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-IA-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

> Plataforma full-stack que usa **IA generativa (Google Gemini)** para crear actividades terapéuticas, cuentos y juegos personalizados para niños con Síndrome de Down, con seguimiento de progreso y retroalimentación auditiva.

---

## 🌟 Características Principales

| Funcionalidad | Descripción |
|---|---|
| 👤 **Gestión de Perfiles** | Autenticación JWT para padres/terapeutas y perfiles individuales por niño |
| 🤖 **Generador IA** | Actividades y cuentos terapéuticos en tiempo real con Google Gemini |
| 🔊 **Text-to-Speech** | Retroalimentación auditiva con Google Cloud TTS |
| 📊 **Seguimiento de Progreso** | Registro de desempeño y visualización con Chart.js |
| 📚 **Biblioteca de Recursos** | Guardado de actividades favoritas por perfil |
| 📱 **Interfaz Adaptativa** | Diseño responsive con Tailwind CSS |

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────┐
│   Frontend – Vue.js 3       │
│   Pinia · Vue Router        │
│   Tailwind CSS · Chart.js   │
└──────────────┬──────────────┘
               │ HTTP / JWT
┌──────────────▼──────────────┐
│   Backend – Node.js         │
│   Express.js · JWT Auth     │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────────────┐
│  MongoDB    │  │  Google APIs        │
│  Mongoose   │  │  Gemini + Cloud TTS │
└─────────────┘  └─────────────────────┘
```

---

## 🛠️ Stack Tecnológico

| Área | Tecnología |
|---|---|
| **Frontend** | Vue.js 3 (Vite), Pinia, Vue Router, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js |
| **Base de Datos** | MongoDB + Mongoose |
| **Autenticación** | JSON Web Tokens (JWT) |
| **IA** | Google Gemini (generación de texto) |
| **Audio** | Google Cloud Text-to-Speech |

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta en MongoDB Atlas
- API Key de Google (Gemini + Cloud TTS)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/roberto1831/speechdown.git
cd sistema_speech
```

### 2. Configuración del Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
MONGO_URI=mongodb+srv://:@cluster0.xxxxx.mongodb.net/speechdown
JWT_SECRET=tu_clave_secreta_segura
GOOGLE_API_KEY=tu_google_api_key
PORT=3000
```

> ⚠️ Nunca subas el archivo `.env` al repositorio. Asegúrate de que está en `.gitignore`.

### 3. Configuración del Frontend

```bash
cd frontend
npm install
```

El frontend se conecta por defecto a `http://localhost:3000`.

### 4. Ejecutar la Aplicación

Abre **dos terminales**:

```bash
# Terminal 1 – Backend
cd backend
npm run dev
# Servidor en http://localhost:3000

# Terminal 2 – Frontend
cd frontend
npm run dev
# App en http://localhost:5173
```

---

## 📄 Documentación de la API

Consulta la [Documentación completa de la API](./docs/api.md) para ver todos los endpoints disponibles.

---

## 👤 Autor

**Ing. Roberto Toapanta**  
📍 Quito, Ecuador  
🔗 [GitHub](https://github.com/roberto1831) · [LinkedIn](https://linkedin.com/in/roberto1831)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
