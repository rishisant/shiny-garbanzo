// Author @rishisant
// Date: 2022-12-11

// Path: pos-sys/src/Home.js

// Contains functionality for raising and lowering the admin bar
export function raise_admin_bar() {
    var adminbar = document.getElementById("adminpanel");
    var is_raised = localStorage.getItem("raised");
    if (is_raised === "true") {
        // Lower the admin bar
        localStorage.setItem("raised", "false");
        adminbar.style.animation = "go_out 1s 1";
        setTimeout(function() {
            document.getElementById("adminpanel").style.visibility = "hidden";
        }, 1000);
    }
    else {
        // Raise the admin bar
        localStorage.setItem("raised", "true");
        adminbar.style.animation = "pop_out 1s 1";
        setTimeout(function() {
            document.getElementById("adminpanel").style.visibility = "visible";
        }, 1000);
    }
}

// export function alert_console() {
//     console.log("hello world\n");
// }
// raise_admin_bar()