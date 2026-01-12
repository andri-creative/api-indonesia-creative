# Setup Login dengan Google OAuth

## Langkah-langkah Setup

### 1. **Setup Environment Variables**

Buat file `.env` di root folder nuxt-app dengan meng-copy dari `.env.example`:

```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan URL backend API:

```env
# Untuk development lokal
NUXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Untuk production (ganti dengan URL backend Anda)
# NUXT_PUBLIC_API_BASE_URL=https://your-api.com
```

### 2. **Setup Backend API**

Pastikan backend Express API Anda sudah memiliki endpoint berikut:

#### a. **Google OAuth Login Endpoint**

```
GET /auth/google?callbackUrl={url}
```

- Redirect user ke Google OAuth
- Setelah berhasil, redirect kembali ke `callbackUrl` dengan query params:
  - `token`: JWT token
  - `user`: JSON string dari user data (id, email, name, photo)

Contoh callback URL:

```
http://localhost:3000/auth/callback?token=xxx&user={"id":"123","email":"user@example.com","name":"User Name","photo":"https://..."}
```

#### b. **Get Current User Endpoint**

```
GET /auth/me
```

Response:

```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name",
    "photo": "https://..."
  }
}
```

atau jika tidak login:

```json
{
  "user": null
}
```

#### c. **Logout Endpoint**

```
POST /auth/logout
```

Response:

```json
{
  "success": true
}
```

### 3. **Cara Login Bekerja**

1. User klik tombol "Login with Google" di Navbar atau LoginModal
2. Function `loginWithGoogle()` redirect ke backend: `{API_BASE_URL}/auth/google`
3. Backend redirect ke Google OAuth
4. User login di Google
5. Google redirect kembali ke backend Anda
6. Backend redirect ke frontend: `/auth/callback?token=xxx&user={...}`
7. Halaman callback menyimpan user data dan token ke state + localStorage
8. User di-redirect ke homepage dalam kondisi sudah login

### 4. **Testing**

Untuk testing tanpa backend yang lengkap, Anda bisa:

1. **Simulasi login manual** di browser console:

```javascript
// Buka browser console dan jalankan:
const mockUser = {
  id: "123",
  email: "test@example.com",
  name: "Test User",
  photo: "https://via.placeholder.com/150",
};

// Save to localStorage
localStorage.setItem("auth:user", JSON.stringify(mockUser));

// Reload halaman
location.reload();
```

2. **Test logout**:

```javascript
// Di browser console:
localStorage.removeItem("auth:user");
location.reload();
```

## Troubleshooting

### Login tidak muncul setelah klik tombol

- Pastikan backend berjalan di `http://localhost:5000` atau sesuaikan `NUXT_PUBLIC_API_BASE_URL`
- Cek console browser untuk error

### User tidak tetap login setelah refresh

- Cek localStorage di DevTools > Application > Local Storage
- Pastikan key `auth:user` ada dan berisi data user

### Error CORS

- Pastikan backend sudah setup CORS dengan benar
- Allow origin dari `http://localhost:3000` (atau domain frontend Anda)
- Allow credentials: `credentials: 'include'`

## File-file yang Relevan

- **`app/composables/useAuth.ts`** - Auth state management
- **`app/plugins/auth.ts`** - Auth plugin & route guard
- **`app/pages/auth/callback.vue`** - OAuth callback handler
- **`app/components/Navbar.vue`** - Login button & user menu
- **`app/components/LoginModal.vue`** - Login modal (opsional)
- **`nuxt.config.ts`** - Runtime config untuk API URL
