<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="close" />

      <!-- Modal -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div
          class="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          @click.stop
        >
          <!-- Header -->
          <div class="p-6 border-b border-gray-800">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="/logo.png" alt="API Indo" class="h-8 w-auto" />
                <h3 class="text-xl font-bold text-white">Sign In</h3>
              </div>
              <button
                @click="close"
                class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Icon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-400">
              Access premium features and manage your account
            </p>
          </div>

          <!-- Body -->
          <div class="p-6">
            <!-- Google Login Button -->
            <button
              @click="loginWithGoogle"
              class="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mb-4"
            >
              <Icon name="i-logos-google-icon" class="w-6 h-6" />
              <span>Continue with Google</span>
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-gray-900 text-gray-400">Or</span>
              </div>
            </div>

            <!-- Email Login Form (Optional) -->
            <form
              v-if="showEmailForm"
              @submit.prevent="handleEmailLogin"
              class="space-y-4"
            >
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  v-model="password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isLoading">Sign In</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <Icon
                    name="i-heroicons-arrow-path"
                    class="w-4 h-4 animate-spin"
                  />
                  Signing in...
                </span>
              </button>
            </form>

            <!-- Toggle Email Form -->
            <button
              v-else
              @click="showEmailForm = true"
              class="w-full px-6 py-3 border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-medium rounded-xl transition-all"
            >
              Sign in with Email
            </button>

            <!-- Terms -->
            <p class="mt-6 text-xs text-gray-500 text-center">
              By continuing, you agree to our
              <NuxtLink
                to="/terms"
                class="text-emerald-400 hover:text-emerald-300"
                @click="close"
              >
                Terms
              </NuxtLink>
              and
              <NuxtLink
                to="/privacy"
                class="text-emerald-400 hover:text-emerald-300"
                @click="close"
              >
                Privacy Policy
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useAuth } from "../composables/useAuth";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { loginWithGoogle } = useAuth();
const email = ref("");
const password = ref("");
const showEmailForm = ref(false);
const isLoading = ref(false);

const close = () => {
  emit("close");
  // Reset form
  showEmailForm.value = false;
  email.value = "";
  password.value = "";
  isLoading.value = false;
};

const handleEmailLogin = async () => {
  // Implement email login logic here
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  isLoading.value = false;
  close();
};

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) {
      close();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
  opacity: 0;
}
</style>
