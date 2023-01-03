// Storage class
class Storage {

    static addFilmToStorage = function (newFilm) {

        let films = this.getFilmsFromStorage();

        films.push(newFilm);

        localStorage.setItem("films", JSON.stringify(films)); // stringify: array to JSON string

    }

    static getFilmsFromStorage() {
        let films;
        // local storage ta films keyi var mı? check
        if (localStorage.getItem("films") === null) {
            films = [];
        }
        else {
            films = JSON.parse(localStorage.getItem("films")); // parse: JSON string to array
        }
        return films;
    }

    static deleteFilmFromStorage(title) {
        let films = this.getFilmsFromStorage();

        films.forEach(function (film, index) {
            if (film.title === title) {
                films.splice(index, 1);
            }
        })

        localStorage.setItem("films", JSON.stringify(films));
    }

    static clearAllFilmsFromStorage = function () {
        localStorage.removeItem("films")
    }
}


