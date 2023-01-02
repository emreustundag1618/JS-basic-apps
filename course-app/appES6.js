// Course constructor
class Course {
    constructor(title, instructor, image) {
        // random id generate
        this.courseId = Math.floor(Math.random() * 1000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

// UI constructor. sadece metotlardan oluşur
class UI {
    addCourseToUI = function (course) {
        const list = document.querySelector("#course-list");

        var html = `

            <tr>
                <td><img class="img-thumb" style="max-width: 100px" src="${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><button type="submit" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>

            `

        list.innerHTML += html;

    }

    clearInputs = function () {  //clears form input values
        document.getElementById("title").value = "";
        document.getElementById("instructor").value = "";
        document.getElementById("image").value = "";
    }

    deleteCourseFromUI = function (element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
            return true;
        };
    }

    showAlert = function (message, type) {
        let alertBox = `<div class="alert alert-${type} mt-3" role="alert">${message}</div>`;
        const formGroup = document.getElementById("new-course");
        // beforeBegin, beforeend, afterbegin, afterend
        formGroup.insertAdjacentHTML("beforebegin", alertBox);

        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 2500)
    }

    displayCourses(courses) { // displays courses from given array (db or storage)

        const tableList = document.querySelector("#course-list");
        courses.forEach(course => {
            tableList.innerHTML += `
                    <tr>
                        <td><img class="img-thumb" style="max-width: 100px" src="${course.image}"/></td>
                        <td>${course.title}</td>
                        <td>${course.instructor}</td>
                        <td><button type="submit" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</button></td>
                    </tr>`
        });


    }
    deleteAllCourseFromUI() {
        const courseList = document.getElementById("course-list");

        // Method 1: yavaş çalışan
        // courseList.innerHTML = ""

        while (courseList.firstElementChild !== null) {
            courseList.firstElementChild.remove();
        }
    }
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

    if (title === "" || instructor === "" || image === "") {
        ui.showAlert("Please complete the form!", "warning")
    } else {
        // add course to UI list
        ui.addCourseToUI(course);
        ui.showAlert("The course successfully added to list!", "success");
        // add course to local storage
        LocalStorage.addCourseToStorage(course);

    }

    // clear input controls
    ui.clearInputs();

    e.preventDefault();

})

document.getElementById("course-list").addEventListener("click", function (e) {
    const ui = new UI();
    // delete a course from UI
    if (ui.deleteCourseFromUI(e.target) === true) {
        LocalStorage.deleteCourseFromStorage(e.target);
        ui.showAlert("The course deleted from list", "danger")
    };


})

document.getElementById("clear-all").addEventListener("click", function (e) {
    const ui = new UI();
    // delete a course from UI
    if (confirm("All courses will be deleted?")) {
        ui.deleteAllCourseFromUI();
        LocalStorage.clearStorage();
        ui.showAlert("All courses deleted from list", "danger")
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const ui = new UI();
    let courses = LocalStorage.getCoursesFromStorage();
    console.log(courses)
    ui.displayCourses(courses);
});