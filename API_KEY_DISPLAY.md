# ✅ API Key Display - Lengkap!

## 🎯 Perubahan:

Sebelumnya, halaman profile menampilkan **JWT token login**. Sekarang menampilkan **API Key dari backend** (`apiKeys[0].key`).

---

## 📊 Backend Response:

Backend Anda mengembalikan data lengkap dengan `apiKeys`:

```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john.doe@gmail.com",
    "name": "John Doe",
    "photo": "https://lh3.googleusercontent.com/...",
    "role": "user"
  },
  "apiKeys": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "key": "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2hpamtsbW5vcA==",
      "createdAt": "2024-01-13T01:30:00.000Z"
    }
  ]
}
```

---

## 🔧 Yang Sudah Diupdate:

### **1. User Interface (`useAuth.ts`)**

Tambah tipe data untuk `ApiKey` dan `apiKeys` di User:

```typescript
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
  apiKeys?: ApiKey[]; // ✅ Tambahan ini
}
```

### **2. Profile Page (`profile.vue`)**

**SEBELUM** (tampil JWT token):

```typescript
const apiToken = computed(() => {
  return localStorage.getItem("auth:token") || "No token";
});
```

**SEKARANG** (tampil API key dari backend):

```typescript
const apiToken = computed(() => {
  // Gunakan API key dari user data
  if (user.value?.apiKeys && user.value.apiKeys.length > 0) {
    return user.value.apiKeys[0].key; // ✅ API Key dari backend
  }

  return "No API key available";
});
```

---

## 📋 Penjelasan:

| Item                 | Sebelum                                   | Sekarang                                      |
| -------------------- | ----------------------------------------- | --------------------------------------------- |
| **Yang ditampilkan** | JWT Token (untuk login)                   | API Key (untuk akses API)                     |
| **Sumber data**      | `localStorage.getItem("auth:token")`      | `user.apiKeys[0].key`                         |
| **Fungsi**           | Authentication token                      | API access key                                |
| **Format**           | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | `YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0...` |

---

## 🎨 Tampilan di Profile:

```
┌──────────────────────────────────┐
│  My Profile                      │
│                                  │
│  ┌──┐  John Doe                 │
│  │😊│  john.doe@gmail.com       │
│  └──┘  ✓ Active                 │
│                                  │
│  🔑 API Token                   │
│  ┌────────────────────────────┐ │
│  │ YWJjZGVmZ2hpamtsb...       │ │  ← API Key (bukan JWT!)
│  │                     [Copy] │ │
│  └────────────────────────────┘ │
│                                  │
│  ⚠️ Keep your token secure.     │
│  Never share it with anyone.    │
└──────────────────────────────────┘
```

---

## 🧪 Testing:

### **1. Login dengan Google OAuth:**

```
1. Buka http://localhost:3000
2. Klik "Login with Google"
3. Login dengan Google account
4. Redirect ke /profile
```

### **2. Check API Token di Profile:**

```
✅ Tampil API Key (format base64)
✅ BUKAN tampil JWT token
✅ Copy button berfungsi
```

### **3. Multiple API Keys:**

Jika user punya multiple API keys, yang ditampilkan adalah `apiKeys[0]` (API key pertama).

Untuk tampilkan semua API keys, bisa ditambahkan list:

```vue
<div v-for="apiKey in user.apiKeys" :key="apiKey._id">
  {{ apiKey.key }}
  <small>Created: {{ apiKey.createdAt }}</small>
</div>
```

---

## 📁 File yang Diupdate:

| File                         | Perubahan                                             |
| ---------------------------- | ----------------------------------------------------- |
| `app/composables/useAuth.ts` | ✅ Tambah `ApiKey` interface & `apiKeys` ke User      |
| `app/pages/profile.vue`      | ✅ Display `user.apiKeys[0].key` instead of JWT token |

---

## 🔍 Perbedaan JWT Token vs API Key:

### **JWT Token (Login):**

- **Fungsi:** Authentication (login session)
- **Lokasi:** `localStorage.getItem("auth:token")`
- **Digunakan untuk:** Authorization header saat call `/auth/me`
- **Format:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Expired:** Ya (punya expiration time)

### **API Key (Access):**

- **Fungsi:** API access untuk aplikasi/service
- **Lokasi:** `user.apiKeys[0].key`
- **Digunakan untuk:** Call API endpoints (provinces, cities, etc)
- **Format:** Base64 string `YWJjZGVmZ2hpamtsb...`
- **Expired:** Tergantung backend logic

---

## ✅ Hasil Akhir:

✅ **Profile page tampil API Key** (bukan JWT token)  
✅ **API Key dari backend** (`apiKeys[0].key`)  
✅ **User bisa copy API Key** untuk digunakan di aplikasi  
✅ **Interface mendukung multiple API keys**

---

## 💡 Next Steps (Optional):

### **Tampilkan Semua API Keys:**

```vue
<div class="space-y-2">
  <div v-for="(apiKey, index) in user.apiKeys" :key="apiKey._id" class="...">
    <h4>API Key {{ index + 1 }}</h4>
    <code>{{ apiKey.key }}</code>
    <small>Created: {{ new Date(apiKey.createdAt).toLocaleDateString() }}</small>
  </div>
</div>
```

### **Button Generate New API Key:**

```vue
<button @click="generateNewApiKey" class="...">
  Generate New API Key
</button>
```

**Sekarang API Key sudah ditampilkan dengan benar!** 🎉
