//Create a template for each pokemon.
//[OJECT BLUEPRINT TEMPLATE]
function Pokemon(name, lvl, front, back) {
    this.name = name;
    this.level = lvl;
    this.health = 50 * lvl;
    this.imageFront = front;
    this.imageBack = back;
}

//Create a template for each playing area.
function Battlefield(bg, name) {
    this.background = bg;
    this.name = name;
}


//List of playable characters. 
const mewtwo = new Pokemon("Mew Two", 2, 'image', 'image');
const articuno = new Pokemon('Articuno', 2, 'image', 'image');

//List of playing area. 
const backyard = new Battlefield("image", "Backyard");
const volcano = new Battlefield('image', 'Volcano');

//we need to store each object inside a container. 
//we can use an Array() constructor
const areas = Array();
areas[0] = backyard;
areas[1] = volcano;

const characters = Array();
let a = characters[0] = articuno;
let b = characters[1] = mewtwo;

console.log(areas);
console.log(characters);
console.log(b);
