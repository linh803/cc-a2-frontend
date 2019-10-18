import axios from "axios";

import {URL} from "../resources/Url"

class DataService {
    getCountries() {
        return axios.get(`${URL}/countryids`);
    }

    getTopTrendingVideos(cid) {
        return axios.get(`${URL}/toptrendingvideos?${cid}`);
    }

    getAllTrendingVideos(cid) {
        return axios.get(`${URL}/alltrendingvideos?${cid}`);
    }

    getVideoDetails(vid) {
        return axios.get(`${URL}/videoviews?${vid}`);
    }
}

export default new DataService
