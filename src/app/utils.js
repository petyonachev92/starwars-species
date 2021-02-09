/**
 * Here you can define helper functions to use across your app.
 */

export default function _onSpeciesCreated(obj, obj2) {
    console.log('event');
    obj2.species.push(obj);
    console.log(obj2.speciesCount);
    console.log(obj2.species);

    
    obj.emit(obj2.events.SPECIES_CREATED,
        {
            speciesCount: obj2.speciesCount
        });

    console.log('end')
};