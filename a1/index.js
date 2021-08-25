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
const mewtwo = new Pokemon("MewTwo", 2, 'image', 'image');
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
characters[0] = articuno;
characters[1] = mewtwo;
characters[2] = blastoise;

let mainScreen = document.getElementById('game');

function contestants(pokemon1, pokemon2) {
    let contestant1 = document.getElementById('healthIndicator1');
    let contestant2 = document.getElementById('healthIndicator2');

    let pokemonName1 = pokemon1.name;
    let pokemonName2 = pokemon2.name;

    contestant1.innerHTML = `<h3 class="container pl-0 lead">Player - ${pokemonName1}</h3>`;
    contestant2.innerHTML = `<h3 class="container pl-0 lead">Computer - ${pokemonName2}</h3>`;
    
}   

function battle() {
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row mt-4 text-center">
                <h5 class="container">BATTLE!</h5>
            </div>
            <div class="row justify-content-around">
                <div class="col-5">
                    <div class="progress">            
                        <div class="progress-bar bg-success w-50"></div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="progress">
                        <div class="progress-bar bg-success w-50"></div>
                    </div>
                </div>
            </div>
            <div class="row mt-2 justify-content-around">
                <div class="col-5">
                    <div class="container lead pl-0" id="healthIndicator1"></div>
                </div>
                <div class="col-5">
                    <div class="container lead pl-0" id="healthIndicator2"></div>
                </div>
            </div>
        </div>
    `;
    
    let player = document.getElementById('healthIndicator1');
    let opponent = document.getElementById('healthIndicator2');
    player.innerHTML = `Player`;
    opponent.innerHTML = `Trainer Opponent`;
}

function characterSelected(index) {
    let characterScreen = document.getElementById('charcterSelectedScreen');
    characterChosen = characters[index];
    characterScreen.innerHTML = `
        <div class="row">
            <div class="col">
                <img src="${characterChosen.imageFront}" alt="No Image Found" class="img-fluid">
            </div>
        </div>
        <div class="row border">
            <div class="col-6">
                
            </div>
            <div class="col-6">
            
            </div>
        </div>
        <div class="row border">
            <div class="col-6">
                
            </div>
            <div class="col-6">
            
            </div>
        </div>
    `;
}

function characterSelection() {
    let pokemonSelection = characters.map(function(element){
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) { 
            return mainScreen.innerHTML = ` 
                <div class="row justify-content-center my-5">
                    <div class="col">
                        <button class="btn btn-dark" onmouseover="characterSelected(pokemonCount)">
                            <h1 class="display-3">${element.name}</h1>
                        </button>
                    </div>
                </div>
            `;}})
    pokemonSelection = pokemonSelection.join(" ")
    mainScreen.innerHTML = `
        <div class="col-3 mt-5 ml-3">
            <div class="btn-toolbar justify-content-center" role="toolbar">
                <div class="btn-group-vertical" role="group">
                    ${pokemonSelection}
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="row">
                <div class="col mr-3" id="characterSelectedScreen">

                </div>
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