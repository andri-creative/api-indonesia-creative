import { useAuth } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const auth = useAuth();
  const router = useRouter();

  // Check auth status on app load (client-side only)
  if (import.meta.client) {
    // Only check auth if we have stored user data or token
    const hasStoredAuth =
      localStorage.getItem("auth:user") || localStorage.getItem("auth:token");

    if (hasStoredAuth) {
      // Only call backend if we think user might be logged in
      await auth.checkAuthStatus();
    } else {
      // No stored auth, skip backend check
      auth.user.value = null;
    }
  }

  router.beforeEach((to) => {
    const isProtectedRoute = to.meta.requiresAuth;

    if (isProtectedRoute && !auth.isAuthenticated.value) {
      return "/login";
    }
  });

  return {
    provide: {
      auth,
    },
  };
});
