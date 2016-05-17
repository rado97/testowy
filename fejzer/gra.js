var	game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload:preload, create:create, update:update});	

function preload(){	

//ładowanie	zasobów
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('vb', 'assets/vb.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}	

var platforms;
var vb;
var player1;
var player2;
var cursors;
var ground;

function create(){	

//tworzenie	obiektów	

//	"Włączamy"	prawa	fizyki
game.physics.startSystem(Phaser.Physics.ARCADE);	
//	Dodajemy	tło
game.add.sprite(0,	0,	'sky');	



vb = game.add.sprite(300, 400 ,'vb');

vb.scale.setTo(0.5, 0.5);





player1	=	game.add.sprite(450,	game.world.height	- 200, 'dude');
player2	=	game.add.sprite(32,	game.world.height	- 200, 'dude');

player1.scale.setTo(2,2);
player2.scale.setTo(2,2);

game.physics.arcade.enable(player1);
game.physics.arcade.enable(player2);

player1.body.bounce.y	= 0.2;
player1.body.gravity.y	= 900;
player1.body.collideWorldBounds	= true;

player2.body.bounce.y	= 0.2;
player2.body.gravity.y	= 900;
player2.body.collideWorldBounds	= true;

//	Dodajemy	grupę,	do	której	będą	należeć:	gleba	i	półki

platforms	=	game.add.group();	
//	Obiekty	wchodzące	w	skład	grupy	uczynimy	ciałem	stałym
platforms.enableBody	= true;	
//	Tworzymy	glebę
ground	=	platforms.create(0,	game.world.height - 64,	'ground');	
//		Skalujemy	glebę	(powiększamy	2x)
ground.scale.setTo(2,	2);	
//		Unieruchomiamy	glebę
ground.body.immovable	= true;	


	player1.animations.add('left', [0, 1, 2, 3], 10, true);
	player1.animations.add('right', [5, 6, 7, 8], 10, true);
}	


function update(){	

game.physics.arcade.collide(vb,	ground);
game.physics.arcade.collide(player1, ground);
game.physics.arcade.collide(player2, ground);
game.physics.arcade.collide(player1, vb);
game.physics.arcade.collide(player2, vb);


cursors	= game.input.keyboard.createCursorKeys();



	player1.body.velocity.x	= 0;
				if (cursors.left.isDown)
				{	
					player1.body.velocity.x	= -150;
					player1.animations.play('left');		
				}
				else if (cursors.right.isDown)
				{
								
								player1.body.velocity.x	= 150;
								//	Animuj
								player1.animations.play('right');
				}
				else
				{
								//	Jak	nic	nie	naciskam	to	nie	ruszaj	go	i...	wyświetlaj	4	klatkę	sprita
								player1.animations.stop();
								player1.frame	= 4;
				}
				//		Dodaj	skoki	(!!!)
				if (cursors.up.isDown	&&	player1.body.touching.down)
				{
								player1.body.velocity.y	= -600;
				}
	
	
		
	game.physics.arcade.overlap(player1, vb, dotyk, null, this);
}


function dotyk(){
	game.physics.arcade.enable(vb);
	vb.body.bounce.y	= 0.7;
	vb.body.bounce.x = 0.4;
	vb.body.gravity.y	= 300;
	vb.body.collideWorldBounds	= true;
}