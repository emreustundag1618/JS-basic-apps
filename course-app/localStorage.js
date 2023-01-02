class LocalStorage {

    static addCourseToStorage(newCourse) {

        let courses = this.getCoursesFromStorage();
        console.log(courses);

        courses.push(newCourse);

        console.log(courses);

        // JS array to JSON string
        localStorage.setItem("courses", JSON.stringify(courses));
        console.log(JSON.stringify(courses))

    }

    static getCoursesFromStorage() {
        let courses;

        if (localStorage.getItem("courses") === null) {
            courses = [];
        } else {
            // JSON string to JS array
            courses = JSON.parse(localStorage.getItem("courses"));
        }
        return courses;
    }

    static deleteCourseFromStorage(element) {
        const courses = this.getCoursesFromStorage();

        if (element.classList.contains("delete")) {
            const id = element.getAttribute("data-id");
            console.log(id)

            courses.forEach((course, index) => {
                if (course.courseId === Number(id)) {
                    courses.splice(index, 1);
                }
            });

            localStorage.setItem("courses", JSON.stringify(courses));
        }

        // title a göre silme yapılmak istenirse
        // courses.forEach((course, index) => {
        //     if(course.title === title) {
        //         courses.splice(index, 1);
        //     }
        // });


    }

    static clearStorage() {
        localStorage.removeItem("courses")
    }
}