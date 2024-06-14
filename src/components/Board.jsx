import React from 'react'
import { Square } from './Square'
import "./Board.css"

export const Board = () => {
  return (
    <>
      <div className='board-row'>        
        <Square className="square"/>
        <Square className="square"/>
        <Square className="square"/>
      </div>
      <div className='board-row'>        
        <Square className="square"/>
        <Square className="square"/>
        <Square className="square"/>
      </div>
      <div className='board-row'>        
        <Square className="square"/>
        <Square className="square"/>
        <Square className="square"/>
      </div>
    </>

  )
}
