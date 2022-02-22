//@ts-check

import { ref, db, set, push, onValue, remove } from './firebase.js';


var clicks = 0;
$("#toggle").on("click", function () {
    clicks++
    if (clicks == 1 || clicks % 2 == 1) {
        $("#navbar").hide();
        $("#useless").hide();
        $("#home").removeClass("col-9");
        $("#home").addClass("col-12");
    } else {
        $("#navbar").show();
        $("#useless").show();
        $("#home").removeClass("col-12");
        $("#home").addClass("col-9");
    }
});


/**
 * Checks if the user logged in in the current session
 * if not: redirects the user to the login page
 */

let loggedIn = !(window.localStorage.getItem("loggedin") == null);

let isNew = false;

if (!loggedIn) {
    window.location.replace("./login.html");
}

let logout = () => {
    window.localStorage.removeItem("loggedin");
    window.location.replace("./login.html");
}

$("#isNew").on('click', () => {
    if (isNew) {
        isNew = false;
    }
    else {
        isNew = true;
    }
});


/**
 * Adds book type to the list
 */

$("#addType").on('click', () => {
    let type = $("#type").val();
    if (type != "") {
        let typePush = push(ref(db, "/categories"));
        set(typePush, {
            type
        });
        $("#type").val("")
    }
});


/**
 * Adds book to the database
 */
$("#addButton").on('click', () => {
    let bookBranch = ref(db, "/books");
    let bookPush = push(bookBranch);

    let name = $("#bookName").val().toString().trim();
    let author = $("#authorName").val().toString().trim();
    let imageUrl = $("#imageURL").val().toString().trim();
    let description = $("#description").val().toString().trim();
    let publishDate = $("#pubDate").val();
    let type = $("#bookType").val();

    if (name != "" && author != "" && imageUrl != "" && description != "") {
        $("#bookName").val("");
        $("#authorName").val("");
        $("#imageURL").val("");
        $("#description").val("");
        $("#pubDate").val("");
        $("#added-danger").hide();
        $("#added-success").show();
        set(bookPush, {
            name,
            author,
            imageUrl,
            description,
            publishDate,
            type,
            isNew
        });
        setTimeout(() => { $("#added-success").hide() }, 2300);
    }
    else {
        $("#added-danger").show();
        $("#added-success").hide();
        setTimeout(() => { $("#added-danger").hide() }, 2300);
    }

});

/**
 * Changes about part of the store in firebase
 */
let changeAbout = () => {
    let header = $("#aboutHeader").val();
    let url = $("#bookImageUrl").val();
    let about = $("#aboutBody").val();

    if (header != "" && url != "" && about != "") {
        $("#aboutHeader").val("");
        $("#aboutBody").val("");
        $("#bookImageUrl").val("");

        set(ref(db, "/about"), {
            header,
            url,
            about
        });

        $("#about-danger").hide();
        $("#about-success").show();
        setTimeout(() => { $("#about-success").hide() }, 2300);
    }

    else {
        $("#about-danger").show();
        $("#about-success").hide();
        setTimeout(() => { $("#about-danger").hide() }, 2300);
    }

}

/**
 * Searching part of the admin page
 */

let snap;
let couldBeRemoved = [];
let found = false;

jQuery(() => {
    onValue(ref(db, "/books"), (snapshot) => {
        snap = snapshot;
    });
});

/**
 * Deletes the user that joined
 */

let removeUser = (user) => {
    if (confirm("Selected user will be deleted permanently. Continue?")) {
        let userId = $(user).data("id");
        remove(ref(db, "/joinedUsers/" + userId));
    }
}

/**
 * Deletes the user that Contacted
 */

let removeContact = (user) => {
    if (confirm("Selected user will be deleted permanently. Continue?")) {
        let userId = $(user).data("id");
        remove(ref(db, "/contact/" + userId));
    }
}
/**
 * onValue method for join.html file
 */

// # 	Full Name 	Address 	Email Address 	Phone Number


onValue(ref(db, "/joinedUsers"), (snapshot) => {
    let data = snapshot.val();
    let num = 1;
    $("#table-body").empty();
    for (let user of Object.entries(data)) {
        let tr = $("<tr>");
        let head = $("<th scope='row'>" + num + "</th>");
        let td1 = $("<td>" + user[1].fullName + "</td>");
        let td2 = $("<td>" + user[1].email + "</td>");
        let removeButton = $("<td><button class='rounded' id='removeButton' data-id='" + user[0] + "' onclick='removeUser(this)'>Remove User</button></td>");

        tr.append(head, td1, td2, removeButton);
        $("#table-body").append(tr);
        num++;
    }
});


/**
 * onValue method for contact.html file
 */

onValue(ref(db, "/contact"), (snapshot) => {
    let data = snapshot.val();
    let num = 1;
    $("#contact-table").empty();
    for (let user of Object.entries(data)) {
        let tr = $("<tr>");
        let head = $("<th scope='row'>" + num + "</th>");
        let td1 = $("<td>" + user[1].fullName + "</td>");
        let td2 = $("<td>" + user[1].address + "</td>");
        let td3 = $("<td>" + user[1].email + "</td>");
        let td4 = $("<td>" + user[1].phone + "</td>");
        let removeButton = $("<td><button class='rounded' id='removeButton' data-id='" + user[0] + "' onclick='removeContact(this)'>Remove User</button></td>");

        tr.append(head, td1, td2, td3, td4, removeButton);
        $("#contact-table").append(tr);
        num++;
    }
});

onValue(ref(db, "/categories"), (snapshot) => {
    let data = snapshot.val();
    for (let type of Object.entries(data)) {
        $("#bookType").append($("<option selected value=" + type[1].type + ">" + type[1].type + "</option>"));
    }
});


function deleteBook(element) {
    if (confirm("Book will be deleted permanently. Continue?")) {
        remove(ref(db, "/books/" + $(element).data("id")));
    }
}

//@ts-ignore
window.logout = logout;

//@ts-ignore
window.changeAbout = changeAbout;

//@ts-ignore
window.removeUser = removeUser;

//@ts-ignore
window.removeContact = removeContact;

//@ts-ignore
window.deleteBook = deleteBook;