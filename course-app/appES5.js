// Course constructor
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// UI constructor. sadece metotlardan oluşur
function UI() { }

UI.prototype.addCourseToUI = function (course) {
    const list = document.querySelector("#course-list");

    var html = `

            <tr>
                <td><img class="img-thumb" style="max-width: 100px" src="${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><button type="submit" class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>

            `

    list.innerHTML += html;
    
}

UI.prototype.clearInputs = function () {  //clears form input values
    document.getElementById("title").value = "";
    document.getElementById("instructor").value = "";
    document.getElementById("image").value = "";
}

UI.prototype.getCourseFromUI = function() {

}

UI.prototype.deleteCourseFromUI = function(element) {
    if (element.classList.contains("delete")) {
        element.parentElement.parentElement.remove();
    };
}

UI.prototype.showAlert = function(message, type) {
    let alertBox = `<div class="alert alert-${type} mt-3" role="alert">${message}</div>`;
    const formGroup = document.getElementById("new-course");
    // beforeBegin, beforeend, afterbegin, afterend
    formGroup.insertAdjacentHTML("beforebegin", alertBox);

    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 2500)
}



document.getElementById("new-course").addEventListener("submit", function (e) {

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    // create Course object: bu tarz işlemlerin hepsi function veya objelerle yapılmalı
    const course = new Course(title, instructor, image);

    // save to database
    // burada yapılmayacak

    // create UI
    const ui = new UI();

    // add course to UI list
    if (title === "" || instructor === "" || image === "") {
        ui.showAlert("Please complete the form!","warning")
    } else {
        ui.addCourseToUI(course);
        ui.showAlert("The course successfully added to list!","success");
    }

    // clear input controls
    ui.clearInputs();

    e.preventDefault();

})

document.getElementById("course-list").addEventListener("click", function(e) {
    const ui = new UI();
    // delete a course from UI
    ui.deleteCourseFromUI(e.target)
    ui.showAlert("The course deleted from list","danger")
})