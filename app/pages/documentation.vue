<template>
  <div class="min-h-screen bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <aside class="w-full lg:w-64 shrink-0">
          <div class="sticky top-24 space-y-8">
            <div>
              <h3
                class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"
              >
                {{ currentLang === "en" ? "Getting Started" : "Mulai" }}
              </h3>
              <nav class="space-y-2">
                <a
                  href="#introduction"
                  class="block px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 hover:text-emerald-400 transition-colors"
                  :class="{
                    'text-emerald-400 bg-gray-800':
                      activeSection === 'introduction',
                  }"
                  @click.prevent="scrollTo('introduction')"
                >
                  {{ currentLang === "en" ? "Introduction" : "Pengantar" }}
                </a>
                <a
                  href="#authentication"
                  class="block px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 hover:text-emerald-400 transition-colors"
                  :class="{
                    'text-emerald-400 bg-gray-800':
                      activeSection === 'authentication',
                  }"
                  @click.prevent="scrollTo('authentication')"
                >
                  {{ currentLang === "en" ? "Authentication" : "Autentikasi" }}
                </a>
              </nav>
            </div>

            <div>
              <h3
                class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3"
              >
                Endpoints
              </h3>
              <nav class="space-y-2">
                <a
                  v-for="endpoint in endpoints"
                  :key="endpoint.id"
                  :href="`#${endpoint.id}`"
                  class="block px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 hover:text-emerald-400 transition-colors"
                  :class="{
                    'text-emerald-400 bg-gray-800':
                      activeSection === endpoint.id,
                  }"
                  @click.prevent="scrollTo(endpoint.id)"
                >
                  <span
                    :class="getMethodColor(endpoint.method)"
                    class="text-xs font-bold mr-2 w-10 inline-block"
                  >
                    {{ endpoint.method }}
                  </span>
                  {{ endpoint.title }}
                </a>
              </nav>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
          <!-- Introduction -->
          <section id="introduction" class="mb-16 scroll-mt-24">
            <h1 class="text-4xl font-extrabold text-white mb-6">
              {{
                currentLang === "en" ? "API Documentation" : "Dokumentasi API"
              }}
            </h1>
            <p class="text-lg text-gray-400 leading-relaxed mb-6">
              {{
                currentLang === "en"
                  ? "Welcome to the API Indonesia documentation. This API provides comprehensive data about administrative regions in Indonesia, including provinces, regencies, districts, and villages."
                  : "Selamat datang di dokumentasi API Indonesia. API ini menyediakan data lengkap wilayah administratif di Indonesia, termasuk provinsi, kabupaten/kota, kecamatan, dan kelurahan/desa."
              }}
            </p>
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold text-white mb-2">Base URL</h3>
              <code class="text-emerald-400 font-mono">{{ baseApiUrl }}</code>
            </div>
          </section>

          <!-- Authentication -->
          <section id="authentication" class="mb-16 scroll-mt-24">
            <h2 class="text-2xl font-bold text-white mb-6">
              {{ currentLang === "en" ? "Authentication" : "Autentikasi" }}
            </h2>
            <p class="text-gray-400 mb-6">
              {{
                currentLang === "en"
                  ? "Some endpoints require authentication using a Bearer Token. Please login with your Google account on the website to obtain your access token automatically."
                  : "Beberapa endpoint memerlukan autentikasi menggunakan Bearer Token. Silakan login dengan akun Google Anda di website ini untuk mendapatkan akses token secara otomatis."
              }}
            </p>
            <div
              class="bg-emerald-900/20 border border-emerald-700/50 rounded-xl p-4 mb-6"
            >
              <div class="flex items-start gap-3">
                <Icon
                  name="i-heroicons-information-circle"
                  class="w-6 h-6 text-emerald-500 shrink-0"
                />
                <p class="text-emerald-200 text-sm">
                  {{
                    currentLang === "en"
                      ? "Once logged in, your token will be managed automatically for testing."
                      : "Setelah login, token Anda akan dikelola secara otomatis untuk kebutuhan testing."
                  }}
                </p>
              </div>
            </div>

            <div
              class="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 mb-6"
            >
              <div class="flex items-start gap-3">
                <Icon
                  name="i-heroicons-exclamation-triangle"
                  class="w-6 h-6 text-yellow-500 shrink-0"
                />
                <p class="text-yellow-200 text-sm">
                  {{
                    currentLang === "en"
                      ? "Always keep your API tokens secure. Do not expose them in client-side code without proper security measures."
                      : "Selalu jaga kerahasiaan token API Anda. Jangan tampilkan token di kode client-side tanpa pengamanan yang tepat."
                  }}
                </p>
              </div>
            </div>
          </section>

          <!-- Endpoints -->
          <section class="space-y-16">
            <div
              v-for="endpoint in endpoints"
              :key="endpoint.id"
              :id="endpoint.id"
              class="scroll-mt-24"
            >
              <div class="flex items-center gap-4 mb-4">
                <span
                  class="px-3 py-1 rounded-lg text-sm font-bold border"
                  :class="getMethodBadgeClass(endpoint.method)"
                >
                  {{ endpoint.method }}
                </span>
                <h3 class="text-xl font-bold text-white">
                  {{ endpoint.path }}
                </h3>
              </div>

              <p class="text-gray-400 mb-6">{{ endpoint.description }}</p>

              <!-- Parameters Table if exists -->
              <div
                v-if="endpoint.params && endpoint.params.length"
                class="mb-6"
              >
                <h4
                  class="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3"
                >
                  Query Parameters
                </h4>
                <div class="bg-gray-800 rounded-lg overflow-hidden">
                  <table class="w-full text-left text-sm">
                    <thead class="bg-gray-700/50 text-gray-300">
                      <tr>
                        <th class="px-4 py-3 font-semibold">Parameter</th>
                        <th class="px-4 py-3 font-semibold">Type</th>
                        <th class="px-4 py-3 font-semibold">Required</th>
                        <th class="px-4 py-3 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                      <tr v-for="param in endpoint.params" :key="param.name">
                        <td class="px-4 py-3 font-mono text-emerald-400">
                          {{ param.name }}
                        </td>
                        <td class="px-4 py-3 text-purple-400">
                          {{ param.type }}
                        </td>
                        <td class="px-4 py-3">
                          <span
                            v-if="param.required"
                            class="text-red-400 text-xs font-bold border border-red-400/30 px-2 py-0.5 rounded"
                            >YES</span
                          >
                          <span
                            v-else
                            class="text-gray-500 text-xs font-bold border border-gray-600 px-2 py-0.5 rounded"
                            >NO</span
                          >
                        </td>
                        <td class="px-4 py-3 text-gray-400">
                          {{ param.description }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Code Example -->
              <div
                class="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden group"
              >
                <!-- Language Tabs -->
                <div
                  class="flex items-center space-x-1 px-2 py-2 bg-gray-900 border-b border-gray-800 overflow-x-auto"
                >
                  <button
                    v-for="lang in supportedLanguages"
                    :key="lang.id"
                    @click="activeCodeTab = lang.id"
                    class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap"
                    :class="
                      activeCodeTab === lang.id
                        ? 'bg-gray-800 text-emerald-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    "
                  >
                    {{ lang.label }}
                  </button>
                  <div class="flex-1"></div>
                  <button
                    @click="
                      copyToClipboard(
                        generateSnippet(endpoint, activeCodeTab),
                        endpoint.id
                      )
                    "
                    class="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
                    title="Copy to clipboard"
                  >
                    <Icon
                      v-if="copiedId === endpoint.id"
                      name="i-heroicons-check"
                      class="w-4 h-4 text-emerald-400"
                    />
                    <Icon v-else name="i-heroicons-clipboard" class="w-4 h-4" />
                  </button>
                </div>

                <div class="p-4 overflow-x-auto">
                  <pre
                    class="text-sm font-mono text-gray-300"
                  ><code>{{ generateSnippet(endpoint, activeCodeTab) }}</code></pre>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { useRuntimeConfig } from "#app";

const { language: currentLang } = useLanguage();
const config = useRuntimeConfig();
const activeSection = ref("introduction");
const copiedId = ref<string | null>(null);
const activeCodeTab = ref("curl");

// Get API base URL from environment variable
const baseApiUrl = computed(() => config.public.apiBaseUrl);

const supportedLanguages = [
  { id: "curl", label: "cURL" },
  { id: "js", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "node", label: "Node.js" },
  { id: "android", label: "Android (Kotlin)" },
  { id: "ios", label: "iOS (Swift)" },
];

const scrollTo = (id: string) => {
  activeSection.value = id;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const copyToClipboard = (text: string, id: string) => {
  navigator.clipboard.writeText(text);
  copiedId.value = id;
  setTimeout(() => {
    copiedId.value = null;
  }, 2000);
};

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "text-blue-400";
    case "POST":
      return "text-emerald-400";
    case "PUT":
      return "text-orange-400";
    case "DELETE":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getMethodBadgeClass = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "POST":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "PUT":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "DELETE":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

const generateSnippet = (endpoint: any, lang: string) => {
  const baseUrl = baseApiUrl.value;
  const url = `${baseUrl}${endpoint.path}`;
  const method = endpoint.method;
  const hasParams = endpoint.params && endpoint.params.length > 0;

  // Construct query params example
  let queryParamsString = "";
  if (hasParams) {
    const params = endpoint.params
      .map(
        (p: any) =>
          `${p.name}=${
            p.name === "province_code"
              ? "11"
              : p.name === "regency_code"
              ? "1101"
              : "110101"
          }`
      )
      .join("&");
    queryParamsString = `?${params}`;
  }
  const fullUrl = `${url}${queryParamsString}`;

  switch (lang) {
    case "curl":
      return `curl -X ${method} "${fullUrl}" \\
  -H "Authorization: Bearer <YOUR_TOKEN>"`;

    case "js":
      return `fetch("${fullUrl}", {
  method: "${method}",
  headers: {
    "Authorization": "Bearer <YOUR_TOKEN>"
  }
})
.then(response => response.json())
.then(data => console.log(data));`;

    case "python":
      return `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer <YOUR_TOKEN>"
}

response = requests.${method.toLowerCase()}(url, headers=headers)
print(response.json())`;

    case "go":
      return `package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {
	url := "${fullUrl}"
	req, _ := http.NewRequest("${method}", url, nil)
	req.Header.Add("Authorization", "Bearer <YOUR_TOKEN>")

	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(string(body))
}`;

    case "node":
      return `const axios = require('axios');

const config = {
  method: '${method.toLowerCase()}',
  url: '${fullUrl}',
  headers: { 
    'Authorization': 'Bearer <YOUR_TOKEN>'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});`;

    case "android":
      return `val client = OkHttpClient()
val request = Request.Builder()
    .url("${fullUrl}")
    .addHeader("Authorization", "Bearer <YOUR_TOKEN>")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())`;

    case "ios":
      return `var request = URLRequest(url: URL(string: "${fullUrl}")!,timeoutInterval: Double.infinity)
request.addValue("Bearer <YOUR_TOKEN>", forHTTPHeaderField: "Authorization")
request.httpMethod = "${method}"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()`;

    default:
      return "Code snippet not available";
  }
};

const endpoints = computed(() => [
  {
    id: "base-check",
    title: currentLang.value === "en" ? "Health Check" : "Cek Status",
    method: "GET",
    path: "/",
    description:
      currentLang.value === "en"
        ? "Check if the API server is running properly."
        : "Memeriksa apakah server API berjalan dengan baik.",
    params: [],
  },
  {
    id: "get-provinces",
    title: currentLang.value === "en" ? "Get Provinces" : "Ambil Provinsi",
    method: "GET",
    path: "/api/v1/provinces",
    description:
      currentLang.value === "en"
        ? "Retrieve a list of all 34 provinces in Indonesia."
        : "Mengambil daftar semua 34 provinsi di Indonesia.",
    params: [],
  },
  {
    id: "get-regencies",
    title:
      currentLang.value === "en" ? "Get Regencies" : "Ambil Kabupaten/Kota",
    method: "GET",
    path: "/api/v1/regencies",
    description:
      currentLang.value === "en"
        ? "Retrieve regencies (Kabupaten/Kota) for a specific province."
        : "Mengambil daftar kabupaten/kota berdasarkan kode provinsi.",
    params: [
      {
        name: "province_code",
        type: "string",
        required: true,
        description:
          currentLang.value === "en"
            ? "The 2-digit code of the province (e.g., 11 for Aceh)"
            : "2 digit kode provinsi (contoh: 11 untuk Aceh)",
      },
    ],
  },
  {
    id: "get-districts",
    title: currentLang.value === "en" ? "Get Districts" : "Ambil Kecamatan",
    method: "GET",
    path: "/api/v1/districts",
    description:
      currentLang.value === "en"
        ? "Retrieve districts (Kecamatan) for a specific regency."
        : "Mengambil daftar kecamatan berdasarkan kode kabupaten/kota.",
    params: [
      {
        name: "regency_code",
        type: "string",
        required: true,
        description:
          currentLang.value === "en"
            ? "The 4-digit code of the regency"
            : "4 digit kode kabupaten/kota",
      },
    ],
  },
  {
    id: "get-villages",
    title: currentLang.value === "en" ? "Get Villages" : "Ambil Kelurahan/Desa",
    method: "GET",
    path: "/api/v1/villages",
    description:
      currentLang.value === "en"
        ? "Retrieve villages (Kelurahan/Desa) for a specific district."
        : "Mengambil daftar kelurahan/desa berdasarkan kode kecamatan.",
    params: [
      {
        name: "district_code",
        type: "string",
        required: true,
        description:
          currentLang.value === "en"
            ? "The 6-digit code of the district"
            : "6 digit kode kecamatan",
      },
    ],
  },
]);
</script>

<style scoped>
/* Optional: Custom scrollbar styling if needed */
</style>
```
