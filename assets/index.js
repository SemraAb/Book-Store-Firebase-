// @ts-check


import { ref, db, set, push, onValue, remove } from '../admin/assets/js/firebase.js';
// import { sort } from "./catalog.js"

// let snap;

// let bookFound = false;
// onValue(ref(db, "/books"), (snapshot) => {
//     snap = snapshot;
// });



$("#sendButton").on('click', () => {

    let name = $("#name").val();

    let address = $("#address").val();

    let email = $("#email").val();

    let number = $("#number").val();

    if (name != "" && address != "" && email != "" && number != "") {
        $("#contact-error").hide();
        $("#contact-success").show();
        let userPush = push(ref(db, "/contact"));
        set(userPush, {
            address,
            email,
            fullName: name,
            phone: number
        });

        $("#name").val("");
        $("#address").val("");
        $("#email").val("");
        $("#number").val("");
        setTimeout(() => $("#contact-success").hide(), 2000)
    }

    else {
        $("#contact-success").hide();
        $("#contact-error").show();
        setTimeout(() => $("#contact-error").hide(), 2000);
    }
});

$("#joinBookBtn").on("click", () => {
    let name = $("#joinBookFullName").val();

    let email = $("#joinBookEmail").val();

    if (name != "" && email != "") {
        $("#join-error").hide();
        $("#join-success").show();
        setTimeout(() => $("#join-success").hide(), 2000);
        let joinPush = push(ref(db, "/joinedUsers"));
        set(joinPush, {
            fullName: name,
            email
        });

        $("#joinBookFullName").val("");

        $("#joinBookEmail").val("");
    }

    else {
        $("#join-success").hide();
        $("#join-error").show();
        setTimeout(() => $("#join-error").hide(), 2000);
    }
});

/**
 * For dynamic about page
 */

onValue(ref(db, "/about"), (snapshot) => {
    let data = snapshot.val();

    $("#header").text(data.header);

    $("#about").text(data.about);

    $("#loading").hide();
    $("#bookImage").attr('src', data.url)
    $("#bookImage").show();
});

/**
 * For dynamic home page
 */

let goToCatalog = (category) => {
    window.location.replace("./catalog.html");
    window.localStorage.setItem("sort", category);
}

onValue(ref(db, "/categories"), (snapshot) => {

    $("#catalog-home-list").empty();
    let data = snapshot.val();

    for (var type of Object.entries(data)) {

        let div1 = $("<div class='col-md-4 mb-4'>");
        div1.attr('onclick', "goToCatalog('" + type[1].type + "')");

        let div2 = $("<div class='card shadow cursor-pointer py-3'></div>");

        let div3 = $("<div class='card-body'>");

        let h4 = $("<h4 class='card-title m-0 text-center h5 font-weight-bold'>" + type[1].type + "</h4>");

        div1.append(div2);
        div2.append(div3);
        div3.append(h4);


        $("#catalog-home-list").append(div1);
    }
});

onValue(ref(db, "/aboutHome"), (snapshot) => {

    $("#homeAbout").empty();
    let data = snapshot.val();
    for (var numbers of Object.entries(data)) {

        let div1 = $("<div class='col-md-3 col-12' id='category'>");

        let div2 = $("<div class='d-flex align-items-center'>");

        let div3 = $("<div class='display-4 font-weight-bolder mr-4'>" + numbers[1] + "</div>");

        let div4 = $("<div class='h6'>" + numbers[0] + "</div>");

        div1.append(div2);
        div2.append(div3, div4);


        $("#homeAbout").append(div1);
    }
});

let unsetStatus = () => {
    $(".alert-success").hide();
    $(".alert-danger").hide();
}

//@ts-ignore
window.goToCatalog = goToCatalog;

//@ts-ignore
window.unsetStatus = unsetStatus;

//@ts-ignore
// window.sort = sort;

//@ts-ignore
// window.readMore = readMore;