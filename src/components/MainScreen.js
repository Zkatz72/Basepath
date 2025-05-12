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
let guesses = 4
function MainScreen(props) {
  const { prevPlayer, selectedPlayers, selectPlayer } = useContext(SelectedPlayerContext);
  
  useEffect(() => {}, []);
  const theme = useTheme()
  return (
    <Box minHeight = '100vh' height='100%' bgcolor={theme.palette.primary.main}>
      <Toolbar></Toolbar>
      <Box component="section" sx={{ width: '100%', p: 2, flexGrow: 1, zIndex:1000, flexDirection: 'column', bgcolor: theme.palette.secondary.main, color: 'white', position: 'fixed', textAlign:'center' }}>
        <b>Guesses: {selectedPlayers.length}</b>
      </Box>
      <Box component="section" sx={{ p: 2 }}>
        &nbsp;
      </Box>
      <div id = "starting-player">
        <PlayerCard player={{'name': `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]}` }} ></PlayerCard>
      </div>
      <Divider variant="middle" color = 'white' f/>
      <div className={classes.results}>
        
          {selectedPlayers.map((player, index) => {
            return (
              <div>
              <ResultCard player={{'name': `${player["firstName"]} ${player["lastName"]}` }} ></ResultCard>
              <Divider variant="middle" color = 'white' flexItem height = '10px'/>
              </div>
            );
          })}
      </div>
      <Divider variant="middle" color = 'white' flexItem/>
      <PlayerSearch players={props.players} />
      <Divider variant="middle" color = 'white' height = '2px' flexItem/>
      <div id = "ending-player">
        <PlayerCard player={{'name': `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]}` }} ></PlayerCard>
      
      </div>
      <div>
        {prevPlayer && (<p>Current Player: {`${prevPlayer['id']}`}</p>) }
        
      </div>
      
      </Box>
      
      
  );
}

export default MainScreen;
