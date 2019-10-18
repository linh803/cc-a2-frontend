import axios from "axios";

import {URL} from "../resources/Url"

class DataService {
    getCountries() {
        return axios.get(`${URL}/countryids`);
    }
}

export default new DataService
