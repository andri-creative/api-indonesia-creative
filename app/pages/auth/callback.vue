<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"
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
import { useAuth } from "../../composables/useAuth";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const config = useRuntimeConfig();

const statusMessage = ref("Authenticating...");
const error = ref("");

const API_BASE_URL = config.public.apiBaseUrl;

onMounted(async () => {
  try {
    const { token, error: authError } = route.query;

    if (authError) {
      error.value = `Authentication failed: ${authError}`;
      statusMessage.value = "Authentication Failed";
      return;
    }

    if (!token || typeof token !== "string") {
      error.value = "No authentication token received";
      statusMessage.value = "Authentication Failed";
      return;
    }

    if (import.meta.client) {
      localStorage.setItem("auth:token", token);
    }

    statusMessage.value = "Fetching user data...";

    try {
      const response = await $fetch<{
        success: boolean;
        user: any;
        apiKeys?: any[];
      }>(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response || !response.user) {
        error.value = "Failed to get user data";
        statusMessage.value = "Authentication Failed";
        return;
      }

      const userData = {
        ...response.user,
        apiKeys: response.apiKeys || [],
      };

      await login(userData);

      statusMessage.value = "Success! Redirecting...";

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (fetchError: any) {
      console.error("Failed to fetch user data:", fetchError);
      error.value = `Failed to fetch user data: ${
        fetchError.message || "Unknown error"
      }`;
      statusMessage.value = "Authentication Failed";

      if (import.meta.client) {
        localStorage.removeItem("auth:token");
      }
    }
  } catch (err) {
    console.error("OAuth callback error:", err);
    error.value = "An unexpected error occurred";
    statusMessage.value = "Authentication Failed";
  }
});
</script>
