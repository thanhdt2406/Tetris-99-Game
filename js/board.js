class Board {
    constructor(game) {
        this.game = game;
        this.data = DEFAULT_DATA;
    }

    isEmptyCell(row, col) {
        return this.data[row][col] === _;
    }

    isRowFull(row) {
        let full = true;
        for (let col = 0; col < NUM_COLS; col++) {
            if (this.isEmptyCell(row, col)) {
                full = false;
            }
        }
        return full;
    }

    checkFullRows() {
        for (let row = NUM_ROWS - 1; row >= 0; row--) {
            while (this.isRowFull(row)) {
                this.removeRow(row);
                this.game.score += 1;
            }
        }
    }

    removeRow(row) {
        this.data.splice(row, 1);
        this.data.unshift([_, _, _, _, _, _, _, _, _, _]);
        this.createDots();
    }

    createDots() {
        this.dots = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                if (this.data[row][col] === 'x') {
                    let newDot = new Dot(this.game, row, col);
                    this.dots.push(newDot);
                }
            }
        }
    }

    draw() {
        this.createDots();
        this.dots.forEach((dot) => dot.draw());
    }
}