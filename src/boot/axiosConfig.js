import axios from 'axios';

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2/pokemon/' });

const axiosPlugin = {
    install(app) {
        app.config.globalProperties.axios = axios;
        app.config.globalProperties.api = api;
    }
}

export { api }

export default axiosPlugin