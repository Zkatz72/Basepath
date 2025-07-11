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
    if (goal['data']['id'] == getting['id']){
      //complete
      const saveData = {selectedPlayers: selectedPlayers, completed: true}
      localStorage.setItem(todayKey, JSON.stringify(saveData));
      console.log("got here")
      setCompleted(true)
    }
    else{
    setSelectedPlayers(selectedPlayers.concat([{...player, data:getting, result: res}]))
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

  async function selectGoalPlayer(player){
    const route = `/player/${player['id']}`
    let getting = await (await fetch(`${route}`)).json()
    console.log('hereasna',player)
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