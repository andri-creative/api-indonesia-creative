# 🔧 Fix CORS Error

## Error yang Anda Alami:

```
Access to fetch at 'http://localhost:8090/api/v1/auth/me' from origin 'http://localhost:3000'
has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the
response must not be the wildcard '*' when the request's credentials mode is 'include'.
```

## Mengapa Terjadi?

Backend Anda menggunakan **wildcard `*`** untuk CORS origin, tapi frontend mengirim request dengan **`credentials: 'include'`** (untuk cookies/auth).

Browser **TIDAK MENGIZINKAN** kombinasi ini untuk alasan keamanan.

---

## ✅ Solusi: Update Backend CORS Configuration

### **Lokasi:** Backend Express API Anda (kemungkinan di `app.ts` atau `server.ts`)

### **Ganti dari:**

```javascript
// ❌ SALAH - Wildcard tidak boleh dengan credentials
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
```

### **Menjadi:**

#### **Opsi 1: Single Origin (Development)**

```javascript
// ✅ BENAR - Untuk development
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend Nuxt app URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

#### **Opsi 2: Multiple Origins (Development + Production)**

```javascript
// ✅ BENAR - Untuk development & production
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://your-domain.vercel.app", // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);
```

#### **Opsi 3: Environment Variable (Recommended)**

```javascript
// ✅ TERBAIK - Gunakan environment variable
const cors = require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

Lalu di `.env` backend:

```env
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.vercel.app
```

---

## 🔍 Checklist Setelah Update:

- [ ] Backend sudah restart setelah update CORS config
- [ ] Frontend bisa akses `http://localhost:8090/api/v1/auth/me` tanpa CORS error
- [ ] Tidak ada lagi error "wildcard '\*' when the request's credentials mode is 'include'"
- [ ] 401 error masih muncul (ini normal jika user belum login)

---

## 📝 Catatan Penting:

1. **401 Unauthorized itu NORMAL** jika user belum login. Ini bukan error!
2. **CORS harus di-fix di BACKEND**, tidak bisa di frontend
3. **Jangan gunakan CORS wildcard `*`** jika menggunakan cookies/credentials
4. **Restart backend** setelah mengubah konfigurasi CORS

---

## 🧪 Testing

Setelah fix CORS, error di browser console harusnya hilang.

Untuk test login:

1. Klik tombol "Login" di Navbar
2. Seharusnya redirect ke Google OAuth (jika endpoint sudah siap)
3. Atau test manual dengan localStorage (lihat LOGIN_SETUP.md)

---

## ❓ Masih Error?

Jika masih error setelah fix CORS, cek:

1. **Backend sudah restart?**
2. **Port backend benar?** (8090 sesuai config)
3. **CORS middleware dipasang SEBELUM routes?**

   ```javascript
   // ✅ BENAR - CORS sebelum routes
   app.use(cors({ ... }));
   app.use('/api/v1', routes);

   // ❌ SALAH - Routes sebelum CORS
   app.use('/api/v1', routes);
   app.use(cors({ ... }));
   ```
