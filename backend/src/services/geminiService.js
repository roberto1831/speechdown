const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa el cliente con tu clave de API desde el archivo .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Genera una actividad de habla usando la API de Google Gemini.
 * @param {string} promptText - El prompt del usuario para la IA.
 * @returns {Promise<string>} - El contenido de la actividad generada.
 */
async function generateActivityWithGemini(promptText) {
  try {
    // Especifica el modelo que quieres usar
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Mensaje de sistema para darle un rol y contexto al asistente
    const systemInstruction = "Eres un asistente especializado en crear actividades terapéuticas para niños con síndrome de Down. Tus respuestas deben ser simples, positivas, creativas y adecuadas para un niño de 6 años.";

    // Construye el prompt completo
    const fullPrompt = `${systemInstruction}\n\nGenera la siguiente actividad: ${promptText}`;

    // Envía el prompt al modelo
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();
    
    return text.trim();

  } catch (error) {
    console.error("Error al comunicarse con la API de Google Gemini:", error);
    throw new Error("No se pudo generar la actividad con Gemini.");
  }
}

module.exports = { generateActivityWithGemini };