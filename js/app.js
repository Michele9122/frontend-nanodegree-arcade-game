// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.step * 5) {
        //muoviti avanti
        //aumenta velocità
        this.x += this.speed * dt;
    } else {
        this.x = -this.step;
    }
        
    //se si trova fuori
        //resetta la posizione a start

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = 202; //VEDERE COME MODIFICARE
        this.startY = 387;
        this.x = this.startX;     //set an initial value for the x and y property
        this.y = this.startY;
        this.sprite = 'images/char-boy.png'; //load the png from the folder
        this.win = false;
        this.lose = 3;
    }
    //draw player on the current position
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //move player according to input
    handleInput(input) {
        switch(input) {
            case 'left':
             if (this.x > 0) {
                this.x -= this.step;
                }
            break;
            case 'up':
             if (this.y > this.jump) {
                 this.y -= this.jump;
             }
            break;
            case 'right':
             if (this.x < this.step * 4) {
                 this.x += this.step;
             }
            break;
            case 'down':
             if (this.y < this.jump * 4) {
                 this.y += this.jump;
             }
            break;    
        }
    }
    update () {
        for (let enemy of allEnemies){
            if (this.y === enemy.y && (enemy.x + enemy.step > this.x && enemy.x < this.x + this.step)) {
                this.reset();
                this.lose--;
                removeLife();
                if(this.lose === 0) {
                    lose.classList.toggle('modal__hide');
                    resetScore();
                    this.lose = 3;
                }
            }
        }
        if(this.y === 55) {
            this.win = true;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

function removeLife(){
    const heartList = document.querySelectorAll('.hearts i');
    for(heart of heartList){
        if (!heart.classList.contains('heart__hide')) {
        heart.classList.toggle('heart__show');
        heart.classList.add('heart__hide');
        break;
        }
    }
}

function resetScore() {
    const resetHeart = document.querySelectorAll('.hearts i');
    for(heart of resetHeart) {
        heart.classList.toggle('heart__hide');
        heart.classList.toggle('heart__show');
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// new hero object
// init allEnemies array
// per ogni necmico creato push l'oggetto nemico nell'array

const player = new Player();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 270);
const bug4 = new Enemy((-101),166, 50);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);
const lose = document.querySelector('.modal__lose');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
