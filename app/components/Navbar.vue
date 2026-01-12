<template>
  <header
    class="sticky top-0 z-50 w-full bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 shadow-sm"
  >
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="API Indo"
            class="h-10 w-auto transition-transform group-hover:scale-105"
          />
          <span
            class="hidden sm:block text-xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
          >
            API Indo
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10"
            :class="{
              'text-emerald-400 bg-emerald-500/20': isActive(item.to),
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Language Switcher -->
          <div class="flex bg-gray-800 rounded-full p-1 gap-1">
            <button
              v-for="lang in languages"
              :key="lang"
              @click="setLanguage(lang)"
              class="px-3 py-1.5 text-xs font-bold rounded-full transition-all"
              :class="
                currentLang === lang
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              "
            >
              {{ lang.toUpperCase() }}
            </button>
          </div>

          <!-- User Menu / Login Button -->
          <div v-if="isAuthenticated" class="flex items-center gap-3">
            <!-- User Avatar & Dropdown -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <img
                  v-if="user?.photo"
                  :src="user.photo"
                  :alt="user.name"
                  class="w-8 h-8 rounded-full border-2 border-emerald-500/50"
                />
                <div
                  v-else
                  class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold"
                >
                  {{ user?.name?.charAt(0).toUpperCase() || "U" }}
                </div>
                <Icon
                  name="i-heroicons-chevron-down"
                  class="w-4 h-4 text-gray-400"
                />
              </button>

              <!-- Dropdown Menu -->
              <Transition name="fade-scale">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-1 z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-700">
                    <p class="text-sm font-medium text-white truncate">
                      {{ user?.name }}
                    </p>
                    <p class="text-xs text-gray-400 truncate">
                      {{ user?.email }}
                    </p>
                  </div>
                  <NuxtLink
                    to="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                    @click="showUserMenu = false"
                  >
                    <Icon name="i-heroicons-user" class="w-4 h-4" />
                    <span>Profile</span>
                  </NuxtLink>
                  <div class="border-t border-gray-700 my-1"></div>
                  <button
                    @click="handleLogout"
                    class="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <Icon
                      name="i-heroicons-arrow-right-on-rectangle"
                      class="w-4 h-4"
                    />
                    <span>Logout</span>
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Login Button (when not authenticated) -->
          <button
            v-else
            @click="loginWithGoogle"
            class="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
          >
            <Icon name="i-logos-google-icon" class="w-4 h-4" />
            <span>{{ currentLang === "en" ? "Login" : "Masuk" }}</span>
          </button>
        </div>

        <!-- Mobile Actions -->
        <div class="md:hidden flex items-center gap-3">
          <!-- Mobile Language Switcher -->
          <div class="flex bg-gray-800 rounded-full p-0.5 gap-0.5">
            <button
              v-for="lang in languages"
              :key="lang"
              @click="setLanguage(lang)"
              class="px-2 py-1 text-xs font-bold rounded-full transition-all"
              :class="
                currentLang === lang
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400'
              "
            >
              {{ lang.toUpperCase() }}
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Icon
              :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="fade-scale">
        <div
          v-if="isMenuOpen"
          class="md:hidden border-t border-gray-700 py-4 space-y-2"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-emerald-500/10 transition-colors"
            :class="{
              'text-emerald-400 bg-emerald-500/20': isActive(item.to),
            }"
            @click="isMenuOpen = false"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>

          <!-- Auth Section in Mobile Menu -->
          <div class="pt-2 px-4">
            <div v-if="isAuthenticated" class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
                <img
                  v-if="user?.photo"
                  :src="user.photo"
                  :alt="user.name"
                  class="w-10 h-10 rounded-full border-2 border-emerald-500/50"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold"
                >
                  {{ user?.name?.charAt(0).toUpperCase() || "U" }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-100 truncate">
                    {{ user?.name }}
                  </p>
                  <p class="text-xs text-gray-400 truncate">
                    {{ user?.email }}
                  </p>
                </div>
              </div>

              <div class="space-y-1">
                <button
                  @click="handleLogout"
                  class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Icon
                    name="i-heroicons-arrow-right-on-rectangle"
                    class="w-5 h-5"
                  />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <!-- Login Button in Mobile Menu (when not authenticated) -->
            <button
              v-else
              @click="loginWithGoogle"
              class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-sm"
            >
              <Icon name="i-logos-google-icon" class="w-5 h-5" />
              <span>{{ currentLang === "en" ? "Login" : "Masuk" }}</span>
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLanguage } from "../composables/useLanguage";
import { useAuth } from "../composables/useAuth";

const isMenuOpen = ref(false);
const showUserMenu = ref(false);

const { language: currentLang, setLanguage } = useLanguage();
const { user, login, logout, isAuthenticated, loginWithGoogle } = useAuth();

const languages = ["en", "id"] as const;

const navItems = computed(() => [
  {
    to: "/",
    label: currentLang.value === "en" ? "Home" : "Beranda",
    icon: "i-heroicons-home",
  },
  {
    to: "/documentation",
    label: currentLang.value === "en" ? "Documentation" : "Dokumentasi",
    icon: "i-heroicons-document-text",
  },
  {
    to: "/testing",
    label: "Testing",
    icon: "i-heroicons-beaker",
  },
  {
    to: "/region-selector",
    label: currentLang.value === "en" ? "Region Selector" : "Pemilih Wilayah",
    icon: "i-heroicons-map",
  },
]);

const route = useRoute();
const isActive = (path: string) => route.path === path;

const handleLogout = async () => {
  await logout();
  showUserMenu.value = false;
  isMenuOpen.value = false;
};

// Close menus on route change
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
    showUserMenu.value = false;
  }
);
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
