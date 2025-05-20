import { api } from "./axiosConfig"

console.log(`api base url: ${api.defaults.baseURL}`)
export const ImagesAPI = {

    getAllRaw: async function(uuid: string) {
        return api
        .request({
            url: `${api.defaults.baseURL}images/raw?uuid=${uuid}`,
            method: 'GET'
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    },
    getAllProcessed: async function(uuid: string) {
        return api
        .request({
            url: `/images/processed?uuid=${uuid}`,
            method: 'GET'
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    },
    getFile: async function(uuid: string, status_process: boolean, filename: string) {
        return api
        .request({
            url: `/images/file?uuid=${uuid}&status_process=${status_process}&filename=${filename}`,
            method: 'GET',
            responseType: 'blob' 
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    },
    uploadImage: async function(data: FormData) {
        return api
        .request({
            url: `/images/raw`,
            method: 'POST',
            data: data
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    },
    
    processImage: async function(data: FormData) {
        return api
        .request({
            url: `/detect/`,
            method: 'POST',
            data: data
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    
    }

}