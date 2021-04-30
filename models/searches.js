const { default: axios } = require("axios");

class Searches {

    history = ['Santa Cruz', 'Cochabamba', 'Beni' ];

    constructor() {
        // read from DB if it exist!
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoidmFyZ2FzbXJ1dGgiLCJhIjoiY2tvMHFjcTY5MGZhZjJ2cXdia3hnNWIyZiJ9.WoVFJmDZcfNDpFNlwDywIg',
            'limit': 5,
            'language': 'es',
        }
    }

    async city( place = '') {
        try {
        // http request
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        })

        const res = await instance.get();
        console.log(res.data);

        return []; // return places   

        } catch (error) {
            return []; // return places            
        }
        
        

    }

}

module.exports = Searches;