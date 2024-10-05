import React from 'react'
import './Home.scss'

//components
import { InputSearch } from '../../ui/components/inputs/InputSearch.jsx'

const Home = () => {
  return (
    <>
      <section className='info-home'>
        <img src='https://i1.wp.com/avozdacidade.com/wp/wp-content/uploads/2019/08/1.-Entrega-uniformes-Lavapes-02.08-Gleisiane-Carvalho9.jpg?fit=5656%2C3776&ssl=1' alt='estudantes-escola'/>
        <div className='text-center info-text px-5 mt-5'>
          <h1> Bem vindo ao Matricula Já </h1>
          <h2>Encontre vagas em escolas públicas perto de você, de maneira rápida e fácil!</h2>
          <InputSearch />
        </div>
      </section>
      <section className='presentation'>
        
      </section>
    </>
  )
}

export default Home