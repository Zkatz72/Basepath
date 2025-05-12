import { createContext, useState } from 'react';

const SelectedPlayerContext = createContext({
  selectedPlayers: [],
  prevPlayer: null,
  selectPlayer: (player) => {},
  unselectPlayer: () => {}
});

export function SelectedPlayerContextProvider(props) {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(null)

  function selectPlayer(player) {
    console.log('in here')
    if (currentPlayer === null){
      const route = `/player/${player['id']}`
      fetch(`${route}`)
          .then((res) => { return res.json()})
          .then((data) => {console.log(data); setCurrentPlayer(data)});
      
    }
    else{
      
      const route = `/player/${player['id']}`
      fetch(`${route}`)
          .then((res) => res.json())
          .then((data) => setCurrentPlayer(data));
      
    }
    setSelectedPlayers(selectedPlayers.concat([{...player, correct: false}]))
  }

  function unselectPlayer() {
    setSelectedPlayers([])
    setCurrentPlayer(null)
  }
  


  const context = {
    selectedPlayers: selectedPlayers,
    prevPlayer: currentPlayer,
    selectPlayer: selectPlayer,
    unselectPlayer: unselectPlayer
  };

  return (
    <SelectedPlayerContext.Provider value={context}>
      {props.children}
    </SelectedPlayerContext.Provider>
  );
}

export default SelectedPlayerContext;