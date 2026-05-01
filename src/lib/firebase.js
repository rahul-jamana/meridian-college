import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAprAPJ7kZQiIbzpi6M5I25Fr9tphUhRU",
  authDomain: "meridian-42058.firebaseapp.com",
  databaseURL: "https://meridian-42058-default-rtdb.firebaseio.com",
  projectId: "meridian-42058",
  storageBucket: "meridian-42058.firebasestorage.app",
  messagingSenderId: "1023325132914",
  appId: "1:1023325132914:web:1f3ca55ee8452a68f10aeb"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export { ref, set, get, child };
