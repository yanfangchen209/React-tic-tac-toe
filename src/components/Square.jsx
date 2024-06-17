import React from 'react'


export const Square = ({onSquareClick, value, className}) => {
  
  return (
    <>
      <button className={className} onClick={onSquareClick}>{value}</button>
    </>

  )
}
