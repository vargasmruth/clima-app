const axios = require('axios');
require('dotenv').config()

const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
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
                const places = await searches.city(term);
                console.log(places);
                // search places
                // select place

                // show weather

                // show results
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:');
                console.log('Latitud:');
                console.log('Longitud:');
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');
                
                break;
        
            default:
                break;
        }


        if( opt !== 0 ) await pause();

    } while (opt !== 0)

}

main();