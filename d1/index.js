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

function Pokemon(name, level, type) {
    this.pokemonName = name;
    this.pokemonLevel = level;
    this.pokemonHealth = 80 * level; 
    this.pokemonType = type;
    this.attack = function(targetPokemon){
        console.log(this.pokemonName + " attacked " + targetPokemon.pokemonName);
    };
}

let charmander = new Pokemon('Charmander', 8, 'Fire');
console.log(charmander);

let pikachu = new Pokemon('Pikachu', 9, 'Lightning');
console.log(pikachu);

// recap

let person = {
    name: 'Christian',
    weight: '72kg',
    height: '172cm'
}

let computer = Object({
    weight: '80grams',
    color: 'white'
});

let player = Object();
player.height = '189cm';
player.skill = 'Basketball';
player.talent = 'Singing';

console.log(player)
console.log(typeof player)

player.specialty = 'Tailoring';
console.log(player)