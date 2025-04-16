import { api } from "./axiosConfig"


export const ImagesAPI = {

    getAllRaw: async function(uuid: string) {
        return api
        .request({
            url: `/images/raw?uuid=${uuid}`,
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
    }

}