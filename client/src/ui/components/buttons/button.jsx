import React from 'react'
import './button.scss'

export const Button = ({type='submit', children, color, round='all', estilo}) => {
  return (
    <button 
      className={`matricula-button button-${estilo} button-${color} round-${round}`}
      type={type}
      >
      {children}
    </button>
  )
}