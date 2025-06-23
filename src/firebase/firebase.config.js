// ✅ src/firebase/firebase.config.js

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_BJan7FaUQ7XsxOPS1k08WWQz8J92Gss",
  authDomain: "eativana-e2479.firebaseapp.com",
  projectId: "eativana-e2479",
  storageBucket: "eativana-e2479.appspot.com", // ❗️এখানে `.app` না হয়ে `.com` হবে
  messagingSenderId: "693406835854",
  appId: "1:693406835854:web:c7688fc660c4147d4155df",
  measurementId: "G-E8S5VT52KD",
};

export const app = initializeApp(firebaseConfig); // ✅ only export app
