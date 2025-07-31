import _AXIOS from "axios";
import { makeUseAxios } from "axios-hooks";
import queryString from "query-string";

export const axios = _AXIOS.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  responseType: import.meta.env.VITE_RESPONSE_TYPE,
  responseEncoding: import.meta.env.VITE_RESPONSE_ENCODING,
  maxContentLength: import.meta.env.VITE_MAX_CONTENT_LENGTH,
  proxy: queryString.parse(import.meta.env.VITE_PROXY),
});

const useAxios = makeUseAxios({ axios });

export default useAxios;
