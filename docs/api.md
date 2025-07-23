# Documentación de la API de SpeechDown

Esta documentación detalla todos los endpoints disponibles en el backend de SpeechDown.

**URL Base:** `http://localhost:3000/api`

## Autenticación

Todas las rutas marcadas como **Privadas** requieren un Token JWT en la cabecera de la solicitud:
`Authorization: Bearer <tu_token_jwt>`

---

### Auth: Autenticación de Usuarios

#### 1. Registrar un nuevo usuario
- **Endpoint:** `POST /auth/register`
- **Descripción:** Crea una nueva cuenta de usuario (padre/terapeuta).
- **Acceso:** Público
- **Cuerpo (Body):**
  ```json
  {
    "name": "Nombre Apellido",
    "email": "correo@ejemplo.com",
    "password": "una_contraseña_segura"
  }
  ```
- **Respuesta Exitosa (201):**
  ```json
  {
    "msg": "Usuario registrado con éxito"
  }
  ```

#### 2. Iniciar sesión
- **Endpoint:** `POST /auth/login`
- **Descripción:** Autentica a un usuario y devuelve un token JWT.
- **Acceso:** Público
- **Cuerpo (Body):**
  ```json
  {
    "email": "correo@ejemplo.com",
    "password": "una_contraseña_segura"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "token": "ey...",
    "user": {
      "id": "60d...",
      "name": "Nombre Apellido",
      "email": "correo@ejemplo.com"
    }
  }
  ```

---

### Children: Perfiles de Niños

#### 1. Crear un nuevo perfil de niño
- **Endpoint:** `POST /children`
- **Descripción:** Añade un nuevo perfil de niño asociado al usuario autenticado.
- **Acceso:** Privado
- **Cuerpo (Body):**
  ```json
  {
    "name": "Nombre del Niño",
    "dateOfBirth": "2018-10-25"
  }
  ```

#### 2. Obtener todos los perfiles del usuario
- **Endpoint:** `GET /children`
- **Descripción:** Devuelve una lista de todos los perfiles de niños creados por el usuario.
- **Acceso:** Privado

#### 3. Eliminar un perfil de niño
- **Endpoint:** `DELETE /children/:id`
- **Descripción:** Elimina un perfil de niño específico.
- **Acceso:** Privado

---

### Activities: Generación y Gestión de Actividades

#### 1. Generar una nueva actividad con IA
- **Endpoint:** `POST /activities/generate`
- **Descripción:** Usa IA para generar contenido para una actividad y la guarda en la base de datos.
- **Acceso:** Privado
- **Cuerpo (Body):**
  ```json
  {
    "childId": "60d...",
    "promptText": "Un cuento sobre un león que aprende a decir la letra 's'."
  }
  ```

#### 2. Obtener historial de actividades de un niño
- **Endpoint:** `GET /activities/child/:childId`
- **Descripción:** Devuelve una lista de todas las actividades asociadas a un niño.
- **Acceso:** Privado

#### 3. Marcar una actividad como favorita
- **Endpoint:** `PATCH /activities/:id/favorite`
- **Descripción:** Alterna el estado booleano `isFavorite` de una actividad.
- **Acceso:** Privado

---

### Progress: Seguimiento de Progreso

#### 1. Crear un registro de progreso
- **Endpoint:** `POST /progress`
- **Descripción:** Guarda un registro de una actividad completada.
- **Acceso:** Privado
- **Cuerpo (Body):**
  ```json
  {
    "childId": "60d...",
    "activityId": "60e...",
    "performanceRating": 5,
    "notes": "Le encantó la historia y repitió bien los sonidos."
  }
  ```

#### 2. Obtener historial de progreso de un niño
- **Endpoint:** `GET /progress/child/:childId`
- **Descripción:** Devuelve todos los registros de progreso para un niño, incluyendo datos de la actividad asociada.
- **Acceso:** Privado

---

### TTS: Texto a Voz

#### 1. Convertir texto a audio
- **Endpoint:** `POST /tts/speak`
- **Descripción:** Convierte una cadena de texto en un archivo de audio MP3.
- **Acceso:** Privado
- **Cuerpo (Body):**
  ```json
  {
    "text": "Hola, vamos a jugar."
  }
  ```
- **Respuesta Exitosa (200):**
  - **Content-Type:** `audio/mpeg`
  - **Body:** `(datos binarios del archivo de audio)`