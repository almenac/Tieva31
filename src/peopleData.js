import Population from './Population'

let pop = new Population("NZ");

let maxPeople = 5;
let people = [];

for(var i = 0; i < maxPeople; i++){
    people.push(pop.nextPerson())
}

export default people;