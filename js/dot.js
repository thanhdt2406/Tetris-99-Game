class Dot {
    constructor(game, row, col) {
        this.game = game;
        this.size = 40;
        this.row = row;
        this.col = col;
    }

    hitLeft() {
        return this.col === 0;
    }
    canMoveLeft() {
        if (this.hitLeft()) return false;
        return this.game.board.isEmptyCell(this.row, this.col - 1);
    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
        }
    }

    hitRight() {
        return this.col === NUM_COLS - 1;
    }
    canMoveRight() {
        if (this.hitRight()) return false;
        return this.game.board.isEmptyCell(this.row, this.col + 1);
    }
    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
        }
    }

    hitBottom() {
        return this.row === NUM_ROWS - 1;
    }
    canFall() {
        if (this.hitBottom()) return false;
        return this.game.board.isEmptyCell(this.row + 1, this.col);
    }
    fall() {
        if (this.canFall()) {
            this.row++;
        }
    }

    draw() {
        let x = this.col * this.size;
        let y = this.row * this.size;
        this.game.context.fillStyle = '#ff0000';
        this.game.context.fillRect(x + 1, y + 1, this.size - 2, this.size - 2);
    }
}