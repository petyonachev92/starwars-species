import EventEmitter from "eventemitter3";
import Species from "./Species";
import config from '../../config'
/* import _onSpeciesCreated from '../utils' */

let id = 1

const url = `https://swapi.booost.bg/api/species/${id}/`

const EVENTS = {
    MAX_SPECIES_REACHED: 'max_species_reached',
    SPECIES_CREATED: 'species_created'
}

export default class StarWarsUniverse extends EventEmitter {
    constructor(_maxSpecies = config.maxSpeciesCount) {
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
       const species = new Species();

       species.once.bind(null, (Species.events.SPECIES_CREATED, this._onSpeciesCreated(species)))

       console.log(id)
       await species.init(url);
       
    }

    async _onSpeciesCreated(obj) {
        this.species.push(obj);

        this.emit(StarWarsUniverse.events.SPECIES_CREATED, this.speciesCount);
        id++;


        if(this.speciesCount !== config.maxSpeciesCount) {
            await this.createSpecies();
        } else {
            this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED)
        }
    };
}