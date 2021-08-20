// CREATING OBJECTS
/* let cellphone = {
    color: "whtie",
    weight: "155 grams",
    alarm: function(){
        console.log('Alarm is Buzzing');
    },
    ring: function(){
        console.log('Phone is ringing');
    }
} */

let cellphone = Object();
console.log(typeof cellphone);
cellphone.weight = '115 grams';
cellphone.color = 'black';
cellphone.ring = function() {
    console.log('Cellphone is ringing');
};
console.log(cellphone)

function Laptop() {
    this.weight = '500 grams';
}
// Disconnected //

function Pokemon(name, level, type, front, back) {
    this.pokemonName = name;
    this.pokemonLevel = level;
    this.pokemonHealth = 80 * level; 
    this.pokemonType = type;
    this.attack = function(targetPokemon){
        console.log(this.pokemonName + " attacked " + targetPokemon.pokemonName);
    };
    this.imageFront = front;
    this.imageBack = back;
}

function Battlefield(bg, name) {
    this.background = bg;
    this.name = name;
}

let charmander = new Pokemon('Charmander', 8, 'Fire');
console.log(charmander);

let pikachu = new Pokemon('Pikachu', 9, 'Lightning');
console.log(pikachu);

// recap

let person = {
    name: 'Christian',
    weight: '72kg',
    height: '172cm',
    location: {
        city: 'Las Pinas'
    }
}

let computer = Object({
    weight: '80grams',
    color: 'white'
});

let player = Object();
player.height = '189cm';
player.skill = 'Basketball';
player.talent = 'Singing';

console.log(player);
console.log(typeof player);

player.specialty = 'Tailoring';
console.log(player);

// How to access a propert of an Object.
console.log(computer.color);
console.log(player.skill);
console.log(person.location.city)

let Car = Object();
Car.name = 'Honda Civic';
Car.color = 'Red';

let Mobile = {};
Mobile.name = 'Samsung';
Mobile.network = 'Globe';

Car['Manufacture Date'] = 2019;
Mobile['number'] = '09272586350';

console.log(Car);
console.log(Mobile);

