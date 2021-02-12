import EventEmitter from "eventemitter3";
import Species from "./Species";

export default class StarWarsUniverse extends EventEmitter {
    constructor(_maxSpecies = 10) {
        super()
        this.species = [];
        this._maxSpecies = _maxSpecies;
    }

    static get events() {
        return {
            MAX_SPECIES_REACHED: 'max_species_reached',
            SPECIES_CREATED: 'species_created'
        };
    }

    get speciesCount() {
        return this.species.length;
    }

    async createSpecies() {
        const species = new Species();
        const url = 'https://swapi.booost.bg/api/species/'
        let id = this.speciesCount + 1

        species.on.bind(Species.events.SPECIES_CREATED, this._onSpeciesCreated(species) )

        await species.init(url + `${id}/`);

        this.on.bind(StarWarsUniverse.events.SPECIES_CREATED, this._onUniverseSpecies(this.speciesCount))
    }

    _onSpeciesCreated(obj) {
        this.species.push(obj);

        this.emit(StarWarsUniverse.events.SPECIES_CREATED, this.speciesCount)
    }

    _onUniverseSpecies(count) {
        if(count < this._maxSpecies) {
            this.createSpecies();
        } else {
            this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED)
        }
    }
}