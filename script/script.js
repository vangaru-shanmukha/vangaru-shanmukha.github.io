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

function validate() {

    var nameRegex = /^[a-zA-Z ]*$/;
    var emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if(name.length === 0 || nameRegex.test(name) === false){
        alert("Entered name is invalid");
        document.getElementById("name").focus();
        document.getElementById("name-error").style.display = "block";
        return false;
    }
    if(email.length === 0 || emailRegex.test(email) === false){
        alert("Entered email is invalid");
        document.getElementById("email-error").style.display = "block";
        document.getElementById("email").focus();
        return false;
    }
    if(message.length === 0){
        alert("Try writing something in text area....");
        return false;
    }
    alert("message sent successfully!");
    return true;
}

function removeNameError() {
    document.getElementById("name-error").style.display = "none";
    document.getElementById("name").style.color = "black";
}

function removeEmailError() {
    document.getElementById("email-error").style.display = "none";
    document.getElementById("email").style.color = "black";
}

function jsonImages() {
    let images;
    if(localStorage.getItem("images") === null) {
        images = gallery["images"];
        localStorage.setItem("images",JSON.stringify(images));
    }
    images = JSON.parse(localStorage.getItem("images"));
    var divId = document.getElementById("gallery");
    for(i=0;i<images.length;i++){
        let image = images[i];
        let img = document.createElement("img");
        img.src = image.src;
        img.setAttribute("width",image.width);
        img.setAttribute("height",image.height);
        if(i === 0){
            img.setAttribute("class",image.className);
        }
        divId.appendChild(img);
    }
}

function loadImages() {
    var images;
    if(localStorage.getItem("images") === null) {
        images = gallery["images"];
        localStorage.setItem("images",JSON.stringify(images));
    }
    images = JSON.parse(localStorage.getItem("images"));
    var divId = document.getElementById("gallery");
    for(var i=0;i<images.length;i++){
        let image = images[i];
        let img = document.createElement("img");
        img.src = image.src;
        img.setAttribute("width",image.width);
        img.setAttribute("height",image.height);
        img.setAttribute("id",i+"");
        img.setAttribute("onclick","showButtons("+i+")");
        if(i === 0){
            img.setAttribute("class",image.className);
        }
        else if( i > 0){
            img.setAttribute("class","editable");
        }
        divId.appendChild(img);
    }
}

let currentImage;
function showButtons(i) {
    document.getElementById("editDiv").style.display = "flex";
    document.getElementById("editDiv").style.justifyContent = "center";
    document.getElementById("deleteDiv").style.display = "flex";
    document.getElementById("deleteDiv").style.justifyContent = "center";
    currentImage = i;
    console.log(i);
    if(document.getElementById("edit-form").style.display !== "none"){
        document.getElementById("edit-form").style.display = "none";
        edit();
    }
}

function del() {
    var images = JSON.parse(localStorage.getItem("images"));
    var image = images[currentImage];
    var name = image.name;
    var url = image.src;
    var info = image.info;
    var date = image.date;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    var modalImage = document.getElementById("modalImage");
    modalImage.setAttribute("src",url);
    var button = document.getElementById("confirm");
    var cancel = document.getElementById("no");
    button.onclick = function() {
        images.splice(currentImage,1);
        localStorage.setItem("images",JSON.stringify(images));
        modal.style.display = "none";
        alert("Deleted successfully!");
        window.location.reload();
    }
    cancel.onclick = function() {
        modal.style.display = "none";
    }
}

function add() {
    document.getElementById("edit-form").style.display = "none";
    var element = document.getElementById("add-form");
    if(element.style.display === "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}
function edit() {
    document.getElementById("add-form").style.display = "none";
    var element = document.getElementById("edit-form");
    console.log("edit"+currentImage);
    var images = localStorage.getItem("images");
    images = JSON.parse(images);
    console.log(images[0].src);
    if(element.style.display === "none")
        element.style.display = "flex";
    else
        element.style.display = "none";
    document.getElementById("name").value = images[currentImage].name;
    document.getElementById("url").value = images[currentImage].src;
    document.getElementById("message").value = images[currentImage].alt;
    document.getElementById("date").value = images[currentImage].date;
}

function addFormValidate() {

    var name = document.getElementById("name1").value;
    var url = document.getElementById("url1").value;
    var info = document.getElementById("message1").value;
    var date = document.getElementById("date1").value;

    console.log(name);
    var nameRegex = /^[a-zA-Z0-9\. ]+$/;
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    var currentDate = new Date();
    var uploadedDate = new Date(date);
    if(name.length === 0 || nameRegex.test(name) === false) {
        alert("Enter a valid name!");
        return false;
    }
    if(url.length === 0) {
        alert("Enter a valid url");
        return false;
    }
    if(info.length === 0 || nameRegex.test(info) === false) {
        alert("Enter some information about the image....");
        return false;
    }
    if(date.length ===0 || dateRegex.test(date) === false) {
        alert("Enter date in the format yyyy/mm/dd");
        return false;
    }
    if(currentDate < uploadedDate) {
        alert("Enter a date in the past");
        return false;
    }
    return true;

}

function addForm() {
    if(addFormValidate() === true) {
        var image = {
            "name" : document.getElementById("name1").value,
            "src" : document.getElementById("url1").value,
            "alt" : document.getElementById("message1").value,
            "date" : document.getElementById("date1").value,
            "width" : "200px",
            "height" : "200px"
        }
        var images = JSON.parse(localStorage.getItem("images"));
        images.push(image);
        localStorage.setItem("images",JSON.stringify(images));
        alert("Submitted successfully!");
        return true;
    }
    else {
        return false;
    }
}

function editForm() {
    if(formValidate() === true){
        var images = JSON.parse(localStorage.getItem("images"));
        images[currentImage].src = document.getElementById("url").value;
        images[currentImage].name = document.getElementById("name").value;
        images[currentImage].alt = document.getElementById("message").value;
        images[currentImage].date = document.getElementById("date").value;
        console.log(images[currentImage].alt);
        localStorage.setItem("images",JSON.stringify(images));
        alert("Submitted succesfully!");
        return true;
    }
    else{
        
        return false;
    }
}

function formValidate() {

    var name = document.getElementById("name").value;
    var url = document.getElementById("url").value;
    var info = document.getElementById("message").value;
    var date = document.getElementById("date").value;

    console.log(name);
    var nameRegex = /^[a-zA-Z0-9\. ]+$/;
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    var currentDate = new Date();
    var uploadedDate = new Date(date);
    if(name.length === 0 || nameRegex.test(name) === false) {
        alert("Enter a valid name!");
        return false;
    }
    if(url.length === 0) {
        alert("Enter a valid url");
        return false;
    }
    if(info.length === 0 || nameRegex.test(info) === false) {
        alert("Enter some information about the image....");
        return false;
    }
    if(date.length ===0 || dateRegex.test(date) === false) {
        alert("Enter date in the format yyyy/mm/dd");
        return false;
    }
    if(currentDate < uploadedDate) {
        alert("Enter a date in the past");
        return false;
    }
    return true;

}