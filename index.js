const axios = require('axios');
require('dotenv').config()

const { readInput, inquirerMenu, pause, placesList } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async() => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // show message
                const term = await readInput('Ciudad: ');
                
                // search places
                const places = await searches.city(term);

                // select place
                const idSelected = await placesList(places);
                if (idSelected == '0') continue;
                const placeSelected = places.find(place => place.id == idSelected);
                // Save to db
                searches.addHistory(placeSelected.name);
                
                // show weather
                const weather = await searches.weatherPlace(placeSelected.lat, placeSelected.lon);

                // show results
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', placeSelected.name.green);
                console.log('Latitud:', placeSelected.lat);
                console.log('Longitud:', placeSelected.lon);
                console.log('Clima:', weather.desc.green);
                console.log('Temperatura:', weather.temp);
                console.log('Mínima:', weather.min);
                console.log('Máxima:', weather.max);                
                break;
                
                case 2:
                    searches.capitalizeHistory.forEach((place, i) => {
                        const idx = `${i+1}.`.green;
                        console.log(`${idx} ${place}`)
                    });
                break;

            default:
                break;
        }


        if( opt !== 0 ) await pause();

    } while (opt !== 0)

}

main();