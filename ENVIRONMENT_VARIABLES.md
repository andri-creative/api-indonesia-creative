# ✅ Hardcoded URLs Dihapus - Menggunakan Environment Variable

## 🎯 Perubahan yang Dilakukan:

Semua hardcoded URLs (`http://localhost:8090`) telah diganti dengan environment variable dari `.env` file.

---

## 📁 File yang Diupdate:

| File                  | Sebelum                             | Sekarang                          |
| --------------------- | ----------------------------------- | --------------------------------- |
| `.env.example`        | `http://localhost:5000`             | ✅ `http://localhost:8090/api/v1` |
| `useAuth.ts`          | Hardcoded fallback                  | ✅ `config.public.apiBaseUrl`     |
| `callback.vue`        | Hardcoded fallback                  | ✅ `config.public.apiBaseUrl`     |
| `documentation.vue`   | `http://localhost:8090` di 2 tempat | ✅ `baseApiUrl.value`             |
| `testing.vue`         | `http://localhost:8090`             | ✅ `baseApiUrl.value`             |
| `region-selector.vue` | `http://localhost:8090`             | ✅ `baseApiUrl.value`             |

---

## 🔧 Cara Konfigurasi:

### **1. Buat file `.env` di root project:**

```bash
# Copy dari .env.example
cp .env.example .env
```

### **2. Edit file `.env`:**

```env
# Development
NUXT_PUBLIC_API_BASE_URL=http://localhost:8090/api/v1

# Production (saat deploy)
# NUXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1
```

### **3. Restart Nuxt dev server:**

```bash
npm run dev
```

---

## 📊 Struktur Sekarang:

### **Frontend (Nuxt):**

```
.env (tidak di-commit ke git)
├── NUXT_PUBLIC_API_BASE_URL=http://localhost:8090/api/v1
└── NUXT_PUBLIC_APP_NAME=API Indo

nuxt.config.ts
└── runtimeConfig.public.apiBaseUrl ← Baca dari env

Semua files:
├── useAuth.ts → config.public.apiBaseUrl
├── callback.vue → config.public.apiBaseUrl
├── documentation.vue → baseApiUrl.value
├── testing.vue → baseApiUrl.value
└── region-selector.vue → baseApiUrl.value
```

---

## ✅ Keuntungan:

### **1. Lebih Rapi:**

- ❌ Tidak ada hardcoded URL di code
- ✅ Semua configuration di satu tempat (`.env`)

### **2. Mudah Deploy:**

```bash
# Development
NUXT_PUBLIC_API_BASE_URL=http://localhost:8090/api/v1

# Staging
NUXT_PUBLIC_API_BASE_URL=https://api-staging.yourdomain.com/api/v1

# Production
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### **3. Aman:**

- `.env` file ada di `.gitignore`
- Tidak ada credentials hardcoded
- Easy to manage per environment

---

## 🧪 Testing:

### **Test 1: Check Config Loaded:**

Buka browser console dan jalankan:

```javascript
// Seharusnya tampil URL dari .env
console.log(useRuntimeConfig().public.apiBaseUrl);
```

###Results **Test 2: Test API Call:**

1. Buka halaman `/testing`
2. Pilih endpoint "Get Provinces"
3. Click "Send Request"
4. ✅ Request seharusnya ke URL dari `.env`

### **Test 3: Check Documentation:**

1. Buka halaman `/documentation`
2. Lihat "Base URL" section
3. ✅ Seharusnya tampil URL dari `.env`

---

## 📝 Environment Variables yang Tersedia:

| Variable                   | Description                  | Example                        |
| -------------------------- | ---------------------------- | ------------------------------ |
| `NUXT_PUBLIC_API_BASE_URL` | Backend API base URL         | `http://localhost:8090/api/v1` |
| `NUXT_PUBLIC_APP_NAME`     | Application name             | `API Indo`                     |
| `NUXT_PUBLIC_API_TOKEN`    | Default API token (optional) | Your token                     |
| `NUXT_SECRET_KEY`          | Nuxt secret key (internal)   | Random string                  |

---

## 🚀 Deployment:

### **Vercel/Netlify:**

Add environment variables di dashboard:

```
NUXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1
 NUXT_PUBLIC_APP_NAME=API Indo
```

### **Docker:**

```dockerfile
ENV NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### **Node.js Server:**

```bash
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1 npm run build
```

---

## ✅ Hasil Akhir:

✅ **Tidak ada hardcoded URLs di code**  
✅ **Semua URLs dari environment variable**  
✅ **Mudah switch antara dev/staging/production**  
✅ **Code lebih clean dan maintainable**  
✅ **Ready untuk deployment**

---

## 📌 Notes:

- File `.env` sudah ada di `.gitignore` ✅
- File `.env.example` sebagai template ✅
- Semua pages sudah menggunakan config ✅
- Documentation sudah show URL yang benar ✅

**Konfigurasi sekarang sudah rapi dan professional!** 🎊
