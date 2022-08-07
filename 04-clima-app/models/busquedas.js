import fs from 'fs';

import axios from "axios";



class Busquedas {

    historial = [];
    dbPath = './db/historial.json';


    constructor() {

        this.leerDB();
    };

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language':'es',
            'limit': 5
        }
    };

    get paramsWheter( ){
        return {
            'appid': process.env.CLIMA_KEY,
            'lang':'es',
            'units': 'metric',
        }
    };

    get historialCapitalizado(){
        return this.historial.map( lugar => lugar.toUpperCase() );
    }


    async ciudad( lugar = '' ){

        //TOD: peticion http
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.paramsMapBox
        })

        const resp = await instance.get();

        return resp.data.features.map( lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }));
        

    } catch ( error ) {
        return [];
    }


    async climaLugar( lat, lon ){

        try {

            // instance de axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsWheter,
                    lat,
                    lon
                }
            });

            // res.data
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch ( error ) {
            console.log(error);;
        }

    }


    agregarHistorial( lugar = '' ){


        if (this.historial.includes(lugar.toLocaleLowerCase)) {
            return;
        }


        //TODO: prevenir duplicados
        this.historial.unshift( lugar );

        //Grabar en Db
        this.guardarDB();

    }


    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    };

    leerDB(){

        //debe de existir

        const info = fs.readFileSync( this.dbPath, 'utf8' );

        const payload = JSON.parse( info );

        this.historial = payload.historial;
    }


};




export default Busquedas;
