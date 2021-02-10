import EventEmitter from "eventemitter3";
import Species from "./Species";
import config from '../../config'
/* import _onSpeciesCreated from '../utils' */

const url = 'https://swapi.booost.bg/api/species/'
const EVENTS = {
    MAX_SPECIES_REACHED: 'max_species_reached',
    SPECIES_CREATED: 'species_created'
}

export default class StarWarsUniverse extends EventEmitter {
    constructor(_maxSpecies = config.maxSpeciesCount) {
        super()
        this.species = new Array()

        this.on(StarWarsUniverse.events.SPECIES_CREATED, () => {
            console.log(`event emitted: ${StarWarsUniverse.events.SPECIES_CREATED}`)
        })
    }

    static get events() {
        return EVENTS;
    }

    get speciesCount() {
        return this.species.length;
    }

    async createSpecies() {
       const species = new Species();
       let id = this.speciesCount + 1

       species.once.bind(Species.events.SPECIES_CREATED, await this._onSpeciesCreated(species));

       await species.init(url + `${id}/`);
       
       
    }

    async _onSpeciesCreated(obj) {
        await this.species.push(obj);

        console.log('before emitting event')
        this.emit(StarWarsUniverse.events.SPECIES_CREATED, this.speciesCount);
        
        
        if(this.speciesCount < config.maxSpeciesCount) {
            await this.createSpecies();
        } else {
            this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED)
        }
    };
}