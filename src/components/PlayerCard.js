import classes from "./ResultCard.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { useTheme } from "@mui/material";
function PlayerCard(props) {

const {player,selectPlayer, unselectPlayer} = useContext(SelectedPlayerContext)
  const theme = useTheme();
  console.log('kdfhskdsk', props.img)
  return (

        <Box alignItems='center' sx = {{paddingTop:'10px', display: 'flex', flexDirection:'column', width:'100%', alignItems: 'center', marginBottom:'10px'} }>
          
          <Box
          textAlign={"center"}
  alignItems="center"
  bgcolor={""}
  sx={{
    width:'60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  }}
>
          <img className = {classes.image} src = {`images/${props.img}.jpg`}></img>
          <Typography variant="h5" 
          sx = {{
            textAlign: 'center',
            color:theme.palette.text.main,
            paddingTop: '.3rem',
            fontFamily: 'Roboto'
          }}
          >
            {props.player['name']}
          </Typography >
         {props.children}

          </Box>
        </Box>
    
  );
}

export default PlayerCard;
