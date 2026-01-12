# 🔍 Debug API Token - User Specific

## ❓ Masalah:

API Token di profile **HARUS spesifik per user** dari database:

- User A (email: userA@gmail.com) → API Token A
- User B (email: userB@gmail.com) → API Token B
- **BUKAN** dari environment variable

---

## ✅ Yang Sudah Dilakukan:

### **1. Frontend Sudah Benar:**

Profile page sudah mengambil API Key dari **user data**:

```typescript
const apiToken = computed(() => {
  // Ambil dari user.apiKeys[0].key
  if (user.value?.apiKeys && user.value.apiKeys.length > 0) {
    return user.value.apiKeys[0].key; // ✅ Dari database user
  }

  return "No API key available"; // Fallback jika tidak ada
});
```

### **2. Debug Logs Ditambahkan:**

Buka **Browser Console** (F12) dan lihat:

```
🔍 User data: { ... }
🔑 API Keys: [ { _id: "...", key: "...", createdAt: "..." } ]
✅ Using API Key from user data: YWJjZGVm...
```

Atau jika tidak ada:

```
⚠️ No API keys found, using fallback
```

---

## 🔧 Yang Perlu Dicek di Backend:

### **Backend HARUS Return `apiKeys`:**

#### **Endpoint: GET `/api/v1/auth/me`**

**Response yang BENAR:**

```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john.doe@gmail.com",
    "name": "John Doe",
    "photo": "https://...",
    "role": "user"
  },
  "apiKeys": [
    // ✅ INI HARUS ADA!
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "key": "YWJjZGVmZ2hpamts...", // API Token user ini
      "createdAt": "2024-01-13T01:30:00.000Z"
    }
  ]
}
```

**Response yang SALAH (tidak ada apiKeys):**

```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john.doe@gmail.com",
    "name": "John Doe",
    "photo": "https://..."
  }
  // ❌ apiKeys tidak ada!
}
```

---

## 🧪 Cara Debug:

### **Step 1: Buka Browser Console**

1. Login ke aplikasi
2. Buka halaman `/profile`
3. Press `F12` untuk buka Developer Tools
4. Klik tab **Console**

### **Step 2: Lihat Logs**

**Jika apiKeys ADA:**

```console
🔍 User data: {_id: "...", email: "...", apiKeys: Array(1)}
🔑 API Keys: [{_id: "...", key: "YWJjZGVm...", createdAt: "..."}]
✅ Using API Key from user data: YWJjZGVm...
```

→ **Profile akan tampil API Key yang benar** ✅

**Jika apiKeys TIDAK ADA:**

```console
🔍 User data: {_id: "...", email: "...", name: "..."}
🔑 API Keys: undefined
⚠️ No API keys found, using fallback
```

→ **Profile tampil: "No API key available"** ❌

### **Step 3: Check Network Tab**

1. Klik tab **Network** di Developer Tools
2. Filter: `me`
3. Klik request `auth/me`
4. Lihat **Response** tab
5. **Pastikan ada `apiKeys` array**

Contoh response yang benar:

```json
{
  "success": true,
  "user": { ... },
  "apiKeys": [ { "key": "..." } ]  // ✅ Harus ada ini
}
```

---

## 🔧 Fix di Backend (Jika `apiKeys` Tidak Ada):

### **Controller: `AuthController.getCurrentUser`**

Pastikan return apiKeys dari database:

```typescript
export class AuthController {
  static async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = req.user._id;

      // Get user
      const user = await User.findById(userId);

      // Get API keys untuk user ini
      const apiKeys = await ApiKey.find({ userId }); // ✅ Query apiKeys

      return res.json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          photo: user.photo,
          role: user.role,
        },
        apiKeys: apiKeys.map((key) => ({
          // ✅ Include apiKeys
          _id: key._id,
          key: key.key,
          createdAt: key.createdAt,
        })),
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
```

---

## 📊 Flow API Token per User:

```
User A Login (userA@gmail.com)
    ↓
Backend query database:
  - User data
  - API Keys WHERE userId = userA._id
    ↓
Response: {
  user: { ... },
  apiKeys: [
    { key: "TOKEN_A_123..." }  ← Token khusus User A
  ]
}
    ↓
Frontend save & display: TOKEN_A_123...
```

```
User B Login (userB@gmail.com)
    ↓
Backend query database:
  - User data
  - API Keys WHERE userId = userB._id
    ↓
Response: {
  user: { ... },
  apiKeys: [
    { key: "TOKEN_B_456..." }  ← Token khusus User B (BERBEDA!)
  ]
}
    ↓
Frontend save & display: TOKEN_B_456...
```

---

## ✅ Checklist:

- [ ] Backend endpoint `/api/v1/auth/me` return `apiKeys` array
- [ ] `apiKeys` berisi API key **spesifik user** dari database
- [ ] Bukan dari environment variable
- [ ] Console log tampil `apiKeys` array
- [ ] Profile page tampil API key yang benar
- [ ] User berbeda = API key berbeda

---

## 🎯 Testing:

### **Test 1: Login User A**

```
1. Login dengan email userA@gmail.com
2. Buka /profile
3. Lihat API Token
4. Copy token: TOKEN_A_123...
```

### **Test 2: Logout & Login User B**

```
1. Logout
2. Login dengan email userB@gmail.com
3. Buka /profile
4. Lihat API Token
5. Copy token: TOKEN_B_456...
```

### **Test 3: Verifikasi Berbeda**

```
✅ TOKEN_A_123... ≠ TOKEN_B_456...
✅ Setiap user punya token unik
```

---

## 💡 Jika Masih Tidak Muncul:

1. **Check console logs** - Lihat apakah `apiKeys` ada di user data
2. **Check Network tab** - Lihat response `/auth/me`
3. **Update backend** - Pastikan return `apiKeys` dari database
4. **Clear localStorage** - Logout & login ulang untuk refresh data

---

**Refresh halaman profile dan check browser console untuk lihat debug logs!** 🔍
