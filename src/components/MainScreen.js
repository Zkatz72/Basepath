import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import PlayerSearch from "./PlayerSearch";
import classes from "./MainScreen.module.css";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import theme from "./ui/theme";
import Divider from '@mui/material/Divider';
import { useTheme } from "@mui/material";
import PlayerCard from "./PlayerCard";
import CompleteModal from "./CompleteModal";
import Button from '@mui/material/Button';
let guesses = 4
function MainScreen(props) {
  const { prevPlayer, selectedPlayers, selectPlayer, setPrevPlayer, isComplete, setGoalPlayer, curPlayer } = useContext(SelectedPlayerContext);
  const curPlayerName = `${props.curPlayer['firstName']} ${props.curPlayer['lastName']} ${props.curPlayer['suffix']}`
  const [tick, setTick] = useState(0);

const forceRerender = () => {
  setTick((prev) => prev + 1); // triggers rerender
  
};
  console.log(selectedPlayers)
  console.log(isComplete)
  useEffect(() => {setPrevPlayer(props.curPlayer);setGoalPlayer(props.goalPlayer) }, []);
  const theme = useTheme()
  return (
    <>

    {isComplete && <CompleteModal key={tick}></CompleteModal>}
    <Box minHeight = '100vh' height='100%' bgcolor={theme.palette.primary.main}>
      <Toolbar></Toolbar>
      <Box
  component="section"
  sx={{
    width: '100%',
    p: 0,
    flexGrow: 1,
    borderBottom: '.1px solid #777777',
    zIndex: 1000,
    display: 'flex',              // ✅ Add this
    flexDirection: 'row',
    bgcolor: theme.palette.primary.main,
    color: 'white',
    position: 'fixed',
    textAlign: 'center',
  }}
>
  <Box sx={{ p:1,flex: 1, border: '.1px solid #777777',}}>
    <b>Total bases: {selectedPlayers.length}</b>
  </Box>
  <Box sx={{ p:1,flex: 1, border: '.1px solid #777777',}}>
    <b>Outs: {selectedPlayers.length}</b>
  </Box>
</Box>
      <Box component="section" sx={{ p: 1 }}>
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
      {!isComplete && <Typography color="white" align="center">{`Can you name a player who has played with ${curPlayer != null ? curPlayer['name'].trim(): curPlayerName.trim()}?`}</Typography>}
      {!isComplete && <PlayerSearch players={props.players} />}
      {!isComplete && <Divider variant="middle" color = 'white' height = '2px' flexItem/>}
      
      <div id = "goal-section">
        <PlayerCard player={{'name': `${props.goalPlayer["firstName"]} ${props.goalPlayer["lastName"]} ${props.goalPlayer["suffix"]}` }} ></PlayerCard>
      
      </div>
      
      {isComplete &&
      <Box alignItems='center' sx = {{marginTop: '30px', display: 'flex', flexDirection:'column', width:'100%', alignItems: 'center'}}>
          
          
          <Button onClick = {()=>{forceRerender()}}sx = {{fontFamily:"Figtree", ":hover":{color:'primary'}}}variant="contained" color="secondary">
          Summary
        </Button>


        </Box>}
      </Box>
      
      
      </>

  );
}

export default MainScreen;
