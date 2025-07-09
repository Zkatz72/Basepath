import classes from "./ResultCard.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
function PlayerCard(props) {

const {player,selectPlayer, unselectPlayer} = useContext(SelectedPlayerContext)
  

  return (
    
        <Box alignItems='center' sx = {{display: 'flex', flexDirection:'column', width:'100%', alignItems: 'center'}}>
          
          
          <img className = {classes.image} src = "https://placehold.co/100x150"></img>
          <Typography variant="h5" 
          sx = {{
            textAlign: 'center',
            color:'white',
            paddingTop: '.3rem',
            fontFamily: 'Roboto'
          }}
          >
            {props.player['name']}
          </Typography >
         {props.children}


        </Box>
    
  );
}

export default PlayerCard;
