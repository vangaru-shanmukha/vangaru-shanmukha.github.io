var button = document.getElementById("btn");
window.onscroll = function() {
    scrollFunction()
};
function scrollFunction() {
    if(document.body.scrollTop > 0 ||
       document.documentElement.scrollTop > 0) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}
function navigate() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}