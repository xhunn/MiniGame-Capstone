function Pokemon(name, lvl, front, back) {
    this.name = name;
    this.level = lvl;
    this.health = 50 * lvl;
    this.imageFront = './images/' + front; //we need to get the full path of the image
    this.imageBack = './images/' + back;
}

function Battlefield(bg, name) {
    this.background = bg;
    this.name = name;
}

const mewtwo = new Pokemon("Mew Two", 2, 'mewtwo.gif', 'mewtwoBack.gif');
const articuno = new Pokemon('Articuno', 2, 'articuno.gif', 'articunoBack.gif');
const blastoise = new Pokemon('Blastoise', 3, 'blastoise.gif', 'blastoiseBack.gif');

const backyard = new Battlefield("image", "Backyard");
const volcano = new Battlefield('image', 'Volcano');

const areas = Array();
let x = areas[0] = backyard;
let y = areas[1] = volcano;

const characters = Array();
let a = characters[0] = articuno;
let b = characters[1] = mewtwo;
let c = characters[2] = blastoise;

function contestants(pokemon1, pokemon2) { //get the information about the players.
    let contestant1 = document.getElementById('healthIndicator1');
    let contestant2 = document.getElementById('healthIndicator2');
    let name1 = pokemon1.name;
    let hp1 = pokemon1.health
    let hp2 = pokemon2.health
    let char1Level = pokemon1.level;
    let char2Level = pokemon2.level;
    let name2 = pokemon2.name;

    contestant1.innerHTML = `
       <div class="mt-2">
       	  <h4>${name1}</h4>
          <h5>Level: ${char1Level} </h5>
          <h5> ${hp1 + '/' + hp1} </h5> 
          <img height="370" src="${pokemon1.imageBack}" alt="file not found"/>
       </div>
   	 `
    contestant2.innerHTML = `
      <div class="mt-2">
          <h4>${name2}</h4>
          <h5>Level: ${char2Level} </h5>
          <h5> ${hp2 + '/' + hp2} </h5>
          <img height="170" src="${pokemon2.imageFront}"/>
      </div>
     `
}

function battle(contestant1, contestant2) {
    let game = document.getElementById('game');
    game.innerHTML = `
 
 	        <div class="container mt-5 mb-2">
	        	<h5>Battle!</h5>
	        </div>
	        <div class="row">
	        	<!-- healthbar p1 -->
	        	<div class="col">
              <h5>HP: </h5>
	        		<div class="container" id="health1">
	        			<progress class="progress-bar w-50" id="health1"></progress>			
	        		</div>
	        	</div>
	        	<!-- healthbar p2 -->
	        	<div class="col">
              <h5>HP: </h5>
	        		<div class="container" id="health2">
	        			<progress class="progress-bar w-50" id="health2"></progress>			
	        		</div>
	        	</div>
	        </div>
	      `;
    contestants(contestant1, contestant2);
}

function play(player1, player2) {
    if (!player1 && !player2) {
        // play();  
        battle(player1, player2);
    } else {
        battle(player1, player2);
    }
}

play(articuno, articuno);