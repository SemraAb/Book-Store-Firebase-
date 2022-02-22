import { ref, onValue, db } from './firebase.js'

let pass;
let user;

onValue(ref(db, "/admin"), (snapshot) => {
    let data = snapshot.val();

    if (data != undefined) {
        pass = data.password;
        user = data.username;
    }

    else {
        console.log("Error occurred");
    }
});

let login = () => {
    let userEntered = $("#username").val().trim();
    let passEntered = $("#password").val().trim();

    if (user == userEntered) {
        if (pass == passEntered) {
            window.localStorage.setItem("loggedin", true);
            setStatus("alert-danger", "alert-success", "<strong>Login successful</strong>");
            window.setTimeout(() => { window.location = "./admin.html" }, 800);
            return;
        }

        else {
            setStatus("alert-success", "alert-danger", "Unsuccessful! Check your <strong>password</strong> again");
            return;
        }
    }
    else {
        setStatus("alert-success", "alert-danger", "Unsuccessful! Check your <strong>username</strong> again");
        return;
    }
}


let setStatus = (before, actualStatus, message) => {
    // $("#status").empty();
    $("#status").removeClass(before);
    $("#status").addClass(actualStatus);
    $("#status").html(message);
}

window.onkeyup = (e) => {
    if (e.key == "Enter") {
        login();
    }
}

window.login = login;