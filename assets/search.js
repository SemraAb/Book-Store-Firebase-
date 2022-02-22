//@ts-check

import { ref, db, onValue } from '../admin/assets/js/firebase.js';
let books;

onValue(ref(db, "/books"), (snapshot) => {
    setTimeout(() => { books = Object.entries(snapshot.val()); console.log("Ready") }, 1000);
});

let search = () => {
    $("#resultContainer").empty();
    let searchedFor = $("#searchingFor").val();
    // @ts-ignore
    if (books == undefined) {
        $("#resultContainer").append("Plase try again in a second");
        return;
    }
    $("#resultContainer").empty();
    let filtered = books.filter((book) => book[1].name.toLowerCase().includes(searchedFor.toLowerCase()));

    filtered.map(book => setBookFromSearch(book[1].name, book[1].description, book[1].imageUrl, book[1].publishDate, book[0]));

    if ($("#resultContainer").html() == "") {
        $("#resultContainer").append(setBookFromSearch("Sorry", "No book found for your search", "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", "Please search later"));
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
    let desc = $("<p class='card-text'id='description'> " + description + "</p>");

    let readMore = ('<button data-id="' + ID + '" onclick="ReadMore(this)" class="btn-primary">Read More</button>')
    mainDiv.append(secondaryDiv);
    secondaryDiv.append(imgDiv, cardBodyContainer);
    imgDiv.append(img);
    cardBodyContainer.append(cardBody);
    cardBody.append(h5, desc);
    if (ID != undefined) {
        cardBody.append($("<p class='card-text'><small class='text-muted'>Publish date: <strong>" + pubdate + "</strong></small></p>"));
        cardBody.append(readMore);
    }
    $("#resultContainer").append(mainDiv);

    return mainDiv;
}

function ReadMore(element) {
    $("#read-more-main").empty();
    let ID = $(element).data("id");
    $("#main").hide();
    $(".col-md-4").hide();
    let bookData = books;
    for (let book of bookData) {
        $("#read-more-main").empty();

        if (book[0] === ID) {
            let bookHTML = '<div class="col-6 p-3" ><button onclick="ReadMoreQuit()" class="back-btn btn-primary"> <i class="fa fa-caret-left" aria-hidden="true"></i> Back </button><span class="year">' + book[1].publishDate + '</span> <h2>' + book[1].name + ' </h2> <h4>' + book[1].author + '</h4> <p>' + book[1].description + '</p>  </div><div class="col-5 "> <img src="' + book[1].imageUrl + '" class="img-fluid shadow rounded" alt=""> </div> ';
            $("#read-more-main").append($(bookHTML));
            break;
        }
    };
    ReadMoreQuit();
    $(".read-more-page").show();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 500);
}
function ReadMoreQuit() {

    $("#read-more-main .back-btn").on("click", function () {
        $(".col-md-4").css("display", "block");
        $("#main").css("display", "block");
        $(".read-more-page").css("display", "none");
    });
}

//@ts-ignore
window.ReadMore = ReadMore;

//@ts-ignore
window.ReadMoreQuit = ReadMoreQuit;