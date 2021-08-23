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
const blastoise = new Pokemon('Blastoise', 2, 'image', 'image')

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
characters[2] = blastoise;


function battle() {
    let game = document.getElementById('game');
    game.innerHTML = `
        <div class="col">
            <div class="row text-center">
                <h5 class="container">BATTLE!</h5>
            </div>
            <div class="row justify-content-around">
                <div class="col-5 progress">
                    <div class="progress-bar bg-success w-50"></div>
                </div>
                <div class="col-5 progress">
                    <div class="progress-bar bg-success w-50"></div>
                </div>
            </div>
            <div class="row mt-2 justify-content-around">
                <div class="col-5">
                    <div class="container lead" id="healthIndicator1"></div>
                </div>
                <div class="col-5">
                    <div class="container lead" id="healthIndicator2"></div>
                </div>
            </div>
        </div>
    `;
    
    let player = document.getElementById('healthIndicator1');
    let opponent = document.getElementById('healthIndicator2');
    player.innerHTML = `Player`;
    opponent.innerHTML = `Trainer Opponent`;
}

function play(player1, player2) {
    let game = document.getElementById('game');

    let pokemon = characters.map(function(element){
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) {
            return game.innerHTML = `
                <div class="row">
                     <h4 class="col lead">${element.name}</h4>
                </div>
            `
        }
    })
    pokemon = pokemon.join(" ")
    if (!player1 || !player2) {
        game.innerHTML = `
            <div class="col lead">Missing Player | Please select Player: \n
                ${pokemon}
            </div>
        `;
    let playerUser = prompt("Please select a character: ", 'Articuno');
    playerUser = playerUser.toLowerCase();
    battle(playerUser, mewtwo);
    } else {
        battle()
    }
}

play(articuno);