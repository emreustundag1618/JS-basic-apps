import { elements } from "../base";

export const clearInputs = () => {
    elements.searchInput.value = "";
}

export const clearSearchResults = () => {
    elements.movieList.innerHTML = "";
}

export const displayMovies = (keyword, data) => {
    
    data.results.forEach(movie => {
        const html = `
            <li class="d-flex mb-5">
                <!-- Image -->
                <img src="https://www.themoviedb.org/t/p/w92${movie.poster_path}" onerror="this.src='https://via.placeholder.com/92x138';" alt="${movie.title}"
                    class="me-3" />
                <!-- Body -->
                <div>
                    <h5 class="fw-bold">
                        <span class="badge bg-primary">
                        ${movie.vote_average}
                        </span>
                        <a href="#${movie.id}">${movie.title}</a>
                        
                    </h5>
                    <div class="text-muted mb-3">Release date: ${movie.release_date}</div>
                    <p>
                        ${movie.overview}
                    </p>
                </div>
            </li>
        `;

        elements.movieListHeader.innerHTML = `${keyword} için ${data.total_results} adet sonuç bulundu.`;
        elements.movieListContainer.classList.add("d-block");
        elements.movieListContainer.classList.remove("d-none");

        elements.movieList.insertAdjacentHTML("beforeend", html)
    });
}