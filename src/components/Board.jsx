import React, { useState } from 'react'
import { Square } from './Square'
import "./Board.css"

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  //assume first input is always X
  const [xIsNext, setXIsNext] = useState(true);
  //return null at beginning, return null when finished without a winner, return X OR O if has a winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return {winner: squares[a], indexes: [a, b, c]};
      }
    }
    return null;
  }

  const handleClick = (i) => {
    //if square already clicked or winner already decided(X or O): return
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    /*In React, when the state of a parent component changes, it triggers a re-render of the parent component.
     By default, this re-render also causes all its child components to re-render, even if the changed state
      is not passed down to some of the child components.

To prevent unnecessary re-renders of child components that do not rely on the changed state, you can use React.memo for functional components or shouldComponentUpdate for class components. React.memo works by performing a shallow comparison of the previous and next props; if the props have not changed, the component will not re-render.*/

    //make a copy of state array squares,immutability is important 
    /**1.Immutability makes complex features much easier to implement. Later in this tutorial, you will 
     * implement a “time travel” feature that lets you review the game’s history and “jump back” to past
     * moves. This functionality isn’t specific to games—an ability to undo and redo certain actions is a 
     * common requirement for apps. Avoiding direct data mutation lets you keep previous versions of the 
     * data intact, and reuse them later.
     * 2.There is also another benefit of immutability. By default, all child components re-render automatically
     *  when the state of a parent component changes. This includes even the child components that weren’t 
     * affected by the change.  Immutability makes it very cheap for components to compare whether their data has changed or not. 
     */
    const nextSquares = squares.slice();

    //if this time is X, next is O, then X, 
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    //take turns
    setXIsNext(!xIsNext);
  }//end of handleClick


  // const isAllClicked = (squares) => {
  //   let isAllClicked = true;
  //   for (let i = 0; i < squares.length; i++) {
  //     if (squares[i]){
  //       continue;
  //     } else {
  //       isAllClicked = false;
  //       return isAllClicked;
  //     }
  //   }
  //   return isAllClicked;

  // }

    
  const isAllClicked = (squares) => {

    for (let i = 0; i < squares.length; i++) {
      if (squares[i]){
        continue;
      } else {
        return false;
      }
    }
    return true;

  }


//show who goes first->next player->winner|draw
 const result = calculateWinner(squares);
 let i = -1, j = -1, k = -1;
 let status;
 if(result){
  status = 'Winner: ' + result.winner;
  [i, j, k] = calculateWinner(squares).indexes;
 } else {
    // todo: if winner is null and all squares clicked return it is a draw
    if (isAllClicked(squares)){
      status = "This a draw/tie."
    } else {
      //if winner is null and not all squares clicked, tell which is the next player
      status = "Next player: " + (xIsNext ? 'X' : 'O');
    }
  }


  //click reset to start a new round
  const handleResetClick = () => {
    setSquares((Array(9).fill(null)));
  }
  

  const squareClassName = (index) => {
    //another way: array.includes()
    let isWinning = index === i || index === j || index === k;

    return isWinning ? "square isWinning" : "square";

  }

//figure out classname as soon as component is rendered.
  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>        
        <Square className={squareClassName(0)} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square className={squareClassName(1)} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square className={squareClassName(2)} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>        
        <Square className={squareClassName(3)} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square className={squareClassName(4)} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square className={squareClassName(5)} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>        
        <Square className={squareClassName(6)} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square className={squareClassName(7)} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square className={squareClassName(8)} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className='reset' onClick={handleResetClick}>Reset</button>
    </>

  )
    
  //use nest for loop to generate squares and boards, first generate square, then 3 squares to squaresArray
  //finally push 3 squaresArray to board array
  /*
  const renderSquare = (i) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const squaresArray = [];
      for (let col = 0; col < 3; col++) {
        squaresArray.push(renderSquare(row * 3 + col));
      }
      board.push(
        <div key={row} className="board-row">
          {squaresArray}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className='status'>{status}</div>
      {renderBoard()}
      <button className='reset' onClick={handleResetClick}>Reset</button>
    </>
  );
*/
}
