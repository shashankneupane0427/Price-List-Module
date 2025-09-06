# Price List Management System

A full-stack **Price List Module** built with **React** for the frontend and **Fastify + PostgreSQL** for the backend. The application provides a responsive interface for managing product inventories with real-time data editing capabilities.

---

##  Project Structure

```
PRICE-LIST-MANAGEMENT
│
├─ backend/
│  ├─ models/
│  │  └─ Product.js
│  ├─ routes/
│  │  ├─ products.js
│  │  └─ languages.js
│  ├─ seeders/
│  │  └─ productSeeder.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ db.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
│
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ PriceList.jsx
│  │  └─ ProductRow.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ styles/
│  │  └─ main.css
│  ├─ App.jsx
│  └─ main.jsx
│
├─ public/
│  └─ data/
│     ├─ products.json
│     └─ example.json
│
├─ .env
├─ .gitignore
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

---

## Getting Started

### Frontend Setup


1. **Install dependencies:**

```bash
pnpm install
```

2. **Create/Update the `.env` file in the root folder:**

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

3. **Start the development server:**

```bash
pnpm run dev
```

5. **Open your browser and navigate to:**

```
http://localhost:5173
```

---

### Backend Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the backend folder:**

```env
DATABASE_URL=yourpgdatabaseurl
NODE_ENV=development
PORT=3001
```


4. **Start the development server:**

```bash
npm run dev
```

5. **Backend server will run at:**

```
http://localhost:3001
```

---

## Technology Stack

### Frontend
* **React**: 18.3.1
* **Vite**: 5.4.1 
* **ESLint**: 9.9.0

### Backend
* **Fastify**: 4.24.3 
* **Sequelize**: 6.35.0 
* **PostgreSQL**: Latest 
* **@fastify/cors**: 8.4.0 
* **dotenv**: 16.3.1 

### Development Tools
* **Node.js**: 18+ (Runtime)
* **pnpm**: Package manager (Frontend)
* **npm**: Package manager (Backend)
* **Nodemon**: Development server (Backend)

---
## Note

Due to **free Render account limitations**, the backend or database may take longer to respond when idle.
Free instances spin down with inactivity, which can delay requests by **50 seconds or more**.

---