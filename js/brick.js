class Brick {
    constructor(game) {
        this.game = game;
        this.dots = [];
        this.data = [];
        this.col = 3;
        this.row = 0;

        this.createData();
        this.createDots();
    }

    createData() {
        let baseData = BASE_DATA;
        let r = Math.round(Math.random() * (baseData.length - 1));
        this.data = baseData[r];
    }

    canMoveLeft() {
        let thisBrickCanMoveLeft = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveLeft()) {
                thisBrickCanMoveLeft = false;
            }
        });
        return thisBrickCanMoveLeft;
    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.dots.forEach((dot) => {
                dot.moveLeft();
            });
        }
    }

    canMoveRight() {
        let thisBrickCanMoveRight = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveRight()) {
                thisBrickCanMoveRight = false;
            }
        });
        return thisBrickCanMoveRight;
    }
    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
            this.dots.forEach((dot) => {
                dot.moveRight();
            });
        }
    }

    canFall() {
        let thisBrickCanFall = true;
        this.dots.forEach((dot) => {
            if (!dot.canFall()) {
                thisBrickCanFall = false;
            }
        });
        return thisBrickCanFall;
    }
    fall() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach((dot) => {
                dot.fall();
            });
        } else {
            this.game.createNewBrick();
            this.appendToBoard();
            this.game.board.checkFullRows();
            this.checkOver();
        }
    }

    moveDown() {
        while (this.canFall()) {
            this.fall();
        }
    }

    rotate() {
        let newData = [];

        for (let col = 0; col < this.data[0].length; col++) {
            let newRow = [];
            for (let row = this.data.length - 1; row >= 0; row--) {
                newRow.push(this.data[row][col]);
            }
            newData.push(newRow);
        }

        let isNewDataValid = true;
        for (let newRow = 0; newRow < newData.length; newRow++) {
            for (let newCol = 0; newCol < newData[0].length; newCol++) {
                if (newData[newRow][newCol] === 'x' && !this.game.board.isEmptyCell(newRow, newCol)) {
                    isNewDataValid = false;
                }
            }
        }
        if (this.col + newData[0].length > NUM_COLS) {
            isNewDataValid = false;
        }

        if (isNewDataValid) {
            this.data = newData;
            this.createDots();
        }
    }

    appendToBoard() {
        this.dots.forEach((dot) => {
            this.game.board.data[dot.row][dot.col] = 'x';
        });
    }

    createDots() {
        this.dots = [];
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if (this.data[row][col] === 'x') {
                    let newDot = new Dot(this.game, row + this.row, col + this.col);
                    this.dots.push(newDot);
                }
            }
        }
    }

    draw() {
        this.dots.forEach((dot) => dot.draw());
    }

    checkOver() {
        if (!this.canFall() && this.row === 0) {
            document.getElementById("gameOver").style.display = 'block';
        }
    }
}