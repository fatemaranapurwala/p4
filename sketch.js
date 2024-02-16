var splashscreen_img;
var player_img, player;
var play_btn , abt_btn;
var bg_img;
var enemy, enemy_grp;
var enemy1,enemy2,enemy3;
var enemy_lvl2, enemy_grp_lvl2;
var enemy1_lvl2, enemy2_lvl2, enemy3_lvl2;
var bullet_img, bullet_grp, bullet;

var gameState = "wait";
var score = 0;


function preload() {
    splashscreen_img = loadImage("assets/splashscreen.gif");
    player_img = loadImage("assets/player.png");
    bg_img = loadImage("assets/bg.jpg");
    enemy1=loadImage("assets/asteroid.png");
    enemy2=loadImage("assets/enemyaircrafts.png");
    enemy3=loadImage("assets/ufo.png");
    bullet_img=loadImage("assets/bullets.png");



}

function setup() {
    createCanvas(800,800);
    play_btn = createImg("assets/play.png");
    play_btn.position(300,450);
    play_btn.size(80,80);
    play_btn.hide();

    abt_btn = createImg("assets/about.png");
    abt_btn.position(400,450);
    abt_btn.size(80,80);
    abt_btn.hide();

    player = createSprite(100,100);
    player.addImage(player_img);
    player.scale=0.3;
    player.visible = false;

    enemy_grp = new Group();
    bullet_grp=new Group();
}

function draw(){
    if(gameState == "wait"){
        background(splashscreen_img);
        play_btn.show();
        abt_btn.show();
    }
    play_btn.mousePressed( () => {
        abt_btn.hide();
        play_btn.hide();
        gameState = "level1";
    })
    abt_btn.mousePressed(()=> {
        abt_btn.hide();
        play_btn.hide();
        gameState="about";
    })

    if(gameState == "level1"){
        background(bg_img);
        player.visible = true;
        movement();
        spawn_enemies();
        if(keyDown("space")){
            spawn_bullets();
        }

        for(var i =0; i < enemy_grp.length; i++){
            if(bullet_grp.isTouching(enemy_grp.get(i))){
                score += 10  //score = score +10;
                enemy_grp.get(i).remove();
                bullet_grp.destroyEach();
            }   
        }
    }

    if(gameState == "about"){
        aboutGame();
    }

    drawSprites();
}

function aboutGame(){
    swal({
        title: "About this Game",
        text: "Survive in the airField by escaping from enemyAircrafts and ufo's",
        textAlign:"CENTER",
        imageUrl: "assets/splashScreen.gif",
        imageSize:"200x200",
        confirmButtonText:"Survive and win the Game",
        confirmButtonColor: "Red"
    },
    function(){
        gameState ="wait";
    }
    )
}

function movement(){

    if(player.y < 30){
        player.y = 30;
    }
    if(player.y > 700){
        player.y = 700;
    }
    if (keyDown("UP_ARROW")){
        player.y -=25;
    }
    if(keyDown("DOWN_ARROW")){
        player.y +=25;
    }
}
function spawn_enemies(){
    if (frameCount % 50 == 0){
       var ran = Math.round((Math.random()*2)+1);
       
       var ranY = Math.round(Math.random()*750);
       console.log(ranY)
       enemy = createSprite(820, ranY);

       
       switch(ran){
        case 1: 
            enemy.addImage(enemy1);
            enemy.scale = 0.2;
            enemy.velocityX = - 3;
            break;
        case 2:
           enemy.addImage(enemy2);
           enemy.scale=0.1;
           enemy.velocityX=-3;
           break;
        case 3:
            enemy.addImage(enemy3);
            enemy.scale=0.05;
            enemy.velocityX=-3;
            break;  
        default:
            break; 
       }

       enemy_grp.add(enemy);
    } 
}

function spawn_bullets(){
    
    bullet = createSprite(player.x+80,player.y+15,20,20);
    bullet.addImage(bullet_img);
    bullet.scale=0.1;
    bullet.velocityX= 3;
    bullet.depth = player.depth;
    player.depth += 1;


    bullet_grp.add(bullet);


}