import { elements } from "../base";

export const backToTop = () => {
    elements.movieDetailsContainer.scrollIntoView({behavior:"smooth"});
}

export const closeDetails = () => {
    elements.movieDetailsContainer.classList.remove("d-block");
    elements.movieDetailsContainer.classList.add("d-none");
}

export const displayMovie = movie => {
    let html = `<div class="row">`

    let genres = "";

    movie.genres.forEach(genre => {
        genres += `<span class="badge bg-primary ml-1">${genre.name}</span>`
    });
    
    html += `<div class="col-md-4">
                <img src="https://www.themoviedb.org/t/p/w342${movie.poster_path}" class="img-fluid" onerror="this.src='https://via.placeholder.com/92x138';" alt="${movie.title}"
                    class="me-3" />
            </div>
            <div class="col-md-8">
                <div>
                    <h5>${movie.original_title}</h5>
                    <p>${movie.overview}</p>    
                    <p><small class="badge bg-primary">${movie.vote_average}</small></p>
                    <hr>
                    ${genres}
                </div>
            </div>`
    html += `</div>`

    elements.movieDetailsContainer.classList.add("d-block");
    elements.movieDetailsContainer.classList.remove("d-none");
    elements.movieDetails.innerHTML = html;
}