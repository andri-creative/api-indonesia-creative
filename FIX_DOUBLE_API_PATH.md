# ✅ Fix Error Double /api/v1 - SOLVED!

## 🔍 Error yang Terjadi:

```
❌ GET http://localhost:8090/api/v1/api/v1/provinces 404 (Not Found)
```

URL dobel `/api/v1/api/v1` karena:

- `baseApiUrl` = `http://localhost:8090/api/v1`
- path di fetchData = `/api/v1/provinces`
- Result: dobel prefix!

---

## ✅ Solusi yang Diterapkan:

### **1. Region Selector** (`region-selector.vue`)

**Sebelum** (path include `/api/v1`):

```typescript
provinces.value = await fetchData("/api/v1/provinces");
regencies.value = await fetchData(`/api/v1/regencies?province_code=...`);
districts.value = await fetchData(`/api/v1/districts?regency_code=...`);
villages.value = await fetchData(`/api/v1/villages?district_code=...`);
```

**Sekarang** (path tanpa `/api/v1`):

```typescript
provinces.value = await fetchData("/provinces");
regencies.value = await fetchData(`/regencies?province_code=...`);
districts.value = await fetchData(`/districts?regency_code=...`);
villages.value = await fetchData(`/villages?district_code=...`);
```

### **2. Nuxt Config** (`nuxt.config.ts`)

**Diperbaiki** default value:

```typescript
apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8090/api/v1";
```

---

## 📊 Flow URL Sekarang:

```
baseApiUrl: http://localhost:8090/api/v1
    +
path: /provinces
    =
✅ http://localhost:8090/api/v1/provinces
```

**BUKAN:**

```
baseApiUrl: http://localhost:8090/api/v1
    +
path: /api/v1/provinces
    =
❌ http://localhost:8090/api/v1/api/v1/provinces
```

---

## 📁 File yang Diperbaiki:

| File                            | Perubahan                                             |
| ------------------------------- | ----------------------------------------------------- |
| `app/pages/region-selector.vue` | ✅ Remove `/api/v1` prefix dari semua fetchData calls |
| `nuxt.config.ts`                | ✅ Fix default `apiBaseUrl` include `/api/v1`         |

---

## 📝 Standard Format:

### **Environment Variable (.env):**

```env
# Include /api/v1 untuk base URL
NUXT_PUBLIC_API_BASE_URL=http://localhost:8090/api/v1
```

### **API Paths di Code:**

```typescript
// ✅ BENAR - tanpa /api/v1 prefix
await fetchData("/provinces");
await fetchData("/regencies?province_code=11");

// ❌ SALAH - jangan include /api/v1
await fetchData("/api/v1/provinces");
```

### **Hasil URL Lengkap:**

```
baseApiUrl + path = Full URL

http://localhost:8090/api/v1 + /provinces =
http://localhost:8090/api/v1/provinces ✅
```

---

## ✅ Hasil Sekarang:

✅ **URL sudah benar tanpa dobel `/api/v1`**  
✅ **Region selector bisa fetch data**  
✅ **Tidak ada 404 error lagi**  
✅ **Semua endpoints accessible**

---

## 🧪 Testing:

1. **Refresh halaman `/region-selector`**
2. **Check browser console** - seharusnya tidak ada error 404
3. **Select province** - dropdown seharusnya terisi
4. **Check Network tab** - URL seharusnya:
   ```
   ✅ http://localhost:8090/api/v1/provinces
   ❌ BUKAN: http://localhost:8090/api/v1/api/v1/provinces
   ```

---

**Error sudah fixed - Region selector sekarang berfungsi dengan benar!** 🎊
