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
    }

    static get events() {
        return EVENTS;
    }

    get speciesCount() {
        return this.species.length;
    }

    createSpecies() {
       const species = new Species();
       let id = this.speciesCount + 1
       console.log(id)

       species.once.bind(Species.events.SPECIES_CREATED, this._onSpeciesCreated(species));

       species.init(url + `${id}/`);
       

       /* this.on.bind(StarWarsUniverse.events.SPECIES_CREATED, this._onUniverseSpecies(this.speciesCount)) */      
    }

    _onSpeciesCreated(obj) {
        this.species.push(obj);

        this.emit(StarWarsUniverse.events.SPECIES_CREATED, this.speciesCount); 
        
        /* if(this.speciesCount === 10) {
            this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
        } */
        
    };
    
    /* _onUniverseSpecies(count) {
        if(count < config.maxSpeciesCount) {
            this.createSpecies();
        } else {
            this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED)
        }

    } */
}