<template>
  <div class="bg-slate-50 min-h-screen text-slate-800">
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-blue-600">
          SpeechDown
        </div>
        <div class="flex items-center space-x-4">
          <router-link to="/login" class="text-slate-600 hover:text-blue-600 transition">
            Iniciar Sesión
          </router-link>
          <router-link to="/register" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow">
            Registrarse Gratis
          </router-link>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-6 py-24 text-center">
      <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        Desbloqueando la <span class="text-blue-600">voz de cada niño</span>.
      </h1>
      <p class="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
        Una herramienta de apoyo, impulsada por IA, diseñada para enriquecer la terapia del habla en niños con síndrome de Down a través de actividades creativas y personalizadas.
      </p>
      <router-link to="/register" class="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg transform hover:scale-105">
        Comenzar Ahora
      </router-link>
    </main>

    <section class="bg-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-2">Simple, Intuitivo y Efectivo</h2>
        <p class="text-slate-600 mb-12">En solo tres pasos, estarás creando un mundo de aprendizaje.</p>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="flex flex-col items-center">
            <div class="bg-blue-100 text-blue-600 rounded-full p-6 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">1. Crea un Perfil</h3>
            <p class="text-slate-500">Personaliza la experiencia y los objetivos para tu hijo.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-blue-100 text-blue-600 rounded-full p-6 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">2. Genera Actividades</h3>
            <p class="text-slate-500">Usa la IA para crear cuentos y juegos terapéuticos al instante.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-blue-100 text-blue-600 rounded-full p-6 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">3. Practica y Avanza</h3>
            <p class="text-slate-500">Sigue el progreso y celebra cada uno de los logros.</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-slate-100 py-8">
      <div class="container mx-auto px-6 text-center text-slate-500">
        &copy; 2025 SpeechDown. Todos los derechos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>