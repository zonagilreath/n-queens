/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

let rooksCache = {};
let queensCache = {};

window.findNRooksSolution = function(n) {
  solutions = [];
  findPerms(n, 0, solutions, 'rooks');
  rooksCache[n] = solutions;
  solution = JSON.parse(solutions[0])

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = rooksCache[n].length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  solutions = [];
  // findPerms(n, 0, solutions, 'queens');
  // if (solutions.length === 0){
  //   solution = new Board({n: n}).rows();
  // }else{
  //   solution = JSON.parse(solutions[0])
  // }
  for(let matrix of rooksCache[n]){
    const testBoard = new Board(JSON.parse(matrix));
    if(!testBoard.hasAnyQueensConflicts){
      solutions.push(JSON.stringify(testBoard.rows()));
    }
  }
  if (solutions.length === 0){
    solution = new Board({n: n}).rows();
  }else{
    solution = JSON.parse(solutions[0])
  }
  queensCache[n] = solutions;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log(queensCache);
  var solutionCount = queensCache[n].length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



function findPerms (n, depth, solution, conflictType, board, availableColumns){
  if (n === 0) {
    solution.push('[]');
    return;
  }
  if (board === undefined) board = new Board({n: n});
  if(depth === n - 1){
    for(let i = 0; i < n; i++){
      board.togglePiece(depth, i);
      let hasConflicts = true;
      if (conflictType === 'rooks'){
        hasConflicts = board.hasAnyRooksConflicts();
      }else if (conflictType === 'queens'){
        hasConflicts = board.hasAnyQueensConflicts();
      }
      if (!hasConflicts){
        let boardCopy = JSON.stringify(board.rows());
        solution.push(boardCopy);
      }
      board.togglePiece(depth, i);
    }
  }
  else if(depth === 0){
    for(let i = 0; i < n; i++){
      board.togglePiece(depth, i);
      const availableColumns = [];
      for(let j = 0; j < n; j++){
        if(j !== i){
          availableColumns.push(j);
        }
      }
      findPerms(n, depth + 1, solution, conflictType, board, availableColumns);
      board.togglePiece(depth, i);
    }
  }
  else{
    for(let i = 0; i < availableColumns.length; i++){
      board.togglePiece(depth, availableColumns[i]);
      const remainingColumns = [];
      for(let j = 0; j < availableColumns.length; j++){
        if(j !== i){
          remainingColumns.push(j);
        }
      }
      findPerms(n, depth + 1, solution, conflictType, board, remainingColumns);
      board.togglePiece(depth, availableColumns[i]);
    }
  }
}






