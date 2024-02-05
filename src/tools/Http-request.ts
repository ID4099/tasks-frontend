import axios from 'axios';

const {VITE_BACKEND_BASEPATH} = import.meta.env;
export class HttpRequests {

    constructor(
        private readonly headers = {
            'Content-Type': 'application/json',
            'Acept': '*/*'
        }
    ){}
    async post(endpoint: string, data: object){
        const response = await axios.post(`${VITE_BACKEND_BASEPATH}/${endpoint}`, {...data},{
            headers: this.headers
        }).then(({data}) => data)
        .catch((error) => {
            console.log('Axios error ', error);
            throw new Error('Error: ' + error);
        });
        return response;
    };
    async get(endpoint: string, pathParam: string = ''){
        const response = await axios.get(`${VITE_BACKEND_BASEPATH}/${endpoint}/${pathParam}`, {
            headers: this.headers
        }).then(({data}) => data)
        .catch((error) => {
            console.log('Axios error ', error);
            throw new Error('Error: ' + error);
        });
        return response;
    };
    async patch(pathParam: string, data: object){
        const response = await axios.patch(`${VITE_BACKEND_BASEPATH}/${pathParam}`,{ ...data }, {
            headers: this.headers,
        }).then(({data}) => data)
        .catch((error) => {
            console.log('Axios error ', error);
            throw new Error('Error: ' + error);
        });
        return response;
    };
    async delete(pathParam: string){
        const response = await axios.delete(`${VITE_BACKEND_BASEPATH}/${pathParam}`, {
            headers: this.headers
        }).then(({data}) => data)
        .catch((error) => {
            console.log('Axios error ', error);
            throw new Error('Error: ' + error);
        });
        return response;
    };
};