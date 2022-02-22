//@ts-check

import { ref, db, onValue, remove } from '../js/firebase.js';

let bookFound = false;
let books;

onValue(ref(db, "/books"), (snapshot) => {
    setTimeout(() => { books = Object.entries(snapshot.val()); console.log("Ready") }, 1000);
});

let search = () => {
    $("#resultContainer").empty();
    let searchedFor = $("#searchingFor").val();
    // @ts-ignore
    let filtered = books.filter((book) => book[1].name.toLowerCase().includes(searchedFor.toLowerCase()));

    filtered.map(book => setBookFromSearch(book[1].name, book[1].description, book[1].imageUrl, book[1].publishDate, book[0]));

    if ($("#resultContainer").html() == "") {
        console.log("No book");
        let p = $("<p class='text-center'>Sorry, no book found</p>");
        // p.attr("id", "notFound");
        $("#resultContainer").append(p);
    }
}

$("#searchButton").on('click', search);



let setBookFromSearch = (bookName, description, imageUrl, pubdate, ID) => {
    let mainDiv = $("<div class='card mb-3 mt-3' style='max-width: 540px;'>");
    let secondaryDiv = $("<div class='row g-0'>");
    let imgDiv = $("<div class='col-md-4 d-flex'>");
    let img = $("<img src='" + imageUrl + "' class='img-fluid rounded-start' alt='Book Cover'>");

    let cardBodyContainer = $("<div class='col-md-8'>");
    let cardBody = $("<div class='card-body'>");
    let h5 = $("<h5 class='card-title'>" + bookName + "</h5>");
    let desc = $("<p class='card-text' id='description'>" + description + "</p>");
    let pubDate = $("<p class='card-text'><small class='text-muted'>Publish date: <strong>" + pubdate + "</strong></small></p>");

    let removeButton = ('<button data-id="' + ID + '" onclick="removeBook(this)" class="btn-primary">Remove book</button>')
    mainDiv.append(secondaryDiv);
    secondaryDiv.append(imgDiv, cardBodyContainer);
    imgDiv.append(img);
    cardBodyContainer.append(cardBody);
    cardBody.append(h5, desc, pubDate, removeButton);
    $("#resultContainer").append(mainDiv);
}


let removeBook = (element) => {
    if (confirm("THe book will be deleted permanently. Continue?")) {
        remove(ref(db, "/books/" + $(element).data("id")));
    }
}

//@ts-ignore
window.removeBook = removeBook;

//@ts-ignore
window.search = search;