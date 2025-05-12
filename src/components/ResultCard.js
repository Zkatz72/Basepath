import classes from "./ResultCard.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import PlayerCard from "./PlayerCard";
import Box from '@mui/material/Box'
function ResultCard(props) {

const {player,selectPlayer, unselectPlayer} = useContext(SelectedPlayerContext)
  

  return (
        
        <PlayerCard player = {props.player}>
        
        <Typography variant="h6" 
        sx = {{
          textAlign: 'center',
          color:'white',
          paddingTop: '.3rem',
          fontFamily: 'Roboto'
        }}
        >
          {"Correct!"}
        </Typography>
        </PlayerCard>
        
  );
}

export default ResultCard;
