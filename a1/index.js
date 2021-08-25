//Create a template for each pokemon.
//[OJECT BLUEPRINT TEMPLATE]
function Pokemon(name, lvl, front, back, element, basePower) {
    this.name = name;
    this.level = lvl;
    this.health = 50 * lvl;
    this.imageFront = front;
    this.imageBack = back;
    this.element = element;
    this.power = basePower * lvl;
}

//Create a template for each playing area.
function Battlefield(bg, name) {
    this.background = bg;
    this.name = name;
}


//List of playable characters. 
const mewtwo = new Pokemon("MewTwo", 5, './images/mewtwo.gif', './images/mew2back.gif', 'Psychic', 23);
const articuno = new Pokemon('Articuno', 5, './images/articuno.gif', './images/articunoBack.gif', 'Flying, Ice', 22);
const lugia = new Pokemon('Lugia', 5, './images/lugia.gif', './images/lugiaBack.gif', 'Flying, Psychic', 23);
const charizard = new Pokemon('Charizard', 5, './images/charmander.gif', './images/charmanderBack.gif', 'Flying, Fire', 24);
const venusaur = new Pokemon('Venusaur', 5, './images/venusaurFront.gif', './images/venusaurBack.gif', 'Grass, Poison', 23);

//List of playing area. 
const backyard = new Battlefield("image", "Backyard");
const volcano = new Battlefield('image', 'Volcano');

//we need to store each object inside a container. 
//we can use an Array() constructor
const areas = Array();
areas[0] = backyard;
areas[1] = volcano;

const characters = Array();
characters[0] = articuno;
characters[1] = mewtwo;
characters[2] = lugia;
characters[3] = charizard;
characters[4] = venusaur;

let mainScreen = document.getElementById('game');

function battleUpdate(pokemon1, pokemon2) {
    
}   

function battle(playerChosen) {
    let playerPokemon = characters[playerChosen];
    let opponentNumber = Math.ceil(Math.random() * characters.length)
    let randomPokemon = characters[opponentNumber];
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row mt-4 mb-5 text-center">
                <div class="col">
                    <h1 class="diplay-3">BATTLE!</h1>
                </div>
            </div>
            <div class="row justify-content-around">
                <div class="col-5">
                    <p class="lead">${playerPokemon.name}</p>
                </div>
                <div class="col-5 text-right">
                    <p class="lead">${randomPokemon.name}</p>
                </div>
            </div>
            <div class="row justify-content-around">
                <div class="col-5">
                    <div class="progress">            
                        <div class="progress-bar bg-success" id="playerPokemon"></div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="progress">
                        <div class="progress-bar bg-success" id="opponentPokemon"></div>
                    </div>
                </div>
            </div>
            <div class="row mt-2 justify-content-around">
                <div class="col-5">
                    <div class="container lead pl-0" id="healthIndicator1"></div>
                </div>
                <div class="col-5 text-right">
                    <div class="container lead pl-0" id="healthIndicator2"></div>
                </div>
            </div>
        </div>
    `;
    
    let player = document.getElementById('healthIndicator1');
    let opponent = document.getElementById('healthIndicator2');
    player.innerHTML = `Player`;
    opponent.innerHTML = `Computer`;
}

function characterSelected(playerChosen) {
    let characterScreen = document.getElementById('characterSelectedScreen');
    characterChosen = characters[playerChosen];
    characterScreen.innerHTML = `
        <div class="row">
            <div class="col text-center">
                <img src="${characterChosen.imageFront}" alt="No Image Found" class="img-fluid my-5 p-5" style="height: 500px;">
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <h1 class="display-5 mb-5">${characterChosen.name}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-6 border">
                <p class="lead  mb-0 mt-1">HEALTH: ${characterChosen.health}</p>
            </div>
            <div class="col-6 border">
                <p class="lead  mb-0 mt-1">LEVEL: ${characterChosen.level}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-6 border align-middle">
                <p class="lead mb-0 mt-1">ELEMENT/TYPE: ${characterChosen.element}</p>
            </div>
            <div class="col-6 border">
                <p class="lead  mb-0 mt-1">POWER: ${characterChosen.power}</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col text-center">
                <button class="d-inline-flex btn btn-outline-dark align-items-center" onclick="battle(${playerChosen})"><img src="https://img.icons8.com/ios-filled/50/000000/pokeball--v2.png" style="width: 30px" /><h1 class="lead ml-2 mt-1">SELECT</h1></button>
            </div>
        </div>
    `;
}

function characterSelection() {
    let pokemonIndexing = -1;
    let pokemonSelection = characters.map(function(element){
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) { 
            pokemonIndexing++;
            return mainScreen.innerHTML = ` 
                <div class="row justify-content-center my-4">
                    <div class="col">
                        <button class="btn btn-outline-secondary" onclick="characterSelected(${pokemonIndexing})" style="width: 400px">
                            <h1 class="display-3">${element.name}</h1>
                        </button>
                    </div>
                </div>
            `;
        }})
    pokemonSelection = pokemonSelection.join(" ")
    mainScreen.innerHTML = `
        <div class="col-3 mt-5 ml-3">
            <div class="row mb-5">
                <div class="col text-center">
                    <h1 class="display-3">Character Selection</h1>
                </div>
            </div>
            <div class="btn-toolbar justify-content-center" role="toolbar">
                <div class="btn-group-vertical" role="group">
                    ${pokemonSelection}
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="row justify-content-center">
                <div class="col" id="characterSelectedScreen"></div>
            </div>
        </div>
    `;
}

// add difficult layer if there is free time

function menu(){
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row justify-content-center my-5">
                <div class="col text-center">
                    <h1 class="display-1">Pokemon Mini Game</h1>
                </div>
            </div>
            <div class="row justify-content-center my-5">
                <div class="col text-center">
                    <h1 class="display-1 p-5"></h1>
                </div>
            </div>
            <div class="row justify-content-center my-5">
                <div class="col text-center">
                    <h1 class="display-1 p-5"></h1>
                </div>
            </div>
            <div class="row justify-content-center my-5">
                <div class="col text-center p-4">
                    <h1 class="display-4">Click <button type="button" onclick="characterSelection()" class="btn px-5 py-3 btn-info"> <h1 class="display-4">START</h1></button> to begin!</h1>
                </div>
            </div>
        </div>
    `;
}

menu();