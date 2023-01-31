// apiKey: 63a037259e9845501df03cac4af6fc0f
// baseUrl: https://api.themoviedb.org/3
// endpoint: https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

// model view controller (MVC)

import Search from "./models/Search";
import {elements, renderLoader, clearLoader} from "./base";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";
import { Movie } from "./models/Movie";

const state = {};

// Search controller

const searchController = async () => {
    const keyword = elements.searchInput.value;
    
    if(keyword) {
        state.search = new Search(keyword);
        
        searchView.clearInputs();
        searchView.clearSearchResults();

        renderLoader(elements.movieListContainer);
        
        await state.search.getMovies();
        searchView.displayMovies(keyword, state.search.data);

        setTimeout(() => {
            clearLoader(elements.movieListContainer);
        }, 750);
    } else {
        alert("anahtar kelime girmelisiniz.")
    }
}

elements.searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("form submitted");
    searchController()
})

// Movie controller

const movieController = async () => {
    const id = window.location.hash.replace("#","")
    console.log(id)
    if(id) {
        state.movie = new Movie(id);
        renderLoader(elements.movieDetailsContainer);
        await state.movie.getMovie();
        movieView.displayMovie(state.movie.data);
        movieView.backToTop();
        setTimeout(() => {
            clearLoader(elements.movieDetailsContainer);
        }, 1500);
    }
}

window.addEventListener("hashchange", movieController);
elements.movieDetailsClose.addEventListener("click", movieView.closeDetails);






