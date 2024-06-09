import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({ verificaLetras, palavras, categorias, letras, letrasCertas, letrasErradas, tentativas, pontos }) => {

  const [letra, setLetra] = useState("")
  const inputfocus = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    verificaLetras(letra)
    setLetra("")
    inputfocus.current.focus()
  }
  return (
    <div className='game'>
      <p className='pontos'>
        <span>Pontuação: {pontos}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className='dica'>
        Dica sobre a palavra: <span>{categorias}</span>
      </h3>
      <p>Voce ainda tem <span>{tentativas}</span> tentativas</p>
      <div className='containerPalavras'>
        {letras.map((letra, i) =>
          letrasCertas.includes(letra) ? (
            <span key={i} className='letra'>{letra}</span>
          ) : (
            <span key={i} className='espaco'></span>
          ))}
      </div>
      <div className="containerLetra">
        <p>Tente adivinha a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letra" maxLength="1" required onChange={(e) => setLetra(e.target.value)} value={letra} ref={inputfocus}/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="containerLetrasUsadas">
        {letrasErradas.map((letra, i) =>
          <span key={i} >{letra},</span>
        )}
      </div>
    </div>
  )
}

export default Game
