import React, { useState } from 'react'
import { Square } from './Square'
import "./Board.css"

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  //assume first input is always X
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    //if square already clicked and filled, don't allow change, return, if winner decided, return
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
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }




  //return O or X or null(no winner)
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
        return squares[a];
      }
    }
    return null;
  }



  return (
    <>
      <div>{status}</div>
      <div className='board-row'>        
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>        
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>        
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>

  )
}
