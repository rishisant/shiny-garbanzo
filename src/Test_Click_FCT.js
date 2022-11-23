
export function changeHTML() {
    var grabbed_text = document.getElementById("grab").innerHTML;
    var display = document.getElementById("display");

    display.innerHTML += grabbed_text;
}