import classes from "./ResultCard.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import PlayerCard from "./PlayerCard";
import Box from '@mui/material/Box'
function ResultCard(props) {

const {player,selectPlayer, unselectPlayer, prevPlayer} = useContext(SelectedPlayerContext)
  console.log('here', props.correct)
  const [correct, team, cur, checking] = props.result
  return (
        
        <PlayerCard player = {props.player}>
        
        
        <Typography variant="h6" 
        sx = {{
          textAlign: 'center',
          color:  correct ? "green" : "red",
          paddingTop: '.3rem',
          fontFamily: 'Roboto'
        }}
        >
          { correct ? "Correct!" : "Incorrect!"}
        </Typography>
          
        {team != null ?
        (<Typography variant="h7" sx ={{color: "white"}}>
          {`${checking} played with ${cur} on the ${team}`}

        </Typography>) : (<Typography variant="h7" sx ={{color: "white"}}>
          {`${checking} has never played on a team with ${cur}`}

        </Typography>)}
        </PlayerCard>
        
  );
}

export default ResultCard;
