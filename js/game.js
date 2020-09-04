class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.showScore = document.getElementById('score');
    }

    init() {
        // create canvas
        this.drawBoardGame();

        // create the board
        this.board = new Board(this);

        // create the brick
        this.brick = new Brick(this);

        // get keyboard
        this.listenKeyboard();

        // start the game
        this.startGame();

        // start the game loop
        this.loop();
    }

    drawBoardGame() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        this.canvas.style.border = '2px solid #feb1b7';
        document.body.appendChild(this.canvas);
    }

    startGame() {
        setInterval(() => {
            this.brick.fall();
        },  500);
    }

    createNewBrick() {
        this.brick = new Brick(this);
    }

    restart() {
        location.reload();
    }

    listenKeyboard() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                    this.brick.moveRight();
                    break;
                case 'ArrowUp':
                    this.brick.rotate();
                    break;
                case 'ArrowDown':
                    this.brick.moveDown();
                    break;
            }
        })
    }

    loop() {
        this.draw();
        this.showScore.innerHTML = this.score;
        setTimeout(() => this.loop(), 1);
    }

    clearScreen() {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    draw() {
        this.clearScreen();
        this.board.draw();
        this.brick.draw();
    }

}

let g = new Game();
g.init();


