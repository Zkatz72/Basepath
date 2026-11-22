import { createContext, useState } from 'react';
import { teammate } from '../../teammate';
import { getTeammates } from '../../services/player.service';
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
  makeComplete: () => {},
  makeIncomplete: () => {},
  setPuzzle: () => {},
  puzzle : null,
  finalResult:null,
  setFinalResult: ()=>{}
  
});

export function SelectedPlayerContextProvider(props) {
  
  
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [puzzle, setPuzzle] = useState(null)
  const [gameResult, setGameResult] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [prevPlayer, setPrevPlayer] = useState(null)
  const [goal, setGoal] = useState(null)

  async function selectPlayer(player) {
    console.log(player)
  const playerName = `${player.first_name} ${player.last_name} ${player.suffix ?? ""}`.trim();

  const previous = currentPlayer ?? {
    name: `${prevPlayer.first_name} ${prevPlayer.last_name} ${prevPlayer.suffix ?? ""}`.trim(),
    data: prevPlayer,
  };

  try {
    // Check if the selected player is teammates with the previous player
    const result = await getTeammates(previous.data.id, player.id);
    const sharedTeamName = result.areTeammates
      ? result.sharedTeams[0]["full_name"]
      : null;
    const someResult = [result.areTeammates, sharedTeamName, previous.name, playerName];

    setCurrentPlayer({
      name: playerName,
      data: player,
    });

    // Check if the selected player is teammates with the goal player
    const finalResult = await getTeammates(goal.id, player.id);

    if (finalResult.areTeammates) {
      const finalTeamName = finalResult.sharedTeams[0]["full_name"];
      const completionResult = [result.areTeammates, finalTeamName, playerName, goal];
      setGameResult(completionResult);
      const saveData = {
        selectedPlayers: [
          ...selectedPlayers,
          { ...player, result: someResult },
        ],
        completed: true,
        finalResult: completionResult,
      };

      localStorage.setItem(puzzle, JSON.stringify(saveData));
      setCompleted(true);
    }

    setSelectedPlayers((prev) => [
      ...prev,
      { ...player, result: someResult },
    ]);
  } catch (err) {
    console.error("Failed to check teammates:", err);
  }
}

  function unselectPlayer() {
    setSelectedPlayers([])
    setCurrentPlayer(null)
  }
  async function selectPrevPlayer(player){
    console.log(
      'herey',
      player
    )
    setPrevPlayer(player)
    setCurrentPlayer({'name':`${player['first_name']} ${player['last_name']} ${player['suffix']}`, 'data':player})
  }

  async function selectGoalPlayer(player){
    
    setGoal(player)
    
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
    makeComplete: ()=>{setCompleted(true)},
    makeIncomplete: ()=>{setCompleted(false)},
    setPuzzleNum: (item)=>{setPuzzle(item)},
    puzzle:  puzzle,
    finalResult: gameResult,
    setFinalResult: (item) => {setGameResult(item)}
  };

  return (
    <SelectedPlayerContext.Provider value={context}>
      {props.children}
    </SelectedPlayerContext.Provider>
  );
}

export default SelectedPlayerContext;