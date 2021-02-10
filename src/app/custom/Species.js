import config from '../../config'
import EventEmitter from "eventemitter3";


/* const url = `https://swapi.dev/api/species/${id}/` */

const EVENTS = {
    SPECIES_CREATED: 'species_created'
}



export default class Species extends EventEmitter {
    constructor() {
        super()
        this.name = null;
        this.classification = null;
    }

    static get events() {
        return EVENTS;
    }

    async init(url) {
        const resp = await fetch(url);
        const data = await resp.json();

        this.name = await data.name;
        this.classification = await data.classification;

        console.log(this.name)
        console.log(this.classification)
        console.log(url)

        this.emit(Species.events.SPECIES_CREATED, this)
    
    }
}