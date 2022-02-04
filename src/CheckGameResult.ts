const checkGameResult = (arr: number[]): [boolean, boolean, number[]] => {
    const rowIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const columnIndexes = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const diagonalIndexes = [[0, 4, 8], [2, 4, 6]];
    const checkIndexes = (indexes: number[][]): [boolean, number[]] => {
        for (let i = 0; i < indexes.length; i++) {
            const [i0, i1, i2] = indexes[i];
            if (arr[i0] && arr[i0] === arr[i1] && arr[i1] === arr[i2]) {
                return [true, indexes[i]]
            }
        }
        return [false, []];
    }
    // Checking for rows
    const [rowsCheck, winnerRowsIdx] = checkIndexes(rowIndexes);
    if (rowsCheck) {
        return [rowsCheck, false, winnerRowsIdx];
    }
    // Checking for columns
    const [columnsCheck, winnerColsIdx] = checkIndexes(columnIndexes);
    if (columnsCheck) {
        return [columnsCheck, false, winnerColsIdx];
    }
    // Checking for diagonals 
    const [diagonalCheck, winnerDiagIdx] = checkIndexes(diagonalIndexes);
    if (diagonalCheck) {
        return [diagonalCheck, false, winnerDiagIdx];
    }
    // Checking for a draw
    const isDraw = arr.reduce((isIt, cel) => cel === 0 ? false : isIt, true)
    if (isDraw) {
        return [true, isDraw, []]
    }
    return [false, false, []];
}

export default checkGameResult;