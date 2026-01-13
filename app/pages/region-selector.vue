<template>
  <div
    class="min-h-screen bg-gray-900 text-gray-300 bg-gradient-to-br p-4 sm:p-8 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl top-20 -left-20 animate-pulse"
      ></div>
      <div
        class="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"
      ></div>
      <div
        class="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in">
        <h1
          class="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"
        >
          {{ text.title }}
        </h1>
        <p class="text-lg text-emerald-200">
          {{ text.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Side - Selectors -->
        <div class="space-y-5">
          <!-- Step 1: Province -->
          <div
            class="group bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border-2 border-emerald-500/50 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300"
              >
                1
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">
                  {{ text.step1.title }}
                </h3>
                <p class="text-xs text-emerald-300">{{ text.step1.desc }}</p>
              </div>
              <button
                v-if="selectedProvince"
                @click="resetProvince"
                class="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                title="Reset"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5 text-emerald-400"
                />
              </button>
            </div>

            <select
              v-model="selectedProvince"
              @change="handleProvinceChange"
              class="w-full bg-gray-900/70 border-2 border-emerald-500/50 text-white text-base rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 appearance-none cursor-pointer transition-all duration-300 hover:border-emerald-400"
              :disabled="isLoadingProvinces"
            >
              <option value="" disabled class="bg-gray-900">
                {{ isLoadingProvinces ? text.loading : text.step1.placeholder }}
              </option>
              <option
                v-for="prov in provinces"
                :key="prov.id"
                :value="prov.code"
                class="bg-gray-900"
              >
                {{ prov.name }}
              </option>
            </select>

            <div
              v-if="provinces.length > 0"
              class="flex items-center gap-2 mt-3 text-emerald-400 text-sm bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30"
            >
              <Icon name="i-heroicons-check-circle" class="w-4 h-4" />
              <span class="font-semibold">{{
                text.step1.available(provinces.length)
              }}</span>
            </div>
          </div>

          <!-- Step 2: Regency -->
          <div
            class="group bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-300"
            :class="
              selectedProvince
                ? 'border-cyan-500/50 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20'
                : 'border-gray-700 opacity-50 cursor-not-allowed'
            "
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/50 transition-transform duration-300"
                :class="selectedProvince ? 'group-hover:scale-110' : ''"
              >
                2
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">
                  {{ text.step2.title }}
                </h3>
                <p class="text-xs text-cyan-300">
                  {{ text.step2.desc }}
                </p>
              </div>
              <button
                v-if="selectedRegency"
                @click="resetRegency"
                class="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
                title="Reset"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5 text-cyan-400"
                />
              </button>
            </div>

            <select
              v-model="selectedRegency"
              @change="handleRegencyChange"
              :disabled="!selectedProvince || isLoadingRegencies"
              class="w-full bg-gray-900/70 border-2 border-cyan-500/50 text-white text-base rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 appearance-none cursor-pointer transition-all duration-300 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-700"
            >
              <option value="" disabled class="bg-gray-900">
                {{ isLoadingRegencies ? text.loading : text.step2.placeholder }}
              </option>
              <option
                v-for="reg in regencies"
                :key="reg.id"
                :value="reg.code"
                class="bg-gray-900"
              >
                {{ reg.name }}
              </option>
            </select>

            <div
              v-if="regencies.length > 0"
              class="flex items-center gap-2 mt-3 text-emerald-400 text-sm bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30"
            >
              <Icon name="i-heroicons-check-circle" class="w-4 h-4" />
              <span class="font-semibold">{{
                text.step2.available(regencies.length)
              }}</span>
            </div>
          </div>

          <!-- Step 3: District -->
          <div
            class="group bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-300"
            :class="
              selectedRegency
                ? 'border-teal-500/50 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/20'
                : 'border-gray-700 opacity-50 cursor-not-allowed'
            "
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/50 transition-transform duration-300"
                :class="selectedRegency ? 'group-hover:scale-110' : ''"
              >
                3
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">
                  {{ text.step3.title }}
                </h3>
                <p class="text-xs text-teal-300">
                  {{ text.step3.desc }}
                </p>
              </div>
              <button
                v-if="selectedDistrict"
                @click="resetDistrict"
                class="p-2 hover:bg-teal-500/20 rounded-lg transition-colors"
                title="Reset"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5 text-teal-400"
                />
              </button>
            </div>

            <select
              v-model="selectedDistrict"
              @change="handleDistrictChange"
              :disabled="!selectedRegency || isLoadingDistricts"
              class="w-full bg-gray-900/70 border-2 border-teal-500/50 text-white text-base rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 appearance-none cursor-pointer transition-all duration-300 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-700"
            >
              <option value="" disabled class="bg-gray-900">
                {{ isLoadingDistricts ? text.loading : text.step3.placeholder }}
              </option>
              <option
                v-for="dist in districts"
                :key="dist.id"
                :value="dist.code"
                class="bg-gray-900"
              >
                {{ dist.name }}
              </option>
            </select>

            <div
              v-if="districts.length > 0"
              class="flex items-center gap-2 mt-3 text-emerald-400 text-sm bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30"
            >
              <Icon name="i-heroicons-check-circle" class="w-4 h-4" />
              <span class="font-semibold">{{
                text.step3.available(districts.length)
              }}</span>
            </div>
          </div>

          <!-- Step 4: Village -->
          <div
            class="group bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-300"
            :class="
              selectedDistrict
                ? 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20'
                : 'border-gray-700 opacity-50 cursor-not-allowed'
            "
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/50 transition-transform duration-300"
                :class="selectedDistrict ? 'group-hover:scale-110' : ''"
              >
                4
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">
                  {{ text.step4.title }}
                </h3>
                <p class="text-xs text-emerald-300">
                  {{ text.step4.desc }}
                </p>
              </div>
              <button
                v-if="selectedVillage"
                @click="resetVillage"
                class="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                title="Reset"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5 text-emerald-400"
                />
              </button>
            </div>

            <select
              v-model="selectedVillage"
              @change="handleVillageChange"
              :disabled="!selectedDistrict || isLoadingVillages"
              class="w-full bg-gray-900/70 border-2 border-emerald-500/50 text-white text-base rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 appearance-none cursor-pointer transition-all duration-300 hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-700"
            >
              <option value="" disabled class="bg-gray-900">
                {{ isLoadingVillages ? text.loading : text.step4.placeholder }}
              </option>
              <option
                v-for="vill in villages"
                :key="vill.id"
                :value="vill.code"
                class="bg-gray-900"
              >
                {{ vill.name }}
              </option>
            </select>

            <div
              v-if="villages.length > 0"
              class="flex items-center gap-2 mt-3 text-emerald-400 text-sm bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30"
            >
              <Icon name="i-heroicons-check-circle" class="w-4 h-4" />
              <span class="font-semibold">{{
                text.step4.available(villages.length)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Right Side - Results -->
        <div class="lg:sticky lg:top-8 h-fit">
          <div
            class="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border-2 border-emerald-500/50 shadow-xl"
          >
            <div class="flex items-center gap-3 mb-6">
              <Icon
                name="i-heroicons-document-check"
                class="w-7 h-7 text-emerald-400"
              />
              <h3 class="text-2xl font-bold text-white">
                {{ text.result.title }}
              </h3>
            </div>

            <div class="space-y-3">
              <!-- Province Result -->
              <div
                v-if="selectedProvinceData"
                class="group p-4 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl backdrop-blur-sm hover:border-emerald-400 transition-all duration-300"
              >
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="i-heroicons-map"
                    class="w-4 h-4 text-emerald-400"
                  />
                  <div class="text-xs font-semibold text-emerald-400 uppercase">
                    Provinsi
                  </div>
                </div>
                <div class="text-xl font-bold text-white mb-1">
                  {{ selectedProvinceData.name }}
                </div>
                <div class="text-sm text-emerald-300 font-mono">
                  {{ text.result.code }}: {{ selectedProvinceData.code }}
                </div>
              </div>

              <!-- Regency Result -->
              <div
                v-if="selectedRegencyData"
                class="group p-4 bg-cyan-500/10 border-2 border-cyan-500/50 rounded-xl backdrop-blur-sm hover:border-cyan-400 transition-all duration-300"
              >
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="i-heroicons-building-office-2"
                    class="w-4 h-4 text-cyan-400"
                  />
                  <div class="text-xs font-semibold text-cyan-400 uppercase">
                    Kota/Kabupaten
                  </div>
                </div>
                <div class="text-xl font-bold text-white mb-1">
                  {{ selectedRegencyData.name }}
                </div>
                <div class="text-sm text-cyan-300 font-mono">
                  {{ text.result.code }}: {{ selectedRegencyData.code }}
                </div>
              </div>

              <!-- District Result -->
              <div
                v-if="selectedDistrictData"
                class="group p-4 bg-teal-500/10 border-2 border-teal-500/50 rounded-xl backdrop-blur-sm hover:border-teal-400 transition-all duration-300"
              >
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="i-heroicons-building-office"
                    class="w-4 h-4 text-teal-400"
                  />
                  <div class="text-xs font-semibold text-teal-400 uppercase">
                    Kecamatan
                  </div>
                </div>
                <div class="text-xl font-bold text-white mb-1">
                  {{ selectedDistrictData.name }}
                </div>
                <div class="text-sm text-teal-300 font-mono">
                  {{ text.result.code }}: {{ selectedDistrictData.code }}
                </div>
              </div>

              <!-- Village Result -->
              <div
                v-if="selectedVillageData"
                class="group p-4 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl backdrop-blur-sm hover:border-emerald-400 transition-all duration-300"
              >
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="i-heroicons-home-modern"
                    class="w-4 h-4 text-emerald-400"
                  />
                  <div class="text-xs font-semibold text-emerald-400 uppercase">
                    Kelurahan/Desa
                  </div>
                </div>
                <div class="text-xl font-bold text-white mb-1">
                  {{ selectedVillageData.name }}
                </div>
                <div class="text-sm text-emerald-300 font-mono">
                  {{ text.result.code }}: {{ selectedVillageData.code }}
                </div>
              </div>

              <!-- Complete Path JSON -->
              <div v-if="completePath" class="mt-5">
                <div class="flex items-center gap-2 mb-2">
                  <Icon
                    name="i-heroicons-code-bracket"
                    class="w-5 h-5 text-emerald-400"
                  />
                  <h4 class="text-sm font-bold text-white">
                    {{ text.result.completePath }}
                  </h4>
                </div>
                <div
                  class="bg-gray-900/80 rounded-xl p-4 border-2 border-gray-700 overflow-x-auto"
                >
                  <pre class="text-xs text-emerald-400 font-mono">{{
                    completePath
                  }}</pre>
                </div>
              </div>

              <!--Empty State -->
              <div v-if="!selectedProvinceData" class="text-center py-12">
                <div
                  class="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/30"
                >
                  <Icon
                    name="i-heroicons-map-pin"
                    class="w-10 h-10 text-emerald-400"
                  />
                </div>
                <p class="text-emerald-300 text-lg font-medium">
                  {{ text.emptyState.title }}
                </p>
                <p class="text-gray-400 text-sm mt-1">
                  {{ text.emptyState.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { useRuntimeConfig } from "#app";

const { language } = useLanguage();

const config = useRuntimeConfig();
const token =
  config.public.apiToken ||
  "NmMxZmEzYTJlYjlhNGZmYTNmMmU2YmMzOWI4YjAxMWVhMWE5NDMzNWZmNjNkYjVkNWU4YTVjOTUyZDNjYjlhZA==";

// Bilingual text
const text = computed(() => ({
  title: language.value === "en" ? "Region Selector" : "Pemilih Wilayah",
  subtitle:
    language.value === "en"
      ? "Select Indonesian regions easily and quickly"
      : "Pilih wilayah Indonesia dengan mudah dan cepat",
  step1: {
    title: language.value === "en" ? "Select Province" : "Pilih Provinsi",
    desc:
      language.value === "en" ? "Start from province" : "Mulai dari provinsi",
    placeholder: language.value === "en" ? "Select Province" : "Pilih Provinsi",
    available:
      language.value === "en"
        ? (count: number) => `${count} provinces available`
        : (count: number) => `${count} provinsi tersedia`,
  },
  step2: {
    title:
      language.value === "en" ? "Select City/Regency" : "Pilih Kota/Kabupaten",
    desc:
      language.value === "en"
        ? "Select from chosen province"
        : "Pilih dari provinsi yang dipilih",
    placeholder:
      language.value === "en" ? "Select City/Regency" : "Pilih Kota/Kabupaten",
    available:
      language.value === "en"
        ? (count: number) => `${count} cities/regencies available`
        : (count: number) => `${count} kota/kabupaten tersedia`,
  },
  step3: {
    title: language.value === "en" ? "Select District" : "Pilih Kecamatan",
    desc:
      language.value === "en"
        ? "Select from chosen city/regency"
        : "Pilih dari kota/kabupaten yang dipilih",
    placeholder:
      language.value === "en" ? "Select District" : "Pilih Kecamatan",
    available:
      language.value === "en"
        ? (count: number) => `${count} districts available`
        : (count: number) => `${count} kecamatan tersedia`,
  },
  step4: {
    title:
      language.value === "en" ? "Select Village/Ward" : "Pilih Kelurahan/Desa",
    desc:
      language.value === "en"
        ? "Select from chosen district"
        : "Pilih dari kecamatan yang dipilih",
    placeholder:
      language.value === "en" ? "Select Village/Ward" : "Pilih Kelurahan/Desa",
    available:
      language.value === "en"
        ? (count: number) => `${count} villages/wards available`
        : (count: number) => `${count} kelurahan/desa tersedia`,
  },
  loading: language.value === "en" ? "Loading..." : "Memuat...",
  result: {
    title: language.value === "en" ? "Selection Result" : "Hasil Pilihan",
    province: language.value === "en" ? "Province" : "Provinsi",
    regency: language.value === "en" ? "City/Regency" : "Kota/Kabupaten",
    district: language.value === "en" ? "District" : "Kecamatan",
    village: language.value === "en" ? "Village/Ward" : "Kelurahan/Desa",
    code: language.value === "en" ? "Code" : "Kode",
    completePath:
      language.value === "en" ? "Complete Path (JSON)" : "Path Lengkap (JSON)",
  },
  emptyState: {
    title:
      language.value === "en"
        ? "Start by selecting a province"
        : "Mulai dengan memilih provinsi",
    desc:
      language.value === "en"
        ? "Results will appear here"
        : "Hasil akan muncul di sini",
  },
}));

// Loading states
const isLoadingProvinces = ref(false);
const isLoadingRegencies = ref(false);
const isLoadingDistricts = ref(false);
const isLoadingVillages = ref(false);

// Data arrays
const provinces = ref<any[]>([]);
const regencies = ref<any[]>([]);
const districts = ref<any[]>([]);
const villages = ref<any[]>([]);

// Selected values (IDs)
const selectedProvince = ref("");
const selectedRegency = ref("");
const selectedDistrict = ref("");
const selectedVillage = ref("");

// Selected data objects
const selectedProvinceData = ref<any>(null);
const selectedRegencyData = ref<any>(null);
const selectedDistrictData = ref<any>(null);
const selectedVillageData = ref<any>(null);

const baseApiUrl = computed(() => config.public.apiBaseUrl);

// Fetch helper
const fetchData = async (path: string) => {
  try {
    const res = await fetch(`${baseApiUrl.value}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.data || data;
    }
    return [];
  } catch (e) {
    console.error("Fetch failed", e);
    return [];
  }
};

// Load provinces on mount
const loadProvinces = async () => {
  isLoadingProvinces.value = true;
  provinces.value = await fetchData("/api/v1/provinces");
  isLoadingProvinces.value = false;
};

// Handlers
const handleProvinceChange = async () => {
  selectedProvinceData.value = provinces.value.find(
    (p) => p.code === selectedProvince.value
  );

  selectedRegency.value = "";
  selectedDistrict.value = "";
  selectedVillage.value = "";
  selectedRegencyData.value = null;
  selectedDistrictData.value = null;
  selectedVillageData.value = null;
  regencies.value = [];
  districts.value = [];
  villages.value = [];

  if (selectedProvince.value) {
    isLoadingRegencies.value = true;
    regencies.value = await fetchData(
      `/api/v1/regencies?province_code=${selectedProvince.value}`
    );
    isLoadingRegencies.value = false;
  }
};

const handleRegencyChange = async () => {
  selectedRegencyData.value = regencies.value.find(
    (r) => r.code === selectedRegency.value
  );

  selectedDistrict.value = "";
  selectedVillage.value = "";
  selectedDistrictData.value = null;
  selectedVillageData.value = null;
  districts.value = [];
  villages.value = [];

  if (selectedRegency.value) {
    isLoadingDistricts.value = true;
    districts.value = await fetchData(
      `/api/v1/districts?regency_code=${selectedRegency.value}`
    );
    isLoadingDistricts.value = false;
  }
};

const handleDistrictChange = async () => {
  selectedDistrictData.value = districts.value.find(
    (d) => d.code === selectedDistrict.value
  );

  selectedVillage.value = "";
  selectedVillageData.value = null;
  villages.value = [];

  if (selectedDistrict.value) {
    isLoadingVillages.value = true;
    villages.value = await fetchData(
      `/api/v1/villages?district_code=${selectedDistrict.value}`
    );
    isLoadingVillages.value = false;
  }
};

const handleVillageChange = () => {
  selectedVillageData.value = villages.value.find(
    (v) => v.code === selectedVillage.value
  );
};

// Reset functions
const resetProvince = () => {
  selectedProvince.value = "";
  selectedProvinceData.value = null;
  handleProvinceChange();
};

const resetRegency = () => {
  selectedRegency.value = "";
  selectedRegencyData.value = null;
  handleRegencyChange();
};

const resetDistrict = () => {
  selectedDistrict.value = "";
  selectedDistrictData.value = null;
  handleDistrictChange();
};

const resetVillage = () => {
  selectedVillage.value = "";
  selectedVillageData.value = null;
};

// Complete path computed
const completePath = computed(() => {
  if (!selectedProvinceData.value) return null;

  const path: any = {
    province: {
      code: selectedProvinceData.value.code,
      name: selectedProvinceData.value.name,
    },
  };

  if (selectedRegencyData.value) {
    path.regency = {
      code: selectedRegencyData.value.code,
      name: selectedRegencyData.value.name,
    };
  }

  if (selectedDistrictData.value) {
    path.district = {
      code: selectedDistrictData.value.code,
      name: selectedDistrictData.value.name,
    };
  }

  if (selectedVillageData.value) {
    path.village = {
      code: selectedVillageData.value.code,
      name: selectedVillageData.value.name,
    };
  }

  return JSON.stringify(path, null, 2);
});

// Load provinces on mount
onMounted(() => {
  loadProvinces();
});
</script>

<style scoped>
/* Background elements dengan efek lebih halus */
.absolute.inset-0.overflow-hidden > div {
  opacity: 0.1;
  animation-duration: 6s;
}

/* Container utama dengan padding lebih baik */
.min-h-screen {
  border: none;
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}

/* Header dengan spacing lebih baik */
.text-center.mb-10.animate-fade-in {
  border-bottom: 1px solid rgba(16, 185, 129, 0.15);
  padding-bottom: 2.5rem;
  margin-bottom: 3rem;
}

/* Grid layout dengan gap lebih besar */
.grid.grid-cols-1.lg\:grid-cols-2 {
  gap: 2.5rem;
}

/* Left side container dengan padding lebih baik */
.space-y-5 {
  gap: 1.75rem;
  display: flex;
  flex-direction: column;
}

/* Step cards dengan spacing yang lebih baik */
.group.bg-gray-800\/60 {
  border: 1px solid rgba(16, 185, 129, 0.12) !important;
  box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.08),
    0 1px 4px -1px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1.25rem;
  padding: 1.75rem;
  margin-bottom: 0.5rem;
}

/* Hover effect yang lebih halus */
.group.bg-gray-800\/60:hover {
  border-color: rgba(16, 185, 129, 0.25) !important;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15),
    0 4px 10px -3px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  transform: translateY(-3px);
}

/* Header step dengan margin lebih baik */
.flex.items-center.gap-3.mb-4 {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(16, 185, 129, 0.08);
}

/* Judul step dengan spacing lebih baik */
.flex-1 h3 {
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.flex-1 p {
  margin-top: 0.25rem;
}

/* Select dropdown dengan spacing lebih baik */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%20a7c2d0'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
  padding: 1rem 2.5rem 1rem 1.25rem;
  border: 1px solid rgba(16, 185, 129, 0.15) !important;
  background-color: rgba(15, 23, 42, 0.65) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.875rem;
  font-size: 0.95rem;
  line-height: 1.5;
  min-height: 3.25rem;
  display: flex;
  align-items: center;
}

select:hover {
  border-color: rgba(16, 185, 129, 0.3) !important;
  background-color: rgba(15, 23, 42, 0.85) !important;
}

select:focus {
  border-color: rgba(16, 185, 129, 0.5) !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1),
    0 4px 12px -2px rgba(16, 185, 129, 0.15);
  outline: none;
}

select:disabled {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%20647585'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  border-color: rgba(75, 85, 99, 0.15) !important;
  background-color: rgba(30, 41, 59, 0.4) !important;
}

/* Info badges dengan spacing lebih baik */
.flex.items-center.gap-2.mt-3 {
  margin-top: 1.25rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(16, 185, 129, 0.15) !important;
  background-color: rgba(16, 185, 129, 0.05) !important;
  backdrop-filter: blur(10px);
  border-radius: 0.875rem;
  font-size: 0.875rem;
}

/* Right side panel dengan spacing lebih baik */
.lg\:sticky.lg\:top-8 {
  top: 2rem;
}

.bg-gray-800\/60.backdrop-blur-md.rounded-2xl.p-6 {
  border: 1px solid rgba(16, 185, 129, 0.12) !important;
  box-shadow: 0 8px 30px -10px rgba(0, 0, 0, 0.2),
    0 4px 12px -4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
}

/* Header panel result */
.flex.items-center.gap-3.mb-6 {
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
}

/* Result items dengan spacing lebih baik */
.group.p-4 {
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(16, 185, 129, 0.08) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1rem;
}

.group.p-4:hover {
  border-color: rgba(16, 185, 129, 0.2) !important;
  background-color: rgba(16, 185, 129, 0.06);
  transform: translateX(3px);
}

/* JSON box dengan spacing lebih baik */
.mt-5 {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(16, 185, 129, 0.08);
}

.bg-gray-900\/80.rounded-xl.p-4 {
  padding: 1.5rem;
  border: 1px solid rgba(16, 185, 129, 0.08) !important;
  box-shadow: inset 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin-top: 0.75rem;
}

/* Empty state dengan spacing lebih baik */
.text-center.py-12 {
  padding: 4rem 2rem;
}

.w-20.h-20.mx-auto.mb-4 {
  margin-bottom: 1.5rem;
  width: 5rem;
  height: 5rem;
}

/* Number circles dengan spacing lebih baik */
.w-10.h-10.rounded-xl {
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
  font-size: 1rem;
}

/* Reset buttons dengan spacing lebih baik */
button.p-2 {
  padding: 0.5rem;
  border-radius: 0.625rem;
  transition: all 0.2s ease;
}

/* Border accents yang lebih subtle */
.group.bg-gray-800\/60:nth-child(1) {
  border-left: 3px solid rgba(16, 185, 129, 0.3) !important;
}

.group.bg-gray-800\/60:nth-child(2) {
  border-left: 3px solid rgba(6, 182, 212, 0.3) !important;
}

.group.bg-gray-800\/60:nth-child(3) {
  border-left: 3px solid rgba(20, 184, 166, 0.3) !important;
}

.group.bg-gray-800\/60:nth-child(4) {
  border-left: 3px solid rgba(5, 150, 105, 0.3) !important;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-pulse {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Gradient text untuk judul */
.text-4xl.sm\:text-5xl.font-extrabold.text-white {
  background: linear-gradient(135deg, #10b981 0%, #0d9488 50%, #0891b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.25);
  border-radius: 3px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.4);
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .grid.grid-cols-1.lg\:grid-cols-2 {
    gap: 2rem;
  }

  .group.bg-gray-800\/60 {
    padding: 1.5rem;
  }

  .bg-gray-800\/60.backdrop-blur-md.rounded-2xl.p-6 {
    padding: 1.75rem;
  }
}

@media (max-width: 640px) {
  .min-h-screen {
    padding: 1rem;
  }

  .group.bg-gray-800\/60 {
    padding: 1.25rem;
    border-radius: 1rem;
  }

  .bg-gray-800\/60.backdrop-blur-md.rounded-2xl.p-6 {
    padding: 1.5rem;
    border-radius: 1.25rem;
  }

  select {
    padding: 0.875rem 2.25rem 0.875rem 1rem;
    font-size: 0.9rem;
  }
}

/* Option styling */
option.bg-gray-900 {
  padding: 0.75rem;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
}

option.bg-gray-900:hover {
  background-color: rgba(16, 185, 129, 0.2) !important;
}

/* Placeholder text styling */
select option[value=""][disabled] {
  color: rgba(148, 163, 184, 0.7);
  font-style: italic;
}
</style>
