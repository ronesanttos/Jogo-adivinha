import './GameOver.css'

const GameOver = ({ reiniciar, pontos }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Sua pontuação foi: <span>{pontos}</span></h2>
      <button onClick={reiniciar}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver
