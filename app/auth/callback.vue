<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
  >
    <div class="text-center space-y-6">
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="/logo.png" alt="API Indo" class="h-16 w-auto animate-pulse" />
      </div>

      <!-- Loading Spinner -->
      <div
        class="w-16 h-16 mx-auto border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"
      />

      <!-- Status Message -->
      <div class="space-y-2">
        <h2 class="text-2xl font-bold text-white">
          {{ statusMessage }}
        </h2>
        <p class="text-gray-400">Please wait...</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
      >
        <p class="text-red-400 text-sm">{{ error }}</p>
        <NuxtLink
          to="/"
          class="inline-block mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all"
        >
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const statusMessage = ref("Authenticating...");
const error = ref("");

onMounted(async () => {
  try {
    // Get query parameters
    const { token, user, error: authError } = route.query;

    if (authError) {
      error.value = `Authentication failed: ${authError}`;
      statusMessage.value = "Authentication Failed";
      return;
    }

    if (!user || !token) {
      error.value = "Invalid authentication response";
      statusMessage.value = "Authentication Failed";
      return;
    }

    // Parse user data
    let userData;
    try {
      userData = typeof user === "string" ? JSON.parse(user) : user;
    } catch (e) {
      error.value = "Failed to parse user data";
      statusMessage.value = "Authentication Failed";
      return;
    }

    // Save user to auth state
    await login(userData);

    // Save token to localStorage
    if (import.meta.client && typeof token === "string") {
      localStorage.setItem("auth:token", token);
    }

    statusMessage.value = "Success! Redirecting...";

    // Redirect to home after a short delay
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (err) {
    console.error("OAuth callback error:", err);
    error.value = "An unexpected error occurred";
    statusMessage.value = "Authentication Failed";
  }
});
</script>
