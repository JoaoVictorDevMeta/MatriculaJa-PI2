import React from 'react'

export const InputCheck = ({message}) => {
  return (
    <div className='check-container'>
      <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault"/>
      <label className="form-check-label" htmlFor="flexCheckDefault">{message}</label>
    </div>
  )
}
