
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const clearAllButton = document.querySelector("#clear-films");
// second card body for deleting a film
const cardBody = document.querySelectorAll(".card-body")[1];

// start UI object
const ui = new UI();

// generate Storage object
const storage = new Storage();

// All events upload

eventListeners();

function eventListeners() {
    // Form submit edildiğinde
    form.addEventListener("submit", addFilm);
    // Sayfa yüklendiğinde
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clearAllButton.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Error
        ui.displayMessages("Tüm alanları doldurun...", "danger")
    }
    else {
        // create new film instance
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm); // adding film to UI
        storage.addFilmToStorage(newFilm) // adding film to Storage
        ui.displayMessages("Film başarıyla eklendi...", "success")
    }

    ui.clearInputs(titleElement, directorElement, urlElement);

    e.preventDefault();
}

function deleteFilm(e) {

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme işlemi başarılı...", "success");
    }
}

function clearAllFilms() {
    if (confirm("Emin misiniz? Tüm filmler silinsin mi?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}