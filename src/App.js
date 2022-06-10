import react from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

const App = () => {

  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++){
      let num = {
        id: i,
        value: Math.floor((Math.random() * 6) + 1),
        isHeld: false
      }
      newDice.push(num)
    }
    return newDice
  }

  const [diceRoll, setDiceRoll] = react.useState(allNewDice())

  const [tenzies, setTenzies] = react.useState(false)

  const rollDice = () => {
    if(!tenzies){
    setDiceRoll(oldDice => oldDice.map(die => {
       return die.isHeld ?
        die :
        {...die, value: Math.floor((Math.random() * 6) + 1)}
      }))
    } else {
      setTenzies(false)
      setDiceRoll(allNewDice())
    }
  }

  const holdDice = (id) => {
    setDiceRoll(oldDice => oldDice.map(die => {
       return  die.id === id ?
        {...die, isHeld: !die.isHeld} :
         die
      }))
  }

  const dies = diceRoll.map(die => {
    return(
      <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    )
  })

  react.useEffect(() => {
    const allHeld = diceRoll.every(die => die.isHeld)
    const firstValue = diceRoll[0].value
    const allSameValue = diceRoll.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won!')
    }
  }, [diceRoll])

  return (
    <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dies}
        </div>
        <button onClick={rollDice} className='roll-dice'> {tenzies ? 'New game' : 'roll!'} </button>
    </main>
  )
}

export default App;
