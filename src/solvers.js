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

// window.rooksCache = {0: []};

window.findNRooksSolution = function(n) {
  let solutionBoard = new Board({n: n});
  for (let i = 0; i < n; i++){
    solutionBoard.togglePiece(i, i);
  }
  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let rookPositions = rookPermuter(n);
  return rookPositions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0){
    return [];
  }
  if (n === 1){
    return [[1]];
  }
  let solutionBoard = new Board({n: n});
  let rookPositions = rookPermuter(n);
  for (let rookBoard of rookPositions){
    if (queenChecker(rookBoard)){
      
      for (let i = 0; i < n; i++){
        solutionBoard.togglePiece(i, rookBoard[i]);
      }
      return solutionBoard.rows();
    }
  }
  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n===0){
    return 1;
  }
  let rookPositions = rookPermuter(n);
  return rookPositions.filter(queenChecker).length;
};

const rookPermuter = (n, perm, availableColumns) => {
  let newPerm;
  let solutions = [];
  if (!availableColumns){
    availableColumns = _.range(n);
  }
  for (let i = 0; i < availableColumns.length; i++){
    if (!perm){
      newPerm = new Array(n);
    }else{
      newPerm = perm.slice();
    }
    let row = n - availableColumns.length;
    newPerm[row] = availableColumns[i]
    const remainingColumns = [...availableColumns.slice(0,i), ...availableColumns.slice(i+1)];
    if (remainingColumns.length){
      solutions = solutions.concat(rookPermuter(n, newPerm, remainingColumns));
    }else {
      solutions.push(newPerm);
    }
  }
  return solutions;
};

const queenChecker = (flatArray) => {
    for (let i = 0; i < flatArray.length - 1; i++){
        for (let j = i + 1; j < flatArray.length; j++){
            if (j - i === Math.abs(flatArray[j] - flatArray[i])){
                return false;
            }
        }
    }
    return true;
}


