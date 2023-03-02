import { Board } from '../classes/Board';

export const randomPosition = (
  board: Board
): { x: number | null; y: number | null } => {
  let foundNull = false;
  for (const row of board.console) {
    if (row.includes(null)) {
      foundNull = true;
      break;
    }
  }
  if (!foundNull) return { x: null, y: null };

  const x = Math.floor(Math.random() * board.nbRows);
  const y = Math.floor(Math.random() * board.nbCols);

  while (board.console[x][y] !== null) {
    return randomPosition(board);
  }
  return { x, y };
};

export const randomMove = (
  lastMove: 'up' | 'down' | 'left' | 'right' | null,
  forbiddenMoves: ('up' | 'down' | 'left' | 'right')[],
  priority?: 'up' | 'down' | 'left' | 'right'
): 'up' | 'down' | 'left' | 'right' => {
  if (priority !== undefined && !forbiddenMoves.includes(priority)) {
    return priority;
  } else {
    let moves: ('up' | 'down' | 'left' | 'right')[] = [
      'up',
      'down',
      'left',
      'right',
    ]; // list of possible moves
    moves = moves.filter((move) => !forbiddenMoves.includes(move)); // remove forbidden moves from the list of possible moves

    if (lastMove === null)
      return moves[Math.floor(Math.random() * moves.length)]; // if lastMove is null, return a random move

    const currentIndex: number = moves.indexOf(lastMove); // get the index of the last move
    if (currentIndex !== -1) {
      // if lastMove is not null
      moves.splice(currentIndex, 1); // remove last move from the list of possible moves
    }
    const randomIndex: number = Math.floor(Math.random() * moves.length);
    lastMove = moves[randomIndex];
    return lastMove;
  }
};
