// UI class for user interface processes
class UI {

    static addFilmToUI = function (newFilm) {
        /*  <tr>
             <td><img src="" class="img-fluid img-thumbnail"></td>
             <td></td>
             <td></td>
             <td><a href="#" id="delete-film" class="btn btn-danger">Filmi Sil</a></td>
         </tr> */
    
        const filmList = document.querySelector("#films");
        // = (eşittir) kullanılsaydı her eklenen önceki html yi silerdi
        filmList.innerHTML += `
    
                <tr>
                    <td><img src="${newFilm.url}" class="img-fluid img_resize img-thumbnail"></td>
                    <td>${newFilm.title}</td>
                    <td>${newFilm.director}</td>
                    <td><a href="#" id="delete-film" class="btn btn-danger">Filmi Sil</a></td>
                </tr>
    
            `
    }
    
    static clearInputs = function(element1, element2, element3) {
        element1.value = "";
        element2.value = "";
        element3.value = "";
    }
    
    static displayMessages = function(message, type) {
        const cardBody = document.querySelectorAll(".card-body")[0];
        // alert divi oluştur
        const div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = message;
    
        cardBody.appendChild(div);
    
        // function 2 saniye sonra çalışır
        setTimeout(function() {
            div.remove();
        }, 2000)
    }
    
    static loadAllFilms = function(films) {
    
        const filmList = document.getElementById("films");
    
        films.forEach(function(film){
            filmList.innerHTML += `
                <tr>
                    <td><img src="${film.url}" class="img-fluid img_resize img-thumbnail"></td>
                    <td>${film.title}</td>
                    <td>${film.director}</td>
                    <td><a href="#" id="delete-film" class="btn btn-danger">Filmi Sil</a></td>
                </tr>
            `
        });
    }
    
    static deleteFilmFromUI = function(element) {
        element.parentElement.parentElement.remove();
    }
    
    static clearAllFilmsFromUI = function() {
    
        const filmList = document.getElementById("films");
    
        // Method 1: yavaş çalışan
        // filmList.innerHTML = ""
    
        while(filmList.firstElementChild !== null) {
            filmList.firstElementChild.remove();
        }
    }
}

