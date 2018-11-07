// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = 0;
    this.y = 55;
    this.step = 101;

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
        this.x += 250* dt;
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


// Player class
    // constructor
    // properties
        //x pos
        //y pos
        // sprite image
    // methods
        //update position
            //check collisions
                //the player hit the enemy
            //check win
                //the player reach the water
        //render
            // draw player on current position
        //handle player keyboard input
        //reset hero


class Player {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2; //VEDERE COME MODIFICARE
        this.startY = (this.jump * 5) - 20;
        this.x = this.startX;     //set an initial value for the x and y property
        this.y = this.startY;
        this.sprite = 'images/char-boy.png'; //load the png from the folder
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
}

const player = new Player();
const bug1 = new Enemy();
const allEnemies = [];
allEnemies.push(bug1);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// new hero object
// init allEnemies array
// per ogni necmico creato push l'oggetto nemico nell'array

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
