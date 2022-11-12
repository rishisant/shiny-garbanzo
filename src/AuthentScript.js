// Authentscript.js
// @author: @rishisant
// @date: 2022-12-11

var validusers = ["rishisanthanam", "mattjuntunen", "esbenegholm", "nayabrehmat"];
var validpass = ["529009921", "630007600", "228007063", "528000730"];

export function isValidManager() {
    var isvalid = false;

    var user_input = document.getElementById("username_field").value;
    var pass_input = document.getElementById("password_field").value;
    for (let i=0; i < validusers.length; ++i) {
        if (user_input === validusers[i] && pass_input === validpass[i]) {
            isvalid = true;
        }
    }
    if (isvalid) {
        console.log("Valid Manager");
        window.location.href = "/Manager";
    }
    else {
        console.log("Invalid Manager");
    }
}

export function isValidServer() {
    var isvalid = false;
    var user_input = document.getElementById("username_field").value;
    var pass_input = document.getElementById("password_field").value;
    for (let i=0; i < validusers.length; ++i) {
        if (user_input === validusers[i] && pass_input === validpass[i]) {
            isvalid = true;
        }
    }
    if (isvalid) {
        console.log("Valid Server");
        window.location.href = "/Server";
    }
    else {
        console.log("Invalid Server");
    }
}