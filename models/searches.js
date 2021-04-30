const { default: axios } = require("axios");

class Searches {

    history = ['Santa Cruz', 'Cochabamba', 'Beni' ];

    constructor() {
        // read from DB if it exist!
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
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
        console.log(res.data.features);
        return res.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1],
        })); 

        } catch (error) {
            return []; // return places            
        }
        
        

    }

}

module.exports = Searches;