import './App.css'
import Iniciar from './components/Iniciar'
import Game from './components/Game'
import GameOver from './components/GameOver'


import { useCallback, useState, useEffect } from 'react'
import { respostas } from './data/respostas'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {
  const [gameStage, setGameState] = useState(stages[0].name)
  const [resposta] = useState(respostas)

  const [palavras, setPalavras] = useState("")
  const [categorias, setCategorias] = useState("")
  const [letras, setLetras] = useState([])

  const [letrasCertas, setLetrasCertas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [tentativas, setTentativas] = useState(3)
  const [pontos, setPontos] = useState(0)

  const palavrasCategorias = useCallback(() => {
    const categorias = Object.keys(respostas)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]


    const resp = respostas[categoria][Math.floor(Math.random() * respostas[categoria].length)]

    return { resp, categoria }
  }, [resposta])

  const iniciarJogo = useCallback(() => {
    limparStates()

    const { resp, categoria } = palavrasCategorias()

    let separaLetras = resp.split("")
    separaLetras = separaLetras.map((l) => l.toLowerCase())

    setPalavras(resp)
    setCategorias(categoria)
    setLetras(separaLetras)

    setGameState(stages[1].name)
  }, [palavrasCategorias])

  const verificaLetras = (letra) => {
    const letraMinuscula = letra.toLowerCase()

    if (letrasCertas.includes(letraMinuscula) || letrasErradas.includes(letraMinuscula)) {
      return
    }

    if (letras.includes(letraMinuscula)) {
      setLetrasCertas((letraCertaAtual) => [
        ...letraCertaAtual,
        letra,
      ])
    }
    else {
      setLetrasErradas((letraErradaAtual) => [
        ...letraErradaAtual,
        letraMinuscula,
      ]);

      setTentativas((tentativas) => tentativas - 1)
    }

  }

  const reiniciar = () => {
    setPontos(0)
    setTentativas(3)
    setGameState(stages[0].name)
  }

  const limparStates = () => {
    setLetrasCertas([])
    setLetrasErradas([])
  }

  useEffect(() => {
    if (tentativas <= 0) {
      limparStates()

      setGameState(stages[2].name)

    }
  }, [tentativas])

  useEffect(() => {
    const respLetra = [...new Set(letras)]

    if (letrasCertas.length === respLetra.length) {
      setPontos((pontos) => (pontos += 100))
      iniciarJogo()
    }

  }, [letrasCertas, iniciarJogo, letras])


  return (
    <div className='App'>
      {gameStage === "start" && <Iniciar iniciarJogo={iniciarJogo} />}
      {gameStage === "game" && <Game
        verificaLetras={verificaLetras}
        palavras={palavras}
        categorias={categorias}
        letras={letras}
        letrasCertas={letrasCertas}
        letrasErradas={letrasErradas}
        tentativas={tentativas}
        pontos={pontos}
      />}
      {gameStage === "end" && <GameOver reiniciar={reiniciar} pontos={pontos} />}
    </div>
  )
}

export default App
