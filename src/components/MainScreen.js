import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import PlayerSearch from "./PlayerSearch";
import classes from "./MainScreen.module.css";
import { useEffect } from "react";
import ResultCard from "./ResultCard";
import { Toolbar } from "@mui/material";
import Box from '@mui/material/Box';
import theme from "./ui/theme";
import Divider from '@mui/material/Divider';
import { useTheme } from "@mui/material";
import PlayerCard from "./PlayerCard";
import CompleteModal from "./CompleteModal";
let guesses = 4
function MainScreen(props) {
  const { prevPlayer, selectedPlayers, selectPlayer, setPrevPlayer, isComplete, setGoalPlayer } = useContext(SelectedPlayerContext);
  
  console.log(selectedPlayers)
  console.log(isComplete)
  useEffect(() => {setPrevPlayer(props.curPlayer);setGoalPlayer(props.goalPlayer) }, []);
  const theme = useTheme()
  return (
    <>

    {isComplete && <CompleteModal></CompleteModal>}
    <Box minHeight = '100vh' height='100%' bgcolor={theme.palette.primary.main}>
      <Toolbar></Toolbar>
      <Box component="section" sx={{ width: '100%', p: 2, flexGrow: 1, zIndex:1000, flexDirection: 'column', bgcolor: theme.palette.primary.main, color: 'white', position: 'fixed', textAlign:'center' }}>
        <b>Guesses: {selectedPlayers.length}</b>
      </Box>
      <Box component="section" sx={{ p: 2 }}>
        &nbsp;
      </Box>
      <div id = "starting-player">
        <PlayerCard player={{'name': `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]} ${props.curPlayer["suffix"]}` }} ></PlayerCard>
      </div>
      <Divider variant="middle" color = 'white' f/>
      <div className={classes.results}>
        
          {selectedPlayers.map((player, index) => {
            return (
              <div>
              <ResultCard player={{'name': `${player["firstName"]} ${player["lastName"]} ${player["suffix"]}` }} result={player['result']} ></ResultCard>
              <Divider variant="middle" color = 'white' flexItem height = '10px'/>
              </div>
            );
          })}
      </div>
      <Divider variant="middle" color = 'white' flexItem/>
      {!isComplete && <PlayerSearch players={props.players} />}
      {!isComplete && <Divider variant="middle" color = 'white' height = '2px' flexItem/>}
      
      <div id = "ending-player">
        <PlayerCard player={{'name': `${props.goalPlayer["firstName"]} ${props.goalPlayer["lastName"]} ${props.goalPlayer["suffix"]}` }} ></PlayerCard>
      
      </div>
      <div>
        {prevPlayer && (<p>Current Player: {`${prevPlayer['id']}`}</p>) }
        
      </div>
      

      {isComplete && <p>here</p>}
      </Box>
      
      </>
      
  );
}

export default MainScreen;
