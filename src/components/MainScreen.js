import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import PlayerSearch from "./PlayerSearch";
import classes from "./MainScreen.module.css";
import { useEffect, useState, useLayoutEffect } from "react";
import ResultCard from "./ResultCard";
import { Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import theme from "./ui/theme";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material";
import PlayerCard from "./PlayerCard";
import CompleteModal from "./CompleteModal";
import Button from "@mui/material/Button";
let guesses = 4;
function MainScreen(props) {
  const {
    prevPlayer,
    selectedPlayers,
    selectPlayer,
    restoreSelectedPlayers,
    setPrevPlayer,
    isComplete,
    makeComplete,
    setGoalPlayer,
    curPlayer,
  } = useContext(SelectedPlayerContext);
  
  const curPlayerName = `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]} ${props.curPlayer["suffix"]}`;
  const [tick, setTick] = useState(0);
  const [showingModal, setShowingModal] = useState(false);
  const todayKey = new Date().toISOString().split('T')[0];
  const stored = JSON.parse(localStorage.getItem(todayKey) || '{}');
  const wasCompleted = stored.completed === true;
  useLayoutEffect(() => {
      document.body.style.backgroundColor = theme.palette.primary.main
  });
  
  const forceRerender = () => {
    setShowingModal(true)
    setTick((prev) => prev + 1); // triggers rerender
  };
  console.log(selectedPlayers);
  console.log(isComplete);
  useEffect(() => {
    setPrevPlayer(props.curPlayer);
    setGoalPlayer(props.goalPlayer);
    const pastData = JSON.parse(localStorage.getItem(todayKey))
    console.log('over here')
    if (pastData){
      makeComplete(true)
      restoreSelectedPlayers(JSON.parse(localStorage.getItem(todayKey))['selectedPlayers'])
    }
  }, []);
  const theme = useTheme();
  console.log(theme)
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <>
      {isComplete && <CompleteModal goalPlayer={props.goalPlayer} startPlayer = {props.curPlayer} key={tick}></CompleteModal>}
      <Box minHeight="100vh" height="100%" bgcolor={theme.palette.primary.main}>
        <Toolbar></Toolbar>
        <Box
          component="section"
          sx={{
            width: "100%",
            p: 0,
            flexGrow: 1,
            
            borderBottom:`none`,
            zIndex: 1000,
            display: "flex", // ✅ Add this
            flexDirection: "row",
            bgcolor: theme.palette.primary.main,
            color: "white",
            position: "fixed",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              p: 2,
              flex: 1,
              border: `.1px solid ${theme.palette.bord.main}`,
              borderLeft: "none",
              borderTop:'none',
              borderRight: "none",
              
            }}
          >
            <Typography sx = {{color:theme.palette.text.main}}>
            
              Total bases:{" "}
              {
                selectedPlayers.filter((element, index, array) => {
                  return element["result"][0];
                }).length
              }
            </Typography>
          </Box>
          
          <Box sx = {{width:'.1px'}}bgcolor={theme.palette.bord.main}></Box>
          <Box
            sx={{
              p: 2,
              flex: 1,
              border: `.1px solid ${theme.palette.bord.main}`,
              borderRight: "none",
              borderTop:'none',
              borderLeft:'none',
              zIndex:2000
            }}
          >
            <Typography sx = {{color:theme.palette.text.main}}>
            
              Total Outs:{" "}
              {
                selectedPlayers.filter((element, index, array) => {
                  return element["result"][0] == false;
                }).length
              }
            </Typography>
          </Box>
        </Box>
        <Box component="section" sx={{ p: 2 }}>
          &nbsp;
        </Box>
        <div id="starting-player">
          <PlayerCard
            player={{
              name: `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]} ${props.curPlayer["suffix"]}`,
            }}
            img={props.curPlayer["id"]}
          ></PlayerCard>
        </div>
        <Divider variant="middle" color={theme.palette.bar.main}  />
        <div className={classes.results}>
          {selectedPlayers.map((player, index) => {
            console.log("here", player["data"]["img"]);
            return (
              <div>
                <ResultCard
                  player={{
                    name: `${player["firstName"]} ${player["lastName"]} ${player["suffix"]}`,
                  }}
                  img={player["data"]["img"]}
                  result={player["result"]}
                ></ResultCard>
                <Divider
                  variant="middle"
                  color={theme.palette.bar.main}
                  flexItem
                  height="10px" 
                  f
                />
              </div>
            );
          })}
        </div>
        {!isComplete && (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <Typography width="80%" paddingBottom='10px' color={theme.palette.text.main} align="center">
                {`Can you name a player who has played with ${
                  curPlayer != null
                    ? curPlayer["name"].trim()
                    : curPlayerName.trim()
                }?`}
              </Typography>

              <PlayerSearch
                sTrie={props.sTrie}
                nTrie={props.nTrie}
                fTrie={props.fTrie}
                lTrie={props.lTrie}
                players={props.players}
              />
            </Box>
            <Divider variant="middle" color={theme.palette.bar.main} f />
          </>
        )}

        <div id="goal-section">
          <PlayerCard
            player={{
              name: `${props.goalPlayer["firstName"]} ${props.goalPlayer["lastName"]} ${props.goalPlayer["suffix"]}`,
            }}
            img={props.goalPlayer["id"]}
          ></PlayerCard>
        </div>

        {isComplete && (
          <Box
            alignItems="center"
            sx={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                forceRerender();
              }}
              sx={{ boxShadow: 'none', marginBottom: '10px', textTransform: "none", fontFamily: "Roboto", ":hover": { color: "primary", boxShadow: 'none'} }}
              variant="contained"
              color="secondary"
              
            >
              Summary
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default MainScreen;
