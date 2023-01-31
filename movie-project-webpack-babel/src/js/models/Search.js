import { api_key, base_url } from "../config";

export default class Search {
    constructor(keyword) {
        this.keyword = keyword;
    }

    async getMovies() {
        const response = await fetch(`${base_url}/search/movie?api_key=${api_key}&page=1&query=${this.keyword}&include_adult=true`)
        this.data = await response.json();
        console.log(this.data)
    }
}