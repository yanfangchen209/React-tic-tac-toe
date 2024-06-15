import React, { useState } from 'react'

export const Square = ({onSquareClick, value}) => {
  
  return (
    <>
      <button className='square' onClick={onSquareClick}>{value}</button>
    </>

  )
}
