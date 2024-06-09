import React from 'react'
import './Iniciar.css'

const Iniciar = ({iniciarJogo}) => {
  return (
    <div className='start'>
        <h1>Palavra Secreta</h1>
        <p>Clique no botão para iniciar</p>
        <button onClick={iniciarJogo}>Começar jogo</button>
    </div>
  )
}

export default Iniciar
