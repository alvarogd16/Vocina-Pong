//Variables
let ANCHO, ALTO;
let puntosJug1 = 0;
let puntosJug2 = 0;

let velocidades = [-8, -7, -6, -5, 5, 6, 7, 8];
let tamPel = 30;
let posXPel;
let posYPel;
let velXPel;
let velYPel;

let posXJug1;
let posYJug1;
let tamYRaqJug1 = 200;
let tamXRaqJug1 = 10;

let posXJug2;
let posYJug2;
let tamYRaqJug2 = 200;
let tamXRaqJug2 = 10;

function setup() {
	ANCHO = windowWidth;
	ALTO = windowHeight;
	createCanvas(ANCHO, ALTO);
	
	inicio();
}

function inicio(){
	velXPel = random(velocidades);
	velYPel = random(velocidades);
	posXPel = ANCHO/2;
	posYPel = ALTO/2;
	posXJug1 = ANCHO-40;
	posYJug1 = ALTO/2;
	posXJug2 = 40;
	posYJug2 = ALTO/2;
}

function draw() {
	logicaPelota();
	teclas();
	dibujar();
}

function logicaPelota(){
	//Cuando toca el suelo
	if(posYPel+tamPel/2 > ALTO){
		velYPel *= -1;
	}
	//Cuando toca el techo
	if(posYPel-tamPel/2 < 0){
		velYPel *= -1;
	}
	
	//Cuando choca con la raqueta del jugador 1
	if(posXPel+tamPel/2 > posXJug1-tamXRaqJug1/2 && posXPel+tamPel/2 < posXJug1+tamXRaqJug1/2 &&
		 posYPel > posYJug1-tamYRaqJug1/2 && posYPel < posYJug1+tamYRaqJug1/2){
		velXPel *= -1;
	}
	
	//Cuando choca con la raqueta del jugador 2
	if(posXPel-tamPel/2 < posXJug2+tamXRaqJug2/2 && posXPel-tamPel/2 > posXJug2-tamXRaqJug2/2 &&
		 posYPel > posYJug2-tamYRaqJug2/2 && posYPel < posYJug2+tamYRaqJug2/2){
		velXPel *= -1;
	}
	
	//Cuando choca con la pared del jugador 1
	if(posXPel+tamPel/2 > ANCHO){
		inicio();
		puntosJug2++;
	}
	
	//Cuando choca con la pared del jugador 2
	if(posXPel-tamPel/2 < 0){
		inicio();
		puntosJug1++;
	}
	
	//Actualizamos la pelota
	posXPel += velXPel;
	posYPel += velYPel;
}

function teclas(){
	//Jugador 1
	if(keyIsDown(UP_ARROW) && posYJug1-(tamYRaqJug1/2) > 0){
		posYJug1 -= 5;
	}
	if(keyIsDown(DOWN_ARROW) && posYJug1+(tamYRaqJug1/2) < ALTO){
		posYJug1 += 5;
	}	
	
	//Jugador 2
	if(keyIsDown(87) && posYJug2-(tamYRaqJug2/2) > 0){
		posYJug2 -= 5;
	}
	if(keyIsDown(83) && posYJug2+(tamYRaqJug2/2) < ALTO){
		posYJug2 += 5;
	}	
}

function dibujar(){
	//Fondo
	background( 174, 214, 241 );
	
	//Texto
	fill( 26, 82, 118 );
	textAlign(CENTER);
	textSize(200);
	text(puntosJug2 + ' - ' + puntosJug1, ANCHO/2, ALTO/2);
	
	//Pelota
	noStroke();
	fill( 175, 122, 197 );
	ellipse(posXPel, posYPel, tamPel, tamPel);
	
	//Raqueta jug 1
	rectMode(CENTER);
	fill( 247, 249, 249 );
	rect(posXJug1, posYJug1, tamXRaqJug1, tamYRaqJug1);
	
	//Raqueta jug 2
	fill( 39, 55, 70 );
	rect(posXJug2, posYJug2, tamXRaqJug2, tamYRaqJug2);
}