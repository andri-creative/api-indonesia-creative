interface ApiKey {
  _id: string;
  key: string;
  createdAt: string;
}

interface User {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  photo?: string;
  role?: string;
  apiKeys?: ApiKey[];
}

export const useAuth = () => {
  const config = useRuntimeConfig();
  const user = useState<User | null>("auth:user", () => null);
  const isAuthenticated = computed(() => user.value !== null);
  const isLoading = useState<boolean>("auth:loading", () => false);

  // Base API URL from environment variable
  const API_BASE_URL = config.public.apiBaseUrl;

  const loginWithGoogle = () => {
    const callbackUrl = `${window.location.origin}/auth/callback`;
    window.location.href = `${API_BASE_URL}/auth/google?callbackUrl=${encodeURIComponent(
      callbackUrl
    )}`;
  };

  const login = async (userData: User) => {
    user.value = userData;
    if (import.meta.client) {
      localStorage.setItem("auth:user", JSON.stringify(userData));
    }
  };

  const logout = async () => {
    try {
      // Get token from localStorage
      let token = null;
      if (import.meta.client) {
        token = localStorage.getItem("auth:token");
      }

      // Build headers with Authorization if token exists
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      await $fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers,
      });
    } catch (error) {
      // Logout error is not critical - we still clear local state
      console.warn("Logout API call failed (non-critical):", error);
    } finally {
      // Always clear user state regardless of API success
      user.value = null;
      if (import.meta.client) {
        localStorage.removeItem("auth:user");
        localStorage.removeItem("auth:token");
      }

      // Redirect to home
      if (import.meta.client) {
        window.location.href = "/";
      }
    }
  };

  const checkAuthStatus = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
      // Check localStorage first (for offline/quick load)
      if (import.meta.client) {
        const storedUser = localStorage.getItem("auth:user");
        if (storedUser) {
          try {
            user.value = JSON.parse(storedUser);
          } catch (e) {
            localStorage.removeItem("auth:user");
          }
        }
      }

      // Verify with backend
      try {
        // Get token from localStorage
        let token = null;
        if (import.meta.client) {
          token = localStorage.getItem("auth:token");
        }

        const headers: Record<string, string> = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const data = await $fetch<{
          success?: boolean;
          user: User | null;
          apiKeys?: any[];
        }>(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
          headers,
          // Suppress errors completely for 401
          ignoreResponseError: true,
        });

        if (data && data.user) {
          // ✅ Merge apiKeys ke dalam user object
          const userData = {
            ...data.user,
            apiKeys: data.apiKeys || [],
          };

          user.value = userData;
          if (import.meta.client) {
            localStorage.setItem("auth:user", JSON.stringify(userData));
          }
        } else {
          user.value = null;
          if (import.meta.client) {
            localStorage.removeItem("auth:user");
          }
        }
      } catch (fetchError: any) {
        // Silently handle 401 - it's expected for logged out users
        if (fetchError?.status === 401 || fetchError?.statusCode === 401) {
          user.value = null;
          if (import.meta.client) {
            localStorage.removeItem("auth:user");
          }
          return; // Don't log 401 errors
        }

        // Only log other errors in development
        if (import.meta.dev) {
          const errorMessage = fetchError?.message || String(fetchError);

          if (
            errorMessage.includes("CORS") ||
            errorMessage.includes("Failed to fetch")
          ) {
            console.warn(
              "⚠️ Cannot connect to backend. Make sure:",
              "\n1. Backend is running at:",
              API_BASE_URL,
              "\n2. CORS is configured correctly (origin must be 'http://localhost:3000', not '*')",
              "\n3. Backend allows credentials: true"
            );
          } else {
            console.error("Auth status check error:", fetchError);
          }
        }

        // Clear user state on non-CORS errors
        const errorMessage = fetchError?.message || String(fetchError);
        if (
          !errorMessage.includes("CORS") &&
          !errorMessage.includes("Failed to fetch")
        ) {
          user.value = null;
          if (import.meta.client) {
            localStorage.removeItem("auth:user");
          }
        }
      }
    } finally {
      isLoading.value = false;
    }
  };

  const checkAuth = async () => {
    // Backward compatibility
    return user.value;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithGoogle,
    login,
    logout,
    checkAuth,
    checkAuthStatus,
  };
};
