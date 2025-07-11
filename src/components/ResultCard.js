import classes from "./ResultCard.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import PlayerCard from "./PlayerCard";
import Box from '@mui/material/Box'
import { useTheme } from "@emotion/react";
function ResultCard(props) {

const {player,selectPlayer, unselectPlayer, prevPlayer} = useContext(SelectedPlayerContext)
  console.log('here324', props.correct, props.img)
  const [correct, team, cur, checking] = props.result
  const theme = useTheme();
  return (
        
        <PlayerCard img = {props.img} player = {props.player}>
        
        
        <Typography variant="h6" 
        sx = {{
          textAlign: 'center',
          color:  correct ? theme.palette.success.main : theme.palette.error.main ,
          paddingTop: '.3rem',
          fontFamily: 'Roboto'
        }}
        >
          { correct ? "Correct!" : "Incorrect!"}
        </Typography>
          
        {team != null ?
        (<Typography variant="h7" sx ={{color: theme.palette.text.main}}>
          {`${checking} played with ${cur} on the ${team}`}

        </Typography>) : (<Typography variant="h7" sx ={{color: theme.palette.text.main}}>
          {`${checking} has never played on a team with ${cur}`}

        </Typography>)}
        </PlayerCard>
        
  );
}

export default ResultCard;
