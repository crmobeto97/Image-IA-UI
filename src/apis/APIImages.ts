import { api } from "./axiosConfig"


export const ImagesAPI = {

    getAll: async function(uuid: string) {
        return api
        .request({
            url: `/images/?uuid=${uuid}`,
            method: 'GET'
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
            url: `/images/`,
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