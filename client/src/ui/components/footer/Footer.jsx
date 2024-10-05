import react from 'react'
import './Footer.scss'
import LogoPrefeitura from '../../../assets/prefeituraLogo.svg'

const Footer = () => {
  return (
    <footer className='p-5'>
      <div className='info-footer'>
        <img src={LogoPrefeitura} alt='logo-prefeitura-Joao-Pessoa'/>
        <p className='text-center pt-4'>Rua Diógenes Chianca, 1777 Água Fria, João Pessoa-PB CEP: 58053-900</p>
      </div>
      <ul>
        <li className='footer-column m-3'>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
        </li>
        <li className='footer-column m-3'>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
        </li>
        <li className='footer-column m-3'>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
        </li>
        <li className='footer-column m-3'>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
          <h3>3213 5100</h3>
          <p>Central Telefônica</p>
        </li>
      </ul>
    </footer>
  )
}

export default Footer