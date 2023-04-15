let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = () => {
    setGame();
};

const setGame = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();

            let num = board[r][c];
            updateTile(tile, num);

            document.getElementById('board').append(tile);
        }
    }

    setTwo();
    setTwo();
};

function updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = ''; //clear the classList
    tile.classList.add('tile');
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add('x' + num.toString());
        } else {
            tile.classList.add('x8192');
        }
    }
}

document.addEventListener('keyup', e => {
    if (e.code == 'ArrowLeft') {
        slideLeft();
        setTwo();
    }
    if (e.code == 'ArrowRight') {
        slideRight();
        setTwo();
    }
    if (e.code == 'ArrowUp') {
        slideUp();
        setTwo();
    }
    if (e.code == 'ArrowDown') {
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;
});

const filterZero = row => {
    return row.filter(num => num != 0);
};

const slide = row => {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }
    return row;
};

const slideLeft = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];

            updateTile(tile, num);
        }
    }
};

const slideRight = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];

            updateTile(tile, num);
        }
    }
};

const slideUp = () => {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];

            updateTile(tile, num);
        }
    }
};

const slideDown = () => {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const setTwo = () => {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;
        }
    }
};

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
