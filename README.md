# Monorepo Aplikasi NoteKeepMe

## SETUP Monorepo

1. Membuat folder Project = NoteMe(sesuaikan namanya)

```bash
mkdir noteme && cd noteme
```

2. Inisiasi root project

```bash
npm init -y
```

\*Opsional untuk menjalankan project secara bersamaan menggunakan package Concurrently

```bash
npm install -D concurrently
```

3. Membuat folder monorepo

```bash
mkdir backend frontend
```

\*\* Sebelum lanjut inisiasi backend dan frontend pastikan package.json di root project:

```json
{
  "name": "nama_project",
  "private": true,
  "workspaces": ["backend", "frontend"]
}
```

4. Inisiasi Backend (sesuaikan dengan kebutuhan)
   backend/
   │
   ├── data/
   │ └── notes.json
   │
   ├── src/
   │ ├── controllers/
   │ ├── models/
   │ ├── services/
   │ ├── routes/
   │ ├── middleware/
   │ ├── lib/
   │ ├── app.js
   │ └── server.js
   │
   ├── package.json
   └── .gitignore

- inisiasi dulu

```bash
cd backend
npm init -y
```

- Install ExpressJs
  kembali ke root project dan install dengan perintah:

```bash
cd ..
npm install express cors -w backend
```

5. Buat struktur folder backend (sesuaikan dengan kebutuhan)

```bash
cd backend
mkdir -p src/{controllers,models,services,routes,middleware,lib}
mkdir data
touch data/notes.json
touch src/app.js
touch src/server.js
```

7. Inisiasi Frontend
   Pastikan kamu berada di folder root project (NoteMe).

- buat project React ViteJS

```bash
npm create vite@latest frontend -- --template react
```

jalankan di root project setelah install vite selesai :

```bash
npm install
```

- install taiwindcss

```bash
npm install tailwindcss @tailwindcss/vite -w frontend
```

8. Edit script package.json root project (sesuaikan dengan milikmu)

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

9. Package json backend

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

10. Package json Frontend

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
