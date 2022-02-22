//@ts-check

import { onValue, ref, db } from '../admin/assets/js/firebase.js';

onValue(ref(db, "/books"), (snapshot) => {
    document.getElementById("bookNum").innerText = Object.keys(snapshot.val()).length.toString();
});

onValue(ref(db, "/categories"), (snapshot) => {
    document.getElementById("types").innerText = Object.keys(snapshot.val()).length.toString();
});

onValue(ref(db, "/joinedUsers"), (snapshot) => {
    document.getElementById("users").innerText = Object.keys(snapshot.val()).length.toString();
});