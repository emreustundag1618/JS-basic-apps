
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const clearAllButton = document.querySelector("#clear-films");
// second card body for deleting a film
const cardBody = document.querySelectorAll(".card-body")[1];

// static methodlardan dolayı obje oluşturmaya gerek yok
// const ui = new UI();

// static methodlardan dolayı obje oluşturmaya gerek yok
// const storage = new Storage();

// All events upload

eventListeners();

function eventListeners() {
    // Form submit edildiğinde
    form.addEventListener("submit", addFilm);
    // Sayfa yüklendiğinde
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
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
        UI.displayMessages("Tüm alanları doldurun...", "danger")
    }
    else {
        // create new film instance
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); // adding film to UI
        Storage.addFilmToStorage(newFilm) // adding film to Storage
        UI.displayMessages("Film başarıyla eklendi...", "success")
    }

    UI.clearInputs(titleElement, directorElement, urlElement);

    e.preventDefault();
}

function deleteFilm(e) {

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı...", "success");
    }
}

function clearAllFilms() {
    if (confirm("Emin misiniz? Tüm filmler silinsin mi?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

}