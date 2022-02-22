import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getDatabase, ref, onValue, set, remove, push } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyCkoHALdWSNw9vSDqTne7GV6EEzV4Qnu1w",
  authDomain: "book-store-14c04.firebaseapp.com",
  databaseURL: "https://book-store-14c04-default-rtdb.firebaseio.com",
  projectId: "book-store-14c04",
  storageBucket: "book-store-14c04.appspot.com",
  messagingSenderId: "88223181911",
  appId: "1:88223181911:web:77a3a907ccdd2493630712",
  measurementId: "G-665HEHF9VW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  app,
  db,
  ref,
  onValue,
  set,
  remove,
  push
}