const board = []
for (let i = 8; i > 0; i--) {
    const row = []
    for (let j = 0; j < 8; j++) {
        row.push(`${String.fromCharCode(97 + j)}${i}`) // a8, b8, c8, d8, e8, f8, g8, h8 in the first iteration
    }
    board.push(row)
}

console.log(board)

const pawn = {
    name: 'pawn',
    color: 'white',
    points: 1,
    moves: [],
}

// board[6][0] = { ...pawn }
// // board[6][1] = Object.assign({}, pawn)
// board[6][1] = { ...pawn }

board[6][0] = JSON.parse(JSON.stringify(pawn))
board[6][1] = JSON.parse(JSON.stringify(pawn))

board[4][0] = board[6][0]
board[6][0] = 'a2'
board[4][0].moves.push('a2-a4')

console.log(board[6][1]);

console.log(board[6][1].moves === board[4][0].moves)