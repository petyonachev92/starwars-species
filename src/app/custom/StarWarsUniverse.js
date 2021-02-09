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

    static get events() {
        return EVENTS;
    }

    get speciesCount() {
        return this.species.length;
    }

    async createSpecies() {
        const speciesObj = new Species();
        console.log('created new Species')

        
        speciesObj.addListener(Species.events.MAX_SPECIES_REACHED,
            _onSpeciesCreated.bind(null, (speciesObj, this), this));
            
        await speciesObj.init(url)
        id++;
        
        console.log('after the listener')
        console.log(speciesObj)
    }
}