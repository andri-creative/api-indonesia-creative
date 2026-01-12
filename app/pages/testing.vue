<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 flex flex-col lg:flex-row">
    <!-- Sidebar -->
    <aside
      class="w-full lg:w-72 bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-800 flex-shrink-0"
    >
      <div class="p-6 sticky top-20">
        <h2 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Icon name="i-heroicons-beaker" class="w-5 h-5 text-emerald-400" />
          API Tester
        </h2>

        <nav class="space-y-2">
          <button
            v-for="endpoint in endpoints"
            :key="endpoint.id"
            @click="selectEndpoint(endpoint)"
            class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent"
            :class="
              selectedEndpoint?.id === endpoint.id
                ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-sm'
                : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
            "
          >
            <div class="flex items-center justify-between mb-1">
              <span
                class="font-bold uppercase text-xs tracking-wider"
                :class="getMethodColor(endpoint.method)"
              >
                {{ endpoint.method }}
              </span>
              <Icon
                v-if="selectedEndpoint?.id === endpoint.id"
                name="i-heroicons-chevron-right"
                class="w-4 h-4"
              />
            </div>
            <div class="truncate">{{ endpoint.title }}</div>
          </button>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-w-0 p-4 lg:p-8">
      <div class="max-w-4xl mx-auto space-y-6" v-if="selectedEndpoint">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800"
        >
          <div>
            <h1 class="text-2xl font-bold text-white mb-2">
              {{ selectedEndpoint.title }}
            </h1>
            <div
              class="flex items-center gap-3 text-sm text-gray-400 font-mono bg-gray-950 px-3 py-1.5 rounded-md border border-gray-800 w-fit"
            >
              <span
                class="font-bold"
                :class="getMethodColor(selectedEndpoint.method)"
                >{{ selectedEndpoint.method }}</span
              >
              <span>{{ selectedEndpoint.path }}</span>
            </div>
          </div>

          <!-- Token Input -->
          <div class="flex-1 max-w-md">
            <label
              class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
            >
              Bearer Token
            </label>
            <div class="relative">
              <input
                v-model="token"
                type="password"
                placeholder="Paste your token here..."
                class="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 pr-10 placeholder-gray-600"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <Icon name="i-heroicons-key" class="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Request Params -->
        <div
          v-if="selectedEndpoint.params?.length"
          class="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h3
            class="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2"
          >
            <Icon name="i-heroicons-adjustments-horizontal" class="w-4 h-4" />
            Parameters
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="param in selectedEndpoint.params" :key="param.name">
              <label
                :for="param.name"
                class="block mb-2 text-sm font-medium text-gray-300"
              >
                {{ param.name }}
                <span v-if="param.required" class="text-red-400">*</span>
              </label>
              <input
                v-model="requestParams[param.name]"
                :id="param.name"
                type="text"
                class="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 placeholder-gray-600"
                :placeholder="param.placeholder || ''"
              />
              <p class="mt-1 text-xs text-gray-500">{{ param.description }}</p>
            </div>
          </div>
        </div>

        <!-- Send Button -->
        <div>
          <button
            @click="sendRequest"
            :disabled="isLoading"
            class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg shadow-lg shadow-emerald-900/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon
              v-if="isLoading"
              name="i-heroicons-arrow-path"
              class="w-5 h-5 animate-spin"
            />
            <Icon v-else name="i-heroicons-paper-airplane" class="w-5 h-5" />
            {{ isLoading ? "Sending..." : "Send Request" }}
          </button>
        </div>

        <!-- Response Area -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h3
              class="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2"
            >
              <Icon name="i-heroicons-code-bracket" class="w-4 h-4" />
              Response
            </h3>
            <span
              v-if="responseStatus"
              class="px-2.5 py-0.5 rounded text-xs font-bold border"
              :class="getStatusColor(responseStatus)"
            >
              Status: {{ responseStatus }}
            </span>
          </div>

          <div class="relative group">
            <div
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <button
                @click="copyResponse"
                class="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-md border border-gray-700 shadow-sm transition-colors"
                title="Copy Response"
              >
                <Icon name="i-heroicons-clipboard" class="w-4 h-4" />
              </button>
            </div>

            <div
              class="w-full h-96 bg-gray-950 rounded-xl border border-gray-800 overflow-hidden relative"
            >
              <div
                v-if="!responseData && !isLoading"
                class="absolute inset-0 flex items-center justify-center text-gray-600 gap-2"
              >
                <Icon name="i-heroicons-cube-transparent" class="w-6 h-6" />
                <span>Ready to send request</span>
              </div>

              <div
                v-else-if="isLoading"
                class="absolute inset-0 flex items-center justify-center text-emerald-500 gap-2"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-8 h-8 animate-spin"
                />
              </div>

              <pre
                v-else
                class="p-4 h-full overflow-auto text-sm font-mono text-emerald-400 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
              ><code>{{ formattedResponse }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { useRuntimeConfig } from "#app";

const { language: currentLang } = useLanguage();
const config = useRuntimeConfig();
const token = ref("");
const isLoading = ref(false);
const responseData = ref<any>(null);
const responseStatus = ref<number | null>(null);
const requestParams = reactive<Record<string, string>>({});

// Get API base URL from environment variable
const baseApiUrl = computed(
  () => config.public.apiBaseUrl || "http://localhost:8090"
);

// Interfaces
interface Param {
  name: string;
  required: boolean;
  type: string;
  description: string;
  placeholder?: string;
}

interface Endpoint {
  id: string;
  title: string;
  method: string;
  path: string;
  params?: Param[];
}

// Endpoints Configuration
const endpoints = computed<Endpoint[]>(() => [
  {
    id: "health-check",
    title: currentLang.value === "en" ? "Health Check" : "Cek Status",
    method: "GET",
    path: "/",
  },
  {
    id: "get-provinces",
    title: currentLang.value === "en" ? "Get Provinces" : "Ambil Provinsi",
    method: "GET",
    path: "/api/v1/provinces",
  },
  {
    id: "get-regencies",
    title:
      currentLang.value === "en" ? "Get Regencies" : "Ambil Kabupaten/Kota",
    method: "GET",
    path: "/api/v1/regencies",
    params: [
      {
        name: "province_code",
        required: true,
        type: "string",
        description: "Example: 11",
        placeholder: "11",
      },
    ],
  },
  {
    id: "get-districts",
    title: currentLang.value === "en" ? "Get Districts" : "Ambil Kecamatan",
    method: "GET",
    path: "/api/v1/districts",
    params: [
      {
        name: "regency_code",
        required: true,
        type: "string",
        description: "Example: 1101",
        placeholder: "1101",
      },
    ],
  },
  {
    id: "get-villages",
    title: currentLang.value === "en" ? "Get Villages" : "Ambil Kelurahan/Desa",
    method: "GET",
    path: "/api/v1/villages",
    params: [
      {
        name: "district_code",
        required: true,
        type: "string",
        description: "Example: 110101",
        placeholder: "110101",
      },
    ],
  },
]);

const selectedEndpoint = ref<Endpoint | null>(null);

// Watch for endpoints change (e.g. language change) to update selected endpoint
watch(
  endpoints,
  (newEndpoints) => {
    if (selectedEndpoint.value) {
      // Try to find the same endpoint in the new list
      const found = newEndpoints.find(
        (e) => e.id === selectedEndpoint.value?.id
      );
      if (found) {
        selectedEndpoint.value = found;
      } else {
        selectedEndpoint.value = newEndpoints[0] ?? null;
      }
    } else if (newEndpoints.length > 0) {
      selectedEndpoint.value = newEndpoints[0] ?? null;
    } else {
      selectedEndpoint.value = null;
    }
  },
  { immediate: true }
);

const selectEndpoint = (endpoint: Endpoint) => {
  selectedEndpoint.value = endpoint;
  responseData.value = null;
  responseStatus.value = null;
  // Clear params avoiding overlap
  Object.keys(requestParams).forEach((key) => delete requestParams[key]);
  if (endpoint.params) {
    endpoint.params.forEach((p) => {
      requestParams[p.name] = "";
    });
  }
};

const formattedResponse = computed(() => {
  if (!responseData.value) return "";
  try {
    return JSON.stringify(responseData.value, null, 2);
  } catch (e) {
    return String(responseData.value);
  }
});

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "text-blue-400";
    case "POST":
      return "text-emerald-400";
    default:
      return "text-gray-400";
  }
};

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300)
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (status >= 400 && status < 500)
    return "bg-orange-500/10 text-orange-400 border-orange-500/30";
  if (status >= 500) return "bg-red-500/10 text-red-400 border-red-500/30";
  return "bg-gray-500/10 text-gray-400 border-gray-500/30";
};

const sendRequest = async () => {
  if (!selectedEndpoint.value) return;

  isLoading.value = true;
  responseData.value = null;
  responseStatus.value = null;

  try {
    const url = new URL(`${baseApiUrl.value}${selectedEndpoint.value.path}`);

    // Add query params
    if (selectedEndpoint.value.params) {
      selectedEndpoint.value.params.forEach((param) => {
        const value = requestParams[param.name];
        if (value) {
          url.searchParams.append(param.name, value);
        }
      });
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`;
    }

    const response = await fetch(url.toString(), {
      method: selectedEndpoint.value.method,
      headers,
    });

    responseStatus.value = response.status;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      responseData.value = await response.json();
    } else {
      responseData.value = await response.text();
    }
  } catch (error: any) {
    console.error("API Request Failed", error);
    responseData.value = {
      error: "Request Failed",
      message: error.message,
    };
    responseStatus.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const copyResponse = () => {
  if (formattedResponse.value) {
    navigator.clipboard.writeText(formattedResponse.value);
  }
};

onMounted(() => {
  // Initial selection handled by watch immediate
});
</script>

<style scoped>
/* Custom scrollbar for JSON view */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #374151; /* gray-700 */
  border-radius: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #4b5563; /* gray-600 */
}
</style>
