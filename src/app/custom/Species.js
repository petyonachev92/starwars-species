import config from '../../config'
import EventEmitter from "eventemitter3";

const EVENTS = {
    SPECIES_CREATED: 'species_created'
}



export default class Species extends EventEmitter {
    constructor() {
        super()
        this.name = null;
        this.classification = null;
    }

    get events() {
        return EVENTS;
    }

    async init(url) {
        console.log('Species init')
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)

        this.name = data.name;
        this.classification = data.classification;

        this.emit(this.events.SPECIES_CREATED, () => {console.log('species_created is emitted')});

    }
}