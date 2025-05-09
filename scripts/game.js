// Create a new Pixi.js application instance
var app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});

// Add the canvas to the HTML element
document.getElementById("game-container").appendChild(app.view);

// Create a bouncing ball (circle)
var ball = new PIXI.Graphics();
let ballColor = 0xFF3300;
function drawBall(color){
    ball.clear(); // Clear previous drawing
    ball.beginFill(color); // Random Color
    ball.drawCircle(0, 0, 50); // Draw a circle at (0,0) with a radius of 50
    ball.endFill();
}
drawBall(ballColor);

// Position the ball in the center of the canvas
ball.x = app.screen.width/2;
ball.y = app.screen.height/2;

// Add the ball to the stage
app.stage.addChild(ball);

// Ball's movement variables
var speedX = 5; // Speed in the X direction
var speedY = 4; // Speed in the Y direction

// Utility: generate random color
function randomColor(){
    return Math.floor(Math.random() * 0xFFFFFF)
}

// Game loop for updating the ball's movement
app.ticker.add(function(delta) { 
    // Update ball's position
    ball.x += speedX;
    ball.y += speedY;

    let hit = false;

    // Check for collision with the canvas edges
    if(ball.x > app.screen.width - 50 || ball.x < 50){
        speedX = -speedX; // Reverse the X direction
        hit = true;
    }

    if(ball.y > app.screen.height - 50 || ball.y < 50){
        speedY = -speedY; // Reverse the Y direction
        hit = true;
    }

    if (hit){
        ballColor = randomColor();
        drawBall(ballColor);
    }
});


// Gun shooting game with phaser
// let player;
// let cursors;
// let bullets;
// let enemies;
// let lastFired = 0;
// let score = 0;
// let scoreText;
// let gameOverText;
// let gameOver = false;

// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     backgroundColor: '#222',
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false
//         }
//     },
//     scene: {
//         preload,
//         create,
//         update
//     }
// };

// const game = new Phaser.Game(config);

// function preload() {}

// function create() {
//     // Create player (rectangle using graphics)
//     const graphics = this.add.graphics();
//     graphics.fillStyle(0xffffff, 1);
//     graphics.fillRect(0, 0, 50, 20);
//     graphics.generateTexture('playerTex', 50, 20);
//     graphics.clear();

//     player = this.physics.add.sprite(400, 550, 'playerTex');
//     player.setCollideWorldBounds(true);

//     // Bullet texture
//     graphics.fillStyle(0xff0000, 1);
//     graphics.fillRect(0, 0, 5, 20);
//     graphics.generateTexture('bulletTex', 5, 20);
//     graphics.clear();

//     // Enemy texture
//     graphics.fillStyle(0x00ff00, 1);
//     graphics.fillRect(0, 0, 40, 20);
//     graphics.generateTexture('enemyTex', 40, 20);
//     graphics.destroy();

//     bullets = this.physics.add.group();
//     enemies = this.physics.add.group();

//     cursors = this.input.keyboard.createCursorKeys();
//     this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//     // Score
//     scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });

//     // Game over text
//     gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
//     gameOverText.setVisible(false);

//     // Spawn enemies
//     this.time.addEvent({
//         delay: 1000,
//         callback: () => {
//             if (!gameOver) {
//                 const x = Phaser.Math.Between(50, 750);
//                 const enemy = this.physics.add.sprite(x, 0, 'enemyTex');
//                 enemy.setVelocityY(100);
//                 enemies.add(enemy);
//             }
//         },
//         loop: true
//     });

//     // Bullet hit enemy
//     this.physics.add.overlap(bullets, enemies, (bullet, enemy) => {
//         bullet.destroy();
//         enemy.destroy();
//         score += 10;
//         scoreText.setText('Score: ' + score);
//     });

//     // Game over in 60 seconds
//     this.time.delayedCall(60000, () => {
//         gameOver = true;
//         gameOverText.setVisible(true);
//     });
// }

// function update(time) {
//     if (gameOver) return;

//     if (cursors.left.isDown) {
//         player.setVelocityX(-300);
//     } else if (cursors.right.isDown) {
//         player.setVelocityX(300);
//     } else {
//         player.setVelocityX(0);
//     }

//     if (this.spaceKey.isDown && time > lastFired) {
//         const bullet = this.physics.add.sprite(player.x, player.y - 25, 'bulletTex');
//         bullet.setVelocityY(-400);
//         bullets.add(bullet);
//         lastFired = time + 300;
//     }

//     // Destroy bullets that go off screen
//     bullets.children.each(b => {
//         if (b.y < 0) b.destroy();
//     });

//     // Destroy enemies that go off screen
//     enemies.children.each(e => {
//         if (e.y > 600) e.destroy();
//     });
// }