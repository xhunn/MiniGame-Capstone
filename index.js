//Create a template for each pokemon.
//[OJECT BLUEPRINT TEMPLATE]
function Pokemon(name, lvl, front, back, type, basePower, mainType, description) {
    this.name = name;
    this.level = lvl;
    this.health = 50 * lvl;
    this.imageFront = front;
    this.imageBack = back;
    this.element = type;
    this.power = basePower * lvl;
    this.mainType = mainType;
    this.specialDescription = description;
}

//Create a template for each playing area.
function Battlefield(bg, name) {
    this.background = bg;
    this.name = name;
}


//List of playable characters.
const mewtwo = new Pokemon("MewTwo", 5, './images/mewtwoFront.gif', './images/mewtwoBack.gif', 'Psychic', 5, 'Psychic', 'Psychic wave');
const articuno = new Pokemon('Articuno', 5, './images/articunoFront.gif', './images/articunoBack.gif', 'Flying, Ice',
    5, 'Ice', 'Ice Beam');
const lugia = new Pokemon('Lugia', 5, './images/lugiaFront.gif', './images/lugiaBack.gif', 'Flying, Psychic', 5, 'Psychic', 'Psyshock');
const charizard = new Pokemon('Charizard', 5, './images/charizardFront.gif', './images/charizardBack.gif', 'Flying, Fire', 5, 'Fire', 'Blaze');
const venusaur = new Pokemon('Venusaur', 5, './images/venusaurFront.gif', './images/venusaurBack.gif', 'Grass, Poison',
    5, 'Grass', 'Magical Leaf');
const ninetales = new Pokemon('Ninetales', 5, './images/ninetalesFront.gif', './images/ninetalesBack.gif', 'Fire', 5, 'Fire', 'Incinerate')
const blastoise = new Pokemon('Blastoise', 5, './images/blastoiseFront.gif', './images/blastoiseBack.gif', 'Water', 5, 'Water', 'Hydro Pump')

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
characters[5] = ninetales;
characters[6] = blastoise;

const background = Array();
background[3] = './images/volcano.png';
background[1] = './images/backyard.png';
background[2] = './images/gym.png';
background[0] = './images/ice.png';

let mainScreen = document.getElementById('game');
let footer = document.getElementById('footer');
let turnPlay = 2;
let currentEnvironment = 0;

// Player Pokemon Stats Update
let playerPokemon;
let userHealth;

// Enemy Pokemon Stats Update
let opponentPokemon;
let opponentHealth;

let animationDamage;
let animationHeal;
let animationLose;

let pokemonPlayer;
let pokemonOpponent;

const levelClear = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        userPokemonImage.style.animation = `fadeAway 1s linear`;
        userPokemonImage.style.opacity = '0%';
    } else {
        opponentPokemonImage.style.animation = `fadeAway 1s linear`;
        opponentPokemonImage.style.opacity = '0%';
    }
}

// const shake = () => {
// const userPokemonImage = document.getElementById('battleImageBack');
// const opponentPokemonImage = document.getElementById('battleImageFront');
// if (turnPlay % 2 === 0) {
// userPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
// } else {
// opponentPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
// }
// }

// const glow = () => {
// const userPokemonImage = document.getElementById('battleImageBack');
// const opponentPokemonImage = document.getElementById('battleImageFront');
// console.log('Current turn Play for heal: ' + turnPlay);
// if (turnPlay % 2 === 0) {
// console.log('Current turn Play for heal: ' + turnPlay);
// userPokemonImage.style.animation = `glowHeal 1s linear infinite`
// } else {
// opponentPokemonImage.style.animation = `glowHeal 1s linear infinite`
// }
// }
const effective = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        let critChance = Math.random() * 100;
        console.log('User Crit Chance: ' + critChance);
        if (critChance >= 85) {
            // crit
            let damage = playerPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 2);
            document.getElementById('battleMessage').innerHTML = `Effective! ${playerPokemon.name}'s ${playerPokemon.specialDescription} crit for ${damage}`;
            let totalHp = opponentHealth - damage;
            opponentHealth = totalHp;
        } else {
            // normal
            let damage = opponentPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 1.5);
            document.getElementById('battleMessage').innerHTML = `Effective! ${playerPokemon.name}'s ${playerPokemon.specialDescription} damaged for ${damage}`;
            console.log("enemy damage you for: " + damage);
            let totalHp = opponentHealth - damage;
            opponentHealth = totalHp;
        }
        opponentPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    } else {
        let critChance = Math.random() * 100;
        console.log('Enemy Crit Chance: ' + critChance);
        if (critChance >= 85) {
            // crit
            let damage = opponentPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 2);
            document.getElementById('battleMessage').innerHTML = `Effective! ${opponentPokemon.name}'s ${opponentPokemon.specialDescription} crit for ${damage}`;
            console.log("enemy damage you for: " + damage);
            let totalHp = userHealth - damage;
            userHealth = totalHp;
        } else {
            // normal
            let damage = opponentPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 1.5);
            document.getElementById('battleMessage').innerHTML = `Effective! ${opponentPokemon.name}'s ${opponentPokemon.specialDescription} damaged for ${damage}`;
            console.log("enemy damage you for: " + damage);
            let totalHp = userHealth - damage;
            userHealth = totalHp;
        }
        userPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    }
    turnPlay++;
    setTimeout(() => {
        battleUpdate()
    }, 3000);
}
const notEffective = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        let damage = opponentPokemon.power + (Math.random() * 20);
        damage = Math.ceil(damage * .5);
        document.getElementById('battleMessage').innerHTML = `Inffective! ${playerPokemon.name}'s ${playerPokemon.specialDescription} damaged for ${damage}`;
        console.log("enemy damage you for: " + damage);
        let totalHp = opponentHealth - damage;
        opponentHealth = totalHp;

        opponentPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    } else {
        let damage = opponentPokemon.power + (Math.random() * 20);
        damage = Math.ceil(damage * .5);
        document.getElementById('battleMessage').innerHTML = `Inffective! ${opponentPokemon.name}'s ${opponentPokemon.specialDescription} damaged for ${damage}`;
        console.log("enemy damage you for: " + damage);
        let totalHp = userHealth - damage;
        userHealth = totalHp;

        userPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    }
    turnPlay++;
    setTimeout(() => {
        battleUpdate()
    }, 3000);
}
const specialAttack = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        let damage = opponentPokemon.power + (Math.random() * 20);
        damage = Math.ceil(damage)
        document.getElementById('battleMessage').innerHTML = `No effect. ${playerPokemon.name}'s ${playerPokemon.specialDescription} damaged for ${damage}`;
        let totalHp = opponentHealth - damage;
        opponentHealth = totalHp;

        opponentPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    } else {
        let damage = opponentPokemon.power + (Math.random() * 20);
        damage = Math.ceil(damage)
        document.getElementById('battleMessage').innerHTML = `No effect. ${opponentPokemon.name}'s ${opponentPokemon.specialDescription} damaged for ${damage}`;
        let totalHp = userHealth - damage;
        userHealth = totalHp;

        userPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    }
    turnPlay++;
    setTimeout(() => {
        battleUpdate()
    }, 3000);
}
const checker = (who) => {
    let attacker;
    let defender;
    if (who === 'player') {
        attacker = playerPokemon;
        defender = opponentPokemon;
    } else {
        attacker = opponentPokemon;
        defender = playerPokemon;
    }
    let typeAttacker = attacker.mainType;
    let typeDefender = defender.mainType;
    typeAttacker = typeAttacker.toLowerCase();
    typeDefender = typeDefender.toLowerCase();
    console.log('Attacker: ' + typeAttacker);
    console.log('Defender: ' + typeDefender);
    if (typeAttacker === 'psychic') {
        if (typeDefender === 'psychic') {
            notEffective();
        } else {
            specialAttack();
        }

    } else if (typeAttacker === 'water') {
        if (typeDefender === 'water') {
            notEffective();
        } else if (typeDefender === 'fire') {
            effective();
        } else if (typeDefender === 'grass') {
            notEffective();
        } else {
            specialAttack();
        }
    } else if (typeAttacker === 'fire') {
        if (typeDefender === 'water') {
            notEffective();
        } else if (typeDefender === 'fire') {
            notEffective();
        } else if (typeDefender === 'grass') {
            effective();
        } else if (typeDefender === 'ice') {
            effective();
        } else {
            specialAttack();
        }
    } else if (typeAttacker === 'grass') {
        if (typeDefender === 'water') {
            effective();
        } else if (typeDefender === 'fire') {
            notEffective();
        } else if (typeDefender === 'grass') {
            notEffective();
        } else {
            specialAttack();
        }
    } else if (typeAttacker === 'ice') {
        if (typeDefender === 'fire') {
            notEffective();
        } else if (typeDefender === 'grass') {
            effective();
        } else if (typeDefender === 'ice') {
            notEffective();
        } else {
            specialAttack();
        }
    }
}

const attack = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        let critChance = Math.random() * 100;
        console.log('User Crit Chance: ' + critChance);
        if (critChance >= 85) {
            // crit
            let damage = playerPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 1.5);
            document.getElementById('battleMessage').innerHTML = `${playerPokemon.name} crit for ${damage}`;
            let totalHp = opponentHealth - damage;
            opponentHealth = totalHp;
        } else {
            // normal
            let damage = playerPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage);
            document.getElementById('battleMessage').innerHTML = `${playerPokemon.name} attacked for ${damage}`;
            let totalHp = opponentHealth - damage;
            opponentHealth = totalHp;
        }
        opponentPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    } else {
        let critChance = Math.random() * 100;
        console.log('Enemy Crit Chance: ' + critChance);
        if (critChance >= 85) {
            // crit
            let damage = opponentPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage * 1.5);
            document.getElementById('battleMessage').innerHTML = `${opponentPokemon.name} crit for ${damage}`;
            console.log("enemy damage you for: " + damage);
            let totalHp = userHealth - damage;
            userHealth = totalHp;
        } else {
            // normal
            let damage = opponentPokemon.power + (Math.random() * 20);
            damage = Math.ceil(damage);
            document.getElementById('battleMessage').innerHTML = `${opponentPokemon.name} attacked for ${damage}`;
            console.log("enemy damage you for: " + damage);
            let totalHp = userHealth - damage;
            userHealth = totalHp;
        }
        userPokemonImage.style.animation = `shakeCharacter .2s linear infinite`
    }
    turnPlay++;
    setTimeout(() => {
        battleUpdate()
    }, 3000);
}

const heal = () => {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');
    if (turnPlay % 2 === 0) {
        if (userHealth >= playerPokemon.health) {
            document.getElementById('battleMessage').innerHTML = `${playerPokemon.name} is already max HP`
        } else {
            userPokemonImage.style.animation = `glowHeal 1s linear 5`
            let replenish = Math.ceil((Math.random() * 20) + 20);
            userHealth = userHealth + replenish;
            document.getElementById('battleMessage').innerHTML = `${playerPokemon.name} healed for ${replenish}`
        }
    } else {
        opponentPokemonImage.style.animation = `glowHeal 1s linear 5`
        let replenish = Math.ceil((Math.random() * 20) + 20);
        opponentHealth = opponentHealth + replenish;
        document.getElementById('battleMessage').innerHTML = `${opponentPokemon.name} healed for ${replenish}`
    }
    if (userHealth >= playerPokemon.health) {
        userHealth = playerPokemon.health;
    }
    if (opponentHealth >= opponentPokemon.health) {
        opponentHealth = opponentPokemon.health;
    }
    turnPlay++;
    setTimeout(() => {
        battleUpdate()
    }, 3000);
}

const special = () => {
    if (turnPlay % 2 === 0) {
        checker('player');
    } else {
        checker('opponent');
    }
}

const environment = () => {
    if (currentEnvironment >= 4) {
        currentEnvironment = 0;
    }
    console.log(background[currentEnvironment]);
    document.getElementById('field').style.backgroundImage = `url(${background[currentEnvironment]})`;
    currentEnvironment++;
}


function battleUpdate() {
    const userPokemonImage = document.getElementById('battleImageBack');
    const opponentPokemonImage = document.getElementById('battleImageFront');

    // clearInterval(animationDamage);
    // clearInterval(animationHeal);

    document.getElementById('battleImageBack').style.animationPlayState = `paused`;
    document.getElementById('battleImageFront').style.animationPlayState = `paused`;

    let playerWidth = (userHealth / playerPokemon.health) * 100;
    let oppponentWidth = (opponentHealth / opponentPokemon.health) * 100;

    document.getElementById('playerHealthBar').style.width = `${playerWidth}%`;
    document.getElementById('opponentHealthBar').style.width = `${oppponentWidth}%`;

    document.getElementById('playerHealthText').innerHTML = `${userHealth} / ${playerPokemon.health}`;
    document.getElementById('opponentHealthText').innerHTML = `${opponentHealth} / ${opponentPokemon.health}`;
    if (userHealth <= 0 || opponentHealth <= 0) {
        if (userHealth <= 0) {
            document.getElementById('battleMessage').innerHTML = `Oh no!`
            document.getElementById('playerHealthBar').style.width = `0%`;
            document.getElementById('playerHealthText').innerHTML = `0 / ${playerPokemon.health}`;
            userPokemonImage.style.animation = `fadeAway 1s linear`; userPokemonImage.style.opacity = '0%';
        } else {
            document.getElementById('battleMessage').innerHTML = `You've cleared it!`
            document.getElementById('opponentHealthBar').style.width = `0%`;
            document.getElementById('opponentHealthText').innerHTML = `0 / ${opponentPokemon.health}`;
            opponentPokemonImage.style.animation = `fadeAway 1s linear`; opponentPokemonImage.style.opacity = '0%';
        }
        animationLose = setInterval(levelClear(), .5);
    } else {
        if (turnPlay % 2 === 0) {
            document.getElementById('battleMessage').innerHTML = `It's your turn`
        } else {
            let chooseSkill;
            document.getElementById('battleMessage').innerHTML = `It's your opponent's turn`
            if (opponentHealth != opponentPokemon.health) {
                chooseSkill = Math.ceil((Math.random() * 3) - 1);
                console.error('The opponent chose: ' + chooseSkill);
            } else {
                chooseSkill = Math.ceil((Math.random() * 2) - 1);
                console.error('The opponent chose: ' + chooseSkill);
            }
            if (chooseSkill === 0) {
                attack()
            } else if (chooseSkill === 1) {
                special()
            } else {
                heal()
            }
        }
    }
}

function battle(playerChosen, selectedOpponent = undefined) {
    console.log('This is the pokemon selected by player: ' + playerChosen);
    console.log('This is the pokemon selected for Opponent: ' + selectedOpponent);
    if (selectedOpponent === undefined) {
        let opponentNumber = Math.ceil((Math.random() * characters.length) - 1);
        opponentPokemon = characters[opponentNumber];
    } else {
        opponentPokemon = characters[selectedOpponent];
    }
    playerPokemon = characters[playerChosen];
    document.getElementById('field').style.backgroundImage = `url('./images/volcano.png')`
    if (turnPlay === 2) {
        userHealth = playerPokemon.health;
        opponentHealth = opponentPokemon.health;
    }
    mainScreen.innerHTML = ` <div class="col">
    <div class="row mt-4 mb-5 text-center">
        <div class="col">
            <h1 class="d-inline-flex auto-font-size-titles p-1 pl-3 border border-dark rounded background-battle-ui"
                id="battle">BATTLE!</h1>
        </div>
    </div>
    <div class="row justify-content-around">
        <div class="col-5">
            <p
                class="d-inline-flex background-battle-ui auto-font-size-description border border-dark rounded-top mt-2 mb-0 px-1 pb-1">
                ${playerPokemon.name}</p>
        </div>
        <div class="col-5 text-right">
            <p
                class="d-inline-flex background-battle-ui auto-font-size-description border border-dark rounded-top mt-2 mb-0 px-1 pb-1">
                ${opponentPokemon.name}</p>
        </div>
    </div>
    <div class="row justify-content-around">
        <div class="col-5">
            <div class="container border border-dark rounded-right background-battle-ui px-1 py-1">
                <div class="progress p-1">
                    <div class="progress-bar bg-success" id="playerHealthBar">
                        <p class="auto-font-size-health position-absolute" id="playerHealthText">${userHealth} /
                            ${playerPokemon.health}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="container border border-dark rounded-left background-battle-ui px-1 py-1">
                <div class="progress p-1">
                    <div class="progress-bar bg-success" id="opponentHealthBar">
                        <p class="auto-font-size-health auto-font-size-health position-absolute"
                            id="opponentHealthText">${opponentHealth} / ${opponentPokemon.health}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-around">
        <div class="col-5">
            <div class="d-inline-flex background-battle-ui auto-font-size-description border border-dark rounded-bottom mb-2 mt-0 px-1 pt-1"
                id="healthIndicator1"></div>
        </div>
        <div class="col-5 text-right">
            <div class="d-inline-flex background-battle-ui auto-font-size-description border border-dark rounded-bottom mb-2 mt-0 px-1 pt-1"
                id="healthIndicator2"></div>
        </div>
    </div>
    <div class="row mt-5 justify-content-around">
        <div class="col-5 mt-5 pt-5 text-center">
            <img src="${playerPokemon.imageBack}" alt="no image found" class="img-fluid auto-image-battle-back"
                id="battleImageBack">
        </div>
        <div class="col-5 mt-2 text-center">
            <img src="${opponentPokemon.imageFront}" alt="no image found" class="img-fluid auto-image-battle-front"
                id="battleImageFront">
        </div>
    </div>
    <div class="row p-3 mt-5 justify-content-around">
        <div class="col-6 p-3 border border-dark rounded background-battle-ui align-middle text-center border-special">
            <p class="d-inline-flex auto-font-size-description" id="battleMessage">You've encountered a
                ${opponentPokemon.name}</p>
        </div>
        <div class="col-4 d-inline-flex border border-dark rounded background-battle-ui p-3 text-center">
            <div class="row d-inline-flex ">
                <div class="col text-right">
                    <button class="btn btn-outline-dark auto-font-size-description button-battle" onclick="attack()"
                        data-toggle="popover" data-placement="top" data-trigger="hover"
                        data-content="Damage based on the pokemon's base power (15% chance of crit)">Attack</button>
                </div>
                <div class="col text-right mt-2">
                    <button class="btn btn-outline-dark auto-font-size-description button-battle" onclick="heal()"
                        data-toggle="popover" data-placement="bottom" data-trigger="hover"
                        data-content="Apply health potion that may replenish 20 - 40 health points">Heal</button>
                </div>
            </div>
            <div class="row d-inline-flex">
                <div class="col ml-2 text-left">
                    <button class="btn btn-outline-dark auto-font-size-description button-battle" onclick="special()"
                        data-toggle="popover" data-placement="top" data-trigger="hover"
                        data-content="Let pokemon use special attack">Special</button>
                </div>
                <div class="col ml-2 text-left mt-2">
                    <button class="btn btn-outline-dark auto-font-size-description button-battle"
                        onclick="environment()" data-toggle="popover" data-placement="bottom" data-trigger="hover"
                        data-content="Change the background">Environment</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
    // Initialize tooltip component
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    // Initialize popover component
    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    footer.classList.add('mt-5')
    footer.classList.remove('fixed-bottom')

    let player = document.getElementById('healthIndicator1');
    let opponent = document.getElementById('healthIndicator2');

    player.innerHTML = `Player`;
    opponent.innerHTML = `Computer`;

    if (turnPlay === 2) {
        document.getElementById('playerHealthBar').style.width = `100%`;
        document.getElementById('opponentHealthBar').style.width = `100%`;
    }

    setTimeout(() => {
        battleUpdate()
    }, 3000);
}

function characterSelected(playerChosen) {
    let characterScreen = document.getElementById('characterSelectedScreen');
    characterChosen = characters[playerChosen];
    characterScreen.innerHTML = `
    <div class="row">
        <div class="col text-center">
            <img src="${characterChosen.imageFront}" alt="No Image Found" id="character-selection-image"
                class="img-fluid mb-5 mt-4 pb-5">
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <h1 class="auto-font-size-titles mb-5">${characterChosen.name}</h1>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 border border-dark  background-battle-ui">
            <p class="auto-font-size-description  mb-0 mt-1">HEALTH: ${characterChosen.health}</p>
        </div>
        <div class="col-4 border border-dark  background-battle-ui">
            <p class="auto-font-size-description  mb-0 mt-1">LEVEL: ${characterChosen.level}</p>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 border border-dark align-middle background-battle-ui">
            <p class="auto-font-size-description mb-0 mt-1">TYPE: ${characterChosen.element}</p>
        </div>
        <div class="col-4 border border-dark  background-battle-ui">
            <p class="auto-font-size-description  mb-0 mt-1">POWER: ${characterChosen.power}</p>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col text-center">
            <button class="d-inline-flex btn btn-outline-dark bg-light text-dark align-items-center" onclick="battle(${playerChosen})"><img
                    src="https://img.icons8.com/ios-glyphs/50/000000/pokemon--v2.png" id="pokeballSelect" />
                <h1 class="auto-font-size-description ml-2 mt-2">SELECT</h1>
            </button>
        </div>
    </div>
    `;
}

function characterSelection() {
    let pokemonIndexing = -1;
    let pokemonSelection = characters.map(function (element) {
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) {
            console.log(pokemonCount);
            pokemonIndexing++; return mainScreen.innerHTML = ` <div class="row justify-content-center my-4">
        <div class="col">
            <button class="btn btn-outline-dark bg-light text-dark" id="button-character" onclick="characterSelected(${pokemonIndexing})">
                <h1 class="auto-font-size-button game-text pt-2">${element.name}</h1>
            </button>
        </div>
        </div>
        `;

        }
    })
    pokemonSelection = pokemonSelection.join(" ")
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row mt-5 mb-2">
                <div class="col text-center">
                    <h1 class="auto-font-size-header game-text">Character Selection</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-3 mt-5 ml-3">
                    <div class="btn-toolbar justify-content-center" role="toolbar">
                        <div class="btn-group-vertical" role="group">
                            ${pokemonSelection}
                        </div>
                    </div>
                </div>
                <div class="col-8 mt-0">
                    <div class="row justify-content-center">
                        <div class="col" id="characterSelectedScreen"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    if (characters.length >= 6) {
        footer.classList.remove('fixed-bottom');
        footer.classList.add('mt-5');
    }
}

// add difficult layer if there is free time

let characterSelectedPC = (pokemonChosen, who) => {
    if (who === 0) {
        let characterScreen = document.getElementById('characterSelectedScreen');
        let characterChosen = characters[pokemonChosen];
        pokemonPlayer = pokemonChosen;
        characterScreen.innerHTML = `
        <div class="row">
            <div class="col text-center">
                <img src="${characterChosen.imageFront}" alt="No Image Found" id="character-selection-image"
                    class="img-fluid mb-5 mt-4 pb-5">
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <h1 class="auto-font-size-titles mb-5">${characterChosen.name}</h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">HEALTH: ${characterChosen.health}</p>
            </div>
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">LEVEL: ${characterChosen.level}</p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4 border border-dark align-middle background-battle-ui">
                <p class="auto-font-size-description mb-0 mt-1">TYPE: ${characterChosen.element}</p>
            </div>
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">POWER: ${characterChosen.power}</p>
            </div>
        </div>
    `;
    } else {
        let opponentScreen = document.getElementById('characterSelectedScreenPC');
        let opponentChosen = characters[pokemonChosen];
        pokemonOpponent = pokemonChosen;
        opponentScreen.innerHTML = `
        <div class="row">
            <div class="col text-center">
                <img src="${opponentChosen.imageFront}" alt="No Image Found" id="character-selection-image"
                    class="img-fluid mb-5 mt-4 pb-5">
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <h1 class="auto-font-size-titles mb-5">${opponentChosen.name}</h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">HEALTH: ${opponentChosen.health}</p>
            </div>
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">LEVEL: ${opponentChosen.level}</p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4 border border-dark align-middle background-battle-ui">
                <p class="auto-font-size-description mb-0 mt-1">TYPE: ${opponentChosen.element}</p>
            </div>
            <div class="col-4 border border-dark  background-battle-ui">
                <p class="auto-font-size-description  mb-0 mt-1">POWER: ${opponentChosen.power}</p>
            </div>
        </div>
        `;
    }
    console.warn(pokemonOpponent);
    console.warn(pokemonPlayer);
    if (pokemonOpponent != undefined && pokemonPlayer != undefined) {
        document.getElementById('selectorButton').innerHTML = `
            <div class="col">
                <button class="d-inline-flex btn btn-outline-dark bg-light text-dark align-items-center" onclick="battle(${pokemonPlayer},${pokemonOpponent})"><img
                        src="https://img.icons8.com/ios-glyphs/50/000000/pokemon--v2.png" id="pokeballSelect" />
                    <h1 class="auto-font-size-description ml-2 mt-2">SELECT</h1>
                </button>
            </div>
        `;
    }
}

let characterSelectionPC = () => {
    let pokemonIndexing = -1;
    let pokemonSelection = characters.map(function (element) {
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) {
            console.log(pokemonCount);
            pokemonIndexing++; return mainScreen.innerHTML = `
        <div class="row justify-content-center my-4">
            <div class="col">
                <button class="btn btn-outline-dark bg-light text-dark" id="button-character" onclick="characterSelectedPC(${pokemonIndexing}, 0)">
                    <h1 class="auto-font-size-button game-text pt-2">${element.name}</h1>
                </button>
            </div>
        </div>
        `;
        }
    })
    pokemonSelection = pokemonSelection.join(" ");
    pokemonIndexing = -1;
    let opponentSelection = characters.map(function (element) {
        for (let pokemonCount = 0; pokemonCount < characters.length; pokemonCount++) {
            console.log(pokemonCount);
            pokemonIndexing++; return mainScreen.innerHTML = `
        <div class="row justify-content-center my-4">
            <div class="col">
                <button class="btn btn-outline-dark bg-light text-dark" id="button-character" onclick="characterSelectedPC(${pokemonIndexing}, 1)">
                    <h1 class="auto-font-size-button game-text pt-2">${element.name}</h1>
                </button>
            </div>
        </div>
        `;
        }
    })
    opponentSelection = opponentSelection.join(" ");
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row mt-5 mb-2">
                <div class="col text-center">
                    <h1 class="auto-font-size-header game-text">Character Selection</h1>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-2 mt-5 ml-3 text-right">
                    <div class="row">
                        <div class="col text-center">
                            <h1 class="auto-font-size-titles">Player</h1>
                        </div>
                    </div>
                    <div class="row overflow-auto">
                        <div class="col">
                            <div class="btn-toolbar justify-content-center" role="toolbar">
                                <div class="btn-group-vertical" role="group">
                                    ${pokemonSelection}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 mt-0 text-center">
                    
                    <div class="row justify-content-center" id="selectionReport">
                        <div class="col-6" id="characterSelectedScreen"></div>
                        <div class="col-6" id="characterSelectedScreenPC"></div>
                    </div>
                    <div class="row justify-content-center mt-5" id="selectorButton">
                    </div>
                </div>
                <div class="col-2 mt-5 ml-3 text-center">
                    <div class="row">
                        <div class="col">
                            <h1 class="auto-font-size-titles text-center">Opponent</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="btn-toolbar justify-content-center" role="toolbar">
                                <div class="btn-group-vertical" role="group">
                                    ${opponentSelection}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    if (characters.length >= 6) {
        footer.classList.remove('fixed-bottom');
        footer.classList.add('mt-5');
    }
}

let menu = () => {
    mainScreen.innerHTML = `
        <div class="col mt-5 pt-5">
            <!-- Character Selection -->
            <div class="row mt-5">
                <!-- Title -->
                <div class="col text-center mt-5">
                    <h1 class="auto-font-size-titles">Opponent Selection</h1>
                </div>
            </div>
            <div class="row">
                <!-- Buttons -->
                <div class="col text-right">
                    <button class="btn btn-outline-dark bg-light text-dark" id="button-character"
                        onclick="characterSelection()">
                        <h1 class="auto-font-size-button game-text pt-2">Random</h1>
                    </button>
                </div>
                <div class="col text-left">
                    <button class="btn btn-outline-dark bg-light text-dark" id="button-character" onclick="characterSelectionPC()">
                        <h1 class="auto-font-size-button game-text pt-2">Selected</h1>
                    </button>
                </div>
            </div>
        </div>
    `
}

function start() {
    mainScreen.innerHTML = `
        <div class="col">
            <div class="row justify-content-center my-5">
                <div class="col text-center">
                    <h1 class="display-1 game-text game-shadow">Pokemon Mini Game</h1>
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
                    <h1 class="display-4 game-text game-shadow">Click <button type="button"
                            onclick="menu()" class="btn btn-outline-dark game-shadow px-5 pt-4 mb-3">
                            <h1 class="display-4">START</h1>
                        </button> to begin!</h1>
                </div>
            </div>
        </div>
        `;
}

start();