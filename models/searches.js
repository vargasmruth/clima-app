const { default: axios } = require("axios");

class Searches {

    history = ['Santa Cruz', 'Cochabamba', 'Beni' ];

    constructor() {
        // read from DB if it exist!
    }

    async city( place = '') {
        try {
        // http request
        const res = await axios.get('https://reqres.in/api/users?page=2');
        console.log(res.data);

        } catch (error) {
            return []; // return places            
        }
        
        

    }

}

module.exports = Searches;