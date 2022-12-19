import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import axiosConfig from '../configs/axios-config.json';

const useAxios = makeUseAxios({
    axios: axios.create(axiosConfig)
});

export default useAxios;