import axios from "axios";

import {URL} from "../resources/Url"

class DataService {
    getCountries() {
        return axios.get(`${URL}/countryids`);
    }

    getTopTrendingVideos(cid) {
        return axios.get(`${URL}/toptrendingvideos?cid=${cid}`);
    }

    getAllTrendingVideos(cid) {
        return axios.get(`${URL}/alltrendingvideos?cid=${cid}`);
    }

    getVideoViews(vid) {
        return axios.get(`${URL}/videoviews?vid=${vid}`);
    }
}

export default new DataService
