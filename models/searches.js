const fs = require('fs');

const { default: axios } = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json'

    constructor() {
        // read from DB if it exist!
        this.readDB();
    }

    get capitalizeHistory() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map( p => p[0].toUpperCase() + p.substring(1));

            return words.join(' ');
        })
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
        return res.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lon: place.center[0],
            lat: place.center[1],
        })); 

        } catch (error) {
            return []; // return places            
        }

    }
        
    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            language: 'es'
        }
    }

    async weatherPlace( lat, lon ) {
        try {
            // http request
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.paramsOpenWeather, lat, lon}
        })

        const res = await instance.get();
        const {weather, main} = res.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    addHistory(place = '') {
        
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }
        this.history = this.history.splice(0,9); // save only 10 registers
        this.history.unshift(place.toLocaleLowerCase());

        // Save to db
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info); 

        this.history = data.history;
    }

}

module.exports = Searches;