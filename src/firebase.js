import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyDGXfjn_Tmzark8V3QHpfvelrUjDGZYRQo",
    authDomain: "bookspasske.firebaseapp.com",
    projectId: "bookspasske",
    storageBucket: "bookspasske.appspot.com",
    messagingSenderId: "1092686987466",
    appId: "1:1092686987466:web:2fec2f3c6835378b6df433",
    measurementId: "G-T553F7XRCX"
};

// Инициализация приложения
const app = initializeApp(firebaseConfig);

// Экспорт Firestore
export const db = getFirestore(app);
