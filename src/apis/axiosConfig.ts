import { Backend } from "@/utils/constants";
import axios from "axios";

const API_ROUTE = Backend;
console.log(`APi Route: ${API_ROUTE}`)
const api = axios.create({
	withCredentials: false,
	//baseURL:  "http://13.218.216.83:8000/",
	baseURL: API_ROUTE
});

const errorHandler = (error: any) => {
	const statusCode = error.response?.status;

	if (statusCode && statusCode !== 401) {
	}

	return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
	return errorHandler(error);
});

export {api, API_ROUTE};
