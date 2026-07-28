# Monorepo Aplikasi NoteKeepMe

## Setup Monorepo

### 1. Membuat Folder Project

Buat folder project sesuai nama yang diinginkan, misalnya **NoteMe**.

```bash
mkdir noteme && cd noteme
```

---

### 2. Inisialisasi Root Project

```bash
npm init -y
```

> **Opsional:** Install package `concurrently` untuk menjalankan backend dan frontend secara bersamaan.

```bash
npm install -D concurrently
```

---

### 3. Membuat Struktur Monorepo

```bash
mkdir backend frontend
```

Sebelum melanjutkan ke inisialisasi backend dan frontend, pastikan `package.json` pada root project memiliki konfigurasi berikut:

```json
{
  "name": "nama_project",
  "private": true,
  "workspaces": ["backend", "frontend"]
}
```

---

### 4. Inisialisasi Backend

Struktur folder backend:

```text
backend/
│
├── data/
│   └── notes.json
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   ├── app.js
│   └── server.js
│
├── package.json
└── .gitignore
```

Masuk ke folder backend dan lakukan inisialisasi project.

```bash
cd backend
npm init -y
```

Kembali ke root project, lalu install Express.js dan CORS ke workspace backend.

```bash
cd ..
npm install express cors -w backend
```

---

### 5. Membuat Struktur Folder Backend

Masuk kembali ke folder backend.

```bash
cd backend
```

Buat struktur folder berikut.

```bash
mkdir -p src/{controllers,models,services,routes,middleware,lib}
mkdir data
touch data/notes.json
touch src/app.js
touch src/server.js
```

---

### 6. Inisialisasi Frontend

Pastikan berada di folder root project (`NoteMe`).

Buat project React menggunakan Vite.

```bash
npm create vite@latest frontend -- --template react
```

Setelah proses selesai, install seluruh dependency.

```bash
npm install
```

Install Tailwind CSS pada workspace frontend.

```bash
npm install tailwindcss @tailwindcss/vite -w frontend
```

---

### 7. Konfigurasi `package.json` Root Project

Sesuaikan isi `package.json` pada root project seperti berikut.

```json
{
  "name": "noteme",
  "private": true,
  "workspaces": ["backend", "frontend"],
  "scripts": {
    "dev": "concurrently \"npm run dev -w backend\" \"npm run dev -w frontend\"",
    "backend": "npm run dev -w backend",
    "frontend": "npm run dev -w frontend"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

---

### 8. Konfigurasi `package.json` Backend

```json
{
  "name": "@noteme/backend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

---

### 9. Konfigurasi `package.json` Frontend

```json
{
  "name": "@noteme/frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
