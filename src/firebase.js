// src/firebase.js — STONK Bank Firebase 연동
// Gacha/Arcade/Battle 과 동일한 Firebase 프로젝트를 쓴다 → 같은 uid · 같은 cash 를 공유한다.
// (별도 로그인 만들지 않음. Home/Battle 에서 만든 Auth 세션을 같은 origin 에서 그대로 사용.)
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase, ref, get, update, runTransaction, push,
  query, orderByKey, limitToLast,
} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyARFa-vzKVmIdxP5xDRXVzasL2ui94eZ-w",
  authDomain: "market-6e66a.firebaseapp.com",
  databaseURL: "https://market-6e66a-default-rtdb.firebaseio.com",
  projectId: "market-6e66a",
  storageBucket: "market-6e66a.firebasestorage.app",
  messagingSenderId: "402312269082",
  appId: "1:402312269082:web:cf304afc54057ea162b0a3",
};

export const isConfigured = Boolean(firebaseConfig.apiKey) && Boolean(firebaseConfig.databaseURL);

let app = null, auth = null, db = null;
export function getFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getDatabase(app);
  }
  return { app, auth, db };
}

// 현재 로그인 유저 1회 조회 (없으면 null). Bank 는 익명 로그인하지 않는다 — Home 세션이 있어야 한다.
export function getCurrentUserOnce() {
  const { auth } = getFirebase();
  return new Promise((resolve) => {
    let done = false;
    const unsub = onAuthStateChanged(auth, (u) => { if (done) return; done = true; unsub(); resolve(u || null); }, () => resolve(null));
    setTimeout(() => { if (!done) { done = true; resolve(auth.currentUser || null); } }, 4000);
  });
}

export { ref, get, update, runTransaction, push, query, orderByKey, limitToLast };
