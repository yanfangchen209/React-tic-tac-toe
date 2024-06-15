import React, { useState } from 'react'
import { Square } from './Square'
import "./Board.css"

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  //assume first input is always X
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    //if square already clicked and filled, don't allow change
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    //if this time is X, next is O, then X, 
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }



  return (
    <>
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
