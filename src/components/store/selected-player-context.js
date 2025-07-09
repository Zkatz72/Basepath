import { createContext, useState } from 'react';
import { teammate } from '../../teammate';
const SelectedPlayerContext = createContext({
  selectedPlayers: [],
  prevPlayer: null,
  selectPlayer: (player) => {},
  unselectPlayer: () => {},
  setPrevPlayer: () => {},
  isComplete: null,
  setGoalPlayer: () => {},
  goalPlayer: null
  
});

export function SelectedPlayerContextProvider(props) {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [prevPlayer, setPrevPlayer] = useState(null)
  const [goal, setGoal] = useState(null)

  async function selectPlayer(player) {
    console.log('in here')
  
      
    const route = `/player/${player['id']}`
    let getting = await (await fetch(`${route}`)).json()
    let res = null
    if (currentPlayer == null){
      res = [teammate(prevPlayer,getting), `${prevPlayer['firstName']} ${prevPlayer['lastName']} ${prevPlayer['suffix']}`, `${player['firstName']} ${player['lastName']} ${player['suffix']}`]
    }
    else{
      let name = `${player['firstName']} ${player['lastName']} ${player['suffix']}`
      res = [...teammate(currentPlayer['data'],getting), currentPlayer['name'], name]
      
      
    }
    console.log('yuh', currentPlayer['data'], getting, goal)
    
    if (res[1]){
      setCurrentPlayer({'name':`${player['firstName']} ${player['lastName']} ${player['suffix']}`, 'data':getting})
    }
    if (goal['id'] == getting['id']){
      console.log("got here")
      setCompleted(true)
    }
    else{
    setSelectedPlayers(selectedPlayers.concat([{...player, result: res}]))
    }
  }

  function unselectPlayer() {
    setSelectedPlayers([])
    setCurrentPlayer(null)
  }
  async function selectPrevPlayer(player){
    const route = `/player/${player['id']}`
    let getting = await (await fetch(`${route}`)).json()
    setPrevPlayer(player)
    setCurrentPlayer({'name':`${player['firstName']} ${player['lastName']} ${player['suffix']}`, 'data':getting})
  }

  function selectGoalPlayer(player){
    setGoal(player)
  }
  

  const context = {
    selectedPlayers: selectedPlayers,
    prevPlayer: prevPlayer,
    selectPlayer: selectPlayer,
    unselectPlayer: unselectPlayer,
    setPrevPlayer: selectPrevPlayer,
    isComplete: completed,
    setGoalPlayer: selectGoalPlayer,
    goalPlayer: goal
  };

  return (
    <SelectedPlayerContext.Provider value={context}>
      {props.children}
    </SelectedPlayerContext.Provider>
  );
}

export default SelectedPlayerContext;