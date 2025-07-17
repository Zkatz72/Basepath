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
  goalPlayer: null,
  curPlayer: null,
  restoreSelectedPlayers: ()=>{},
  makeComplete: () => {}
  
});

export function SelectedPlayerContextProvider(props) {
  const todayKey = new Date().toISOString().split('T')[0];
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [prevPlayer, setPrevPlayer] = useState(null)
  const [goal, setGoal] = useState(null)

  async function selectPlayer(player) {
  
    const route = `/Basepath/indexes/players-${player['id'][0]}.json`
    let req = await (await fetch(`${route}`)).json()
    let getting = req[player['id']]
    let res = null
    if (currentPlayer == null){
      res = [teammate(prevPlayer,getting), `${prevPlayer['firstName']} ${prevPlayer['lastName']} ${prevPlayer['suffix']}`, `${player['firstName']} ${player['lastName']} ${player['suffix']}`]
    }
    else{
      let name = `${player['firstName']} ${player['lastName']} ${player['suffix']}`
      res = [...teammate(currentPlayer['data'],getting), currentPlayer['name'], name]
      
      
    }
    
    if (res[1]){
      setCurrentPlayer({'name':`${player['firstName']} ${player['lastName']} ${player['suffix']}`, 'data':getting})
    }
    if (res[0] && teammate(goal['data'], getting)[0]){
      //complete
      const saveData = {selectedPlayers: selectedPlayers, completed: true}
      localStorage.setItem(todayKey, JSON.stringify(saveData));
      
      setCompleted(true)
    }
    setSelectedPlayers(selectedPlayers.concat([{...player, data:getting, result: res}]))
    
  }

  function unselectPlayer() {
    setSelectedPlayers([])
    setCurrentPlayer(null)
  }
  async function selectPrevPlayer(player){
    const route = `/Basepath/indexes/players-${player['id'][0]}.json`
    let req = await (await fetch(`${route}`)).json()
    let getting = req[player['id']]
    setPrevPlayer(player)
    setCurrentPlayer({'name':`${player['firstName']} ${player['lastName']} ${player['suffix']}`, 'data':getting})
  }

  async function selectGoalPlayer(player){
    const route = `/Basepath/indexes/players-${player['id'][0]}.json`
    let req = await (await fetch(`${route}`)).json()
    let getting = req[player['id']]
    setGoal({...player, 'data':getting})
    
  }

  function updateSelectedPlayers(players){
    setSelectedPlayers(players)
  }
  
  

  const context = {
    selectedPlayers: selectedPlayers,
    prevPlayer: prevPlayer,
    selectPlayer: selectPlayer,
    unselectPlayer: unselectPlayer,
    setPrevPlayer: selectPrevPlayer,
    isComplete: completed,
    setGoalPlayer: selectGoalPlayer,
    goalPlayer: goal,
    curPlayer: currentPlayer,
    restoreSelectedPlayers: updateSelectedPlayers,
    makeComplete: ()=>{setCompleted(true)}
  };

  return (
    <SelectedPlayerContext.Provider value={context}>
      {props.children}
    </SelectedPlayerContext.Provider>
  );
}

export default SelectedPlayerContext;