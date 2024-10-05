import react from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

export const InputSearch = () => {
  return(
    <form className='input-search-container d-flex pt-5' action='#/search'>
      <input 
        type='text'
        name='search'
        id='search-input'
        placeholder='Procure por nome de escola, cidade ou bairro'
      />
      <button type='submit'>Buscar <FaMagnifyingGlass className='ms-2'/></button>
    </form>
  )
}