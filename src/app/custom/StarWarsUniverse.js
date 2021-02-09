import EventEmitter from "eventemitter3";
import Species from "./Species";
import _onSpeciesCreated from '../utils'

let id = 1

const url = `https://swapi.booost.bg/api/species/${id}/`

const EVENTS = {
    MAX_SPECIES_REACHED: 'max_species_reached',
    SPECIES_CREATED: 'species_created'
}

export default class StarWarsUniverse extends EventEmitter {
    constructor(_maxSpecies) {
        super()
        this.species = new Array()
    }

    get events() {
        return EVENTS;
    }

    get speciesCount() {
        return this.species.length;
    }

    async createSpecies() {
        const speciesObj = new Species();
        console.log('created new Species')

        await speciesObj.init(url)
        speciesObj.addListener('species_created', _onSpeciesCreated(speciesObj, this), this)
        speciesObj.on(speciesObj.events.SPECIES_CREATED,
            _onSpeciesCreated(speciesObj, this), this);

        
        console.log('after the listener')
        console.log(speciesObj)
    }
}