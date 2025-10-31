# ☕ Coffe Shop 2.0

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

> Versão atualizada do **Coffe Shop**, desenvolvida com **Next.js**, **TypeScript**, **TailwindCSS** e **Firebase**.  
> Projeto em desenvolvimento, focado em criar uma plataforma moderna para exibição e gerenciamento de cafés.

---

## 🚀 Tecnologias

- **Next.js** — Framework React  
- **TypeScript** — Tipagem estática  
- **TailwindCSS** — Estilização moderna  
- **Firebase** — Autenticação e banco de dados  
- **Git/GitHub** — Versionamento  

---

## ⚙️ Funcionalidades

- [x] Interface base com Next.js  
- [x] Login e cadastro com Firebase  
- [x] Firestore para armazenamento de cafés  
- [ ] Checkout e painel administrativo (em andamento)

---

## 🔥 Configuração do Firebase


// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
🧰 Como Rodar o Projeto
bash
Copiar código
# Clone o repositório
git clone https://github.com/esdrasbdev/Coffe-Shop-2.0.git

# Acesse a pasta
cd Coffe-Shop-2.0

# Instale as dependências
npm install

# Execute o servidor local
npm run dev
Acesse: http://localhost:3000





