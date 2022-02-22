//@ts-check

import { ref, db, set, push, onValue, remove } from './firebase.js';
let data;
onValue(ref(db, "/books"), (snapshot) => {
    data = snapshot.val();
    let num = 0;
    $("#table-body").empty();
    for (let book of Object.entries(data)) {
        num++;
        $("#table-body").append(setBookFromSearch(num, book[1].name, book[1].author, book[1].type, book[1].publishDate, book[0]));
    }
});

let setBookFromSearch = (num, bookName, author, category, pubdate, bookID) => {

    // let data = snapshot.val();
    // let num = 1;
    let tr = $("<tr>");
    let head = $("<th scope='row'>" + num + "</th>");
    let td1 = $("<td>" + bookName + "</td>");
    let td2 = $("<td>" + author + "</td>");
    let td3 = $("<td>" + category + "</td>");
    let td4 = $("<td>" + pubdate + "</td>");
    let removeButton = $("<td><button class='rounded' id='removeButton' data-id='" + bookID + "' onclick='deleteBook(this)'>Remove Book</button></td>");

    tr.append(head, td1, td2, td3, td4, removeButton);
    // $("#table-body").append(tr);
    // num++;

    return tr;
}


function deleteBook(element) {
    if (confirm("Book will be deleted permanently. Continue?")) {
        remove(ref(db, "/books/" + $(element).data("id")));
    }
}

window.onkeyup = () => {
    let search = $("#searchingFor").val();
    $("#table-body").empty();
    let num = 0;
    Object.entries(data).filter((book) => book[1].name.toLowerCase().includes(search.toLowerCase())).map((book) => { $("#table-body").append(setBookFromSearch(++num, book[1].name, book[1].author, book[1].type, book[1].publishDate, book[0])) });
}

//@ts-ignore
window.deleteBook = deleteBook;

//@ts-ignore
// window.search = search;