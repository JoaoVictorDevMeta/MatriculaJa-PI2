import React, {useState} from 'react'
import './Inputs.scss'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const InputSimple = ({type, titulo, placeholder, registerOptions, errors}) => {
  const [passVisible, setPassVisible] = useState(false)

  //o os seguintes campos estão estruturados assim:
  //label recebe o valor passado no campo titulo
  //input recebe o valor passado no campo type
  //ele também varia seu tipo caso seja senha seguindo a variável passVisible
  // essa variavel esta sendo trocada de valor no botao abaixo, que só aparece no input tipo senha
  // alem disso há um span para erro de validação
  return(
    <div className='simple-input-container'>
      <label htmlFor={type}>{titulo}</label>
      
      <input
        type={passVisible ? 'text' : type}
        id={type}
        placeholder={placeholder}
        {...registerOptions}
      />
      
      { type==="password" &&
        <button 
          type='button'
          onClick={()=>{setPassVisible(!passVisible)}}
        >
          {passVisible? <FaEyeSlash /> : <FaEye />}
        </button>
      }
      {errors?.type === 'required' && <span>Campo Obrigatório</span>}
      {errors?.type === 'minLength' && <span>Muito pequeno</span>}
      {errors?.type === 'noSpecialChars' && (
        <span>Apenas Letras e Números</span>
      )}
      {errors?.type === 'hasNumber' && (
        <span>Inclua um número em sua Senha</span>
      )}
      {errors?.type === 'hasSpecialChar' && (
        <span>Inclua um caractére especial</span>
      )}
    </div>
  )
}