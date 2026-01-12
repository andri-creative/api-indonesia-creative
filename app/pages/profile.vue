<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">
          {{ text.title }}
        </h1>
        <p class="text-gray-400">{{ text.subtitle }}</p>
      </div>

      <!-- Profile Card -->
      <div
        class="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/50 shadow-xl mb-6"
      >
        <!-- Profile Header with Avatar -->
        <div
          class="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700"
        >
          <!-- Avatar -->
          <div class="relative group">
            <div
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-1 shadow-lg shadow-emerald-500/30"
            >
              <img
                :src="userPhoto"
                :alt="userName"
                class="w-full h-full rounded-full object-cover bg-gray-700"
                @error="handleImageError"
              />
            </div>
            <div
              class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg"
            >
              <Icon name="i-heroicons-check-badge" class="w-5 h-5 text-white" />
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">
              {{ userName }}
            </h2>
            <div
              class="flex items-center justify-center sm:justify-start gap-2 text-gray-400 mb-3"
            >
              <Icon name="i-heroicons-envelope" class="w-5 h-5" />
              <p class="text-base sm:text-lg">{{ userEmail }}</p>
            </div>
            <div
              class="flex items-center justify-center sm:justify-start gap-2"
            >
              <span
                class="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30"
              >
                {{ text.activeStatus }}
              </span>
            </div>
          </div>
        </div>

        <!-- Token Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="i-heroicons-key" class="w-5 h-5 text-emerald-400" />
            <h3 class="text-lg font-bold text-white">{{ text.apiToken }}</h3>
          </div>

          <div class="relative">
            <div
              class="bg-gray-900/70 border-2 border-gray-700 rounded-xl p-4 pr-24 overflow-x-auto"
            >
              <code class="text-sm text-emerald-400 font-mono break-all">
                {{ apiToken }}
              </code>
            </div>

            <!-- Copy Button -->
            <button
              @click="copyToken"
              class="absolute top-1/2 right-3 -translate-y-1/2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              :class="{ 'bg-green-600 hover:bg-green-600': copied }"
            >
              <Icon
                :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
                class="w-4 h-4"
              />
              <span class="hidden sm:inline">{{
                copied ? text.copied : text.copy
              }}</span>
            </button>
          </div>

          <p class="text-xs text-gray-500 flex items-start gap-2">
            <Icon
              name="i-heroicons-information-circle"
              class="w-4 h-4 mt-0.5 shrink-0"
            />
            <span>{{ text.tokenWarning }}</span>
          </p>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Account Created -->
        <div
          class="bg-gray-800/60 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-emerald-500/50 transition-all"
        >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
            >
              <Icon name="i-heroicons-calendar" class="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p class="text-xs text-gray-500">{{ text.memberSince }}</p>
              <p class="text-base font-bold text-white">{{ memberSince }}</p>
            </div>
          </div>
        </div>

        <!-- API Requests -->
        <div
          class="bg-gray-800/60 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-emerald-500/50 transition-all"
        >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="i-heroicons-chart-bar"
                class="w-5 h-5 text-emerald-400"
              />
            </div>
            <div>
              <p class="text-xs text-gray-500">{{ text.apiRequests }}</p>
              <p class="text-base font-bold text-white">{{ totalRequests }}</p>
            </div>
          </div>
        </div>

        <!-- Account Type -->
        <div
          class="bg-gray-800/60 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-emerald-500/50 transition-all"
        >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center"
            >
              <Icon name="i-heroicons-star" class="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p class="text-xs text-gray-500">{{ text.accountType }}</p>
              <p class="text-base font-bold text-white">{{ accountType }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          class="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-2"
        >
          <Icon name="i-heroicons-cog-6-tooth" class="w-5 h-5" />
          {{ text.settings }}
        </button>
        <button
          @click="handleLogout"
          class="flex-1 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 font-semibold rounded-lg transition-all border border-red-500/30 hover:border-red-500/50 flex items-center justify-center gap-2"
        >
          <Icon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" />
          {{ text.logout }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "../composables/useLanguage";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useRuntimeConfig } from "#app";

const { language } = useLanguage();
const { user, logout, isAuthenticated } = useAuth();
const router = useRouter();
const copied = ref(false);

// Redirect to home if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push("/");
  }
});

// Watch for auth changes
watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push("/");
  }
});

// Bilingual text
const text = computed(() => ({
  title: language.value === "en" ? "My Profile" : "Profil Saya",
  subtitle:
    language.value === "en"
      ? "Manage your account and API credentials"
      : "Kelola akun dan kredensial API Anda",
  activeStatus: language.value === "en" ? "Active" : "Aktif",
  apiToken: language.value === "en" ? "API Token" : "Token API",
  copy: language.value === "en" ? "Copy" : "Salin",
  copied: language.value === "en" ? "Copied!" : "Tersalin!",
  tokenWarning:
    language.value === "en"
      ? "Keep your token secure. Never share it with anyone or commit it to version control."
      : "Jaga keamanan token Anda. Jangan pernah membagikannya kepada siapa pun atau menyimpannya di version control.",
  memberSince: language.value === "en" ? "Member Since" : "Bergabung Sejak",
  apiRequests: language.value === "en" ? "API Requests" : "Request API",
  accountType: language.value === "en" ? "Account Type" : "Tipe Akun",
  settings: language.value === "en" ? "Settings" : "Pengaturan",
  logout: language.value === "en" ? "Logout" : "Keluar",
}));

// User Data from auth
const config = useRuntimeConfig();
const userName = computed(() => user.value?.name || "Guest User");
const userEmail = computed(() => user.value?.email || "guest@example.com");
const userPhoto = computed(
  () =>
    user.value?.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName.value
    )}&background=10b981&color=fff&size=256`
);
const apiToken = computed(() => {
  // Debug: Log user data
  // if (import.meta.client) {
  //   console.log("🔍 User data:", user.value);
  //   console.log("🔑 API Keys:", user.value?.apiKeys);
  // }

  // Use API key from user data if available
  if (user.value?.apiKeys && user.value.apiKeys.length > 0) {
    // console.log("✅ Using API Key from user data:", user.value.apiKeys[0].key);
    return user.value.apiKeys[0].key;
  }

  // Fallback
  console.log("⚠️ No API keys found, using fallback");
  return "No API key available - Please contact support";
});
const memberSince = computed(() => {
  const date = new Date();
  return date.toLocaleDateString(language.value === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "long",
  });
});
const totalRequests = ref("0");
const accountType = ref("Free");

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName.value
  )}&background=10b981&color=fff&size=256`;
};

// Copy token to clipboard
const copyToken = async () => {
  try {
    await navigator.clipboard.writeText(apiToken.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

// Logout handler
const handleLogout = async () => {
  await logout();
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
