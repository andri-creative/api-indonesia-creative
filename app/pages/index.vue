<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="/hero-bg.jpg"
        alt="Indonesia Background"
        class="w-full h-full object-cover"
      />
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-br from-emerald-900/90 via-teal-900/85 to-cyan-900/90"
      ></div>

      <!-- Animated Gradient Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-tr from-emerald-500/20 via-transparent to-teal-500/20 animate-gradient"
      ></div>
    </div>

    <!-- Animated Particles/Dots -->
    <div class="absolute inset-0 z-10 overflow-hidden">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
    </div>

    <!-- Hero Content -->
    <div
      class="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 mt-5"
    >
      <div class="max-w-5xl mx-auto text-center">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in-down"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          <span class="text-sm font-semibold text-white">
            {{
              currentLang === "en"
                ? "Backend API Ready"
                : "Backend API Siap Digunakan"
            }}
          </span>
        </div>

        <!-- Main Title -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up"
        >
          <span class="block mb-2">API Indonesia</span>
          <span
            class="block bg-linear-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-gradient-text"
          >
            {{
              currentLang === "en"
                ? "Complete Indonesian Data"
                : "Data Terlengkap Nusantara"
            }}
          </span>
        </h1>

        <!-- Description -->
        <p
          class="text-xl sm:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
        >
          {{
            currentLang === "en"
              ? "Access comprehensive, structured, and easy-to-use Indonesian data"
              : "Akses data Indonesia yang lengkap, terstruktur, dan mudah digunakan"
          }}
        </p>
        <p
          class="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-300"
        >
          {{
            currentLang === "en"
              ? "Backend API development is complete with full documentation available in"
              : "Backend API sudah selesai dikembangkan dengan dokumentasi lengkap tersedia di file"
          }}
          <code
            class="px-2 py-1 bg-white/10 rounded text-emerald-300 font-mono text-sm"
            >http.http</code
          >
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400"
        >
          <NuxtLink
            to="/documentation"
            class="group relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <Icon name="i-heroicons-book-open" class="w-5 h-5" />
              {{
                currentLang === "en"
                  ? "View Documentation"
                  : "Lihat Dokumentasi"
              }}
            </span>
            <div
              class="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/testing"
            class="group px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <span class="flex items-center justify-center gap-2">
              <Icon name="i-heroicons-beaker" class="w-5 h-5" />
              {{ currentLang === "en" ? "Try API" : "Coba API" }}
            </span>
          </NuxtLink>
        </div>

        <!-- Features Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-500"
        >
          <div class="feature-card group">
            <div class="feature-icon">
              <Icon name="i-heroicons-rocket-launch" class="w-8 h-8" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">
              {{ currentLang === "en" ? "Fast & Reliable" : "Cepat & Andal" }}
            </h3>
            <p class="text-gray-300 text-sm">
              {{
                currentLang === "en"
                  ? "Fast response time with high uptime"
                  : "Response time cepat dengan uptime tinggi"
              }}
            </p>
          </div>

          <div class="feature-card group">
            <div class="feature-icon">
              <Icon name="i-heroicons-shield-check" class="w-8 h-8" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">
              {{ currentLang === "en" ? "Secure API" : "API Aman" }}
            </h3>
            <p class="text-gray-300 text-sm">
              {{
                currentLang === "en"
                  ? "Data security guaranteed with encryption"
                  : "Keamanan data terjamin dengan enkripsi"
              }}
            </p>
          </div>

          <div class="feature-card group">
            <div class="feature-icon">
              <Icon name="i-heroicons-document-text" class="w-8 h-8" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">
              {{
                currentLang === "en" ? "Well Documented" : "Dokumentasi Lengkap"
              }}
            </h3>
            <p class="text-gray-300 text-sm">
              {{
                currentLang === "en"
                  ? "Complete and easy-to-understand documentation"
                  : "Dokumentasi lengkap dan mudah dipahami"
              }}
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 animate-fade-in-up animation-delay-500 mb-6"
        >
          <div class="stats-card group">
            <h4
              class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 mb-1"
            >
              34
            </h4>
            <p
              class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              {{ currentLang === "en" ? "Provinces" : "Provinsi" }}
            </p>
          </div>

          <div class="stats-card group">
            <h4
              class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 mb-1"
            >
              514
            </h4>
            <p
              class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              {{ currentLang === "en" ? "Regencies/Cities" : "Kabupaten/Kota" }}
            </p>
          </div>

          <div class="stats-card group">
            <h4
              class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 mb-1"
            >
              99.9%
            </h4>
            <p
              class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              Uptime
            </p>
          </div>

          <div class="stats-card group">
            <h4
              class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 mb-1"
            >
              1M+
            </h4>
            <p
              class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              {{ currentLang === "en" ? "Requests" : "Request" }}
            </p>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <!-- <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <Icon name="i-heroicons-chevron-down" class="w-8 h-8 text-white/60" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "../composables/useLanguage";
const { language: currentLang } = useLanguage();
</script>

<style scoped>
/* Gradient Animation */
@keyframes gradient {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.animate-gradient {
  animation: gradient 8s ease-in-out infinite;
}

/* Gradient Text Animation */
@keyframes gradient-text {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 5s ease infinite;
}

/* Fade In Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.animation-delay-500 {
  animation-delay: 0.5s;
  opacity: 0;
}

/* Particles */
.particle {
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.8) 0%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
}

.particle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation: float 20s ease-in-out infinite;
}

.particle-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 15%;
  animation: float 15s ease-in-out infinite reverse;
}

.particle-3 {
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 20%;
  animation: float 18s ease-in-out infinite;
  animation-delay: 2s;
}

.particle-4 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 25%;
  animation: float 12s ease-in-out infinite;
  animation-delay: 4s;
}

.particle-5 {
  width: 180px;
  height: 180px;
  bottom: 40%;
  right: 10%;
  animation: float 16s ease-in-out infinite reverse;
  animation-delay: 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translate(20px, 30px) scale(1.05);
    opacity: 0.6;
  }
}

/* Stats Cards */
.stats-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.stats-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-3px);
}

/* Feature Cards */
.feature-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(16, 185, 129, 0.5);
  transform: translateY(-5px);
}

.feature-icon {
  display: inline-flex;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.2),
    rgba(20, 184, 166, 0.2)
  );
  border-radius: 1rem;
  margin-bottom: 1rem;
  color: #10b981;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.3),
    rgba(20, 184, 166, 0.3)
  );
  transform: scale(1.1) rotate(5deg);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .particle {
    width: 150px !important;
    height: 150px !important;
  }
}
</style>
