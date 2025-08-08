import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import PlayerSearch from "./PlayerSearch";
import classes from "./MainScreen.module.css";
import { useEffect, useState, useLayoutEffect } from "react";
import ResultCard from "./ResultCard";
import { Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material";
import PlayerCard from "./PlayerCard";
import CompleteModal from "./CompleteModal";
import Button from "@mui/material/Button";
import { Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
function MainScreen(props) {
  const {
    selectedPlayers,
    restoreSelectedPlayers,
    setPrevPlayer,
    isComplete,
    makeComplete,
    setGoalPlayer,
    curPlayer,
    setPuzzleNum,
    finalResult,
    setFinalResult
  } = useContext(SelectedPlayerContext);
  const goalPlayerName = `${props.goalPlayer["firstName"]} ${props.goalPlayer["lastName"]} ${props.goalPlayer["suffix"]}`
  const curPlayerName = `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]} ${props.curPlayer["suffix"]}`;
  const [tick, setTick] = useState(0);
  const [showingModal, setShowingModal] = useState(false);
  const todayKey = props.puzzle
  const stored = JSON.parse(localStorage.getItem(todayKey) || "{}");
  useLayoutEffect(() => {
    document.body.style.backgroundColor = theme.palette.primary.main;
    setPuzzleNum(props.puzzle)
  }, []);
  
  const forceRerender = () => {
    setShowingModal(true);
    setTick((prev) => prev + 1); // triggers rerender
  };
  useEffect(() => {
    console.log("rerending jhkjh")
    setPrevPlayer(props.curPlayer);
    setGoalPlayer(props.goalPlayer);
    console.log(localStorage)
    console.log(todayKey)
    const pastData = JSON.parse(localStorage.getItem(todayKey));
    if (pastData) {
      makeComplete(true);
      setFinalResult(JSON.parse(localStorage.getItem(todayKey))["finalResult"])
      restoreSelectedPlayers(
        JSON.parse(localStorage.getItem(todayKey))["selectedPlayers"]
      );
    }
  }, [props.curPlayer]);
  const theme = useTheme();
  return (
    <>
      {isComplete && (
        <CompleteModal
          goalPlayer={props.goalPlayer}
          startPlayer={props.curPlayer}
          key={tick}
        ></CompleteModal>
      )}
      <Box  minHeight="100vh" height="100%" bgcolor={theme.palette.primary.main}>
        
        <div id="starting-player">
          <PlayerCard
            isGoal = {false}
            player={{
              name: `${props.curPlayer["firstName"]} ${props.curPlayer["lastName"]} ${props.curPlayer["suffix"]}`,
            }}
            img={props.curPlayer["id"]}
          ></PlayerCard>
        </div>
        <Divider variant="middle" color={theme.palette.bar.main} />
        <div>
          {selectedPlayers.map((player, index) => {
            const isLast = index === selectedPlayers.length - 1;
            return (
              <div>
                {isLast && !isComplete ? (
                  player["result"][0] == false ? (
                    <Slide
                      direction={index % 2 ? "left" : "right"}
                      in={true}
                      timeout={400}
                    >
                      <div className={classes.shake}>
                        <ResultCard
                          player={{
                            name: `${player["firstName"]} ${player["lastName"]} ${player["suffix"]}`,
                          }}
                          img={player["data"]["img"]}
                          result={player["result"]}
                        />
                      </div>
                    </Slide>
                  ) : (
                    <Slide
                      direction={index % 2 ? "right" : "left"}
                      in={true}
                      timeout={400}
                    >
                      <div>
                        <ResultCard
                          player={{
                            name: `${player["firstName"]} ${player["lastName"]} ${player["suffix"]}`,
                          }}
                          img={player["data"]["img"]}
                          result={player["result"]}
                        />
                      </div>
                    </Slide>
                  )
                ) : (
                  <ResultCard
                    player={{
                      name: `${player["firstName"]} ${player["lastName"]} ${player["suffix"]}`,
                    }}
                    img={player["data"]["img"]}
                    result={player["result"]}
                  ></ResultCard>
                )}
                <Divider
                  variant="middle"
                  color={theme.palette.bar.main}
                  flexItem
                  height="10px"
                  
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
              <Typography
                width="80%"
                paddingBottom="10px"
                color={theme.palette.text.main}
                align="center"
              >
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
                swapper = {props.swapper}
              />
            </Box>
            <Divider variant="middle" color={theme.palette.bar.main} />
          </>
        )}

        {!isComplete &&
        <div style = {{"paddingBottom": "10px"}}id="goal-section">
          <PlayerCard isGoal = {true}
            player={{
              name: `${goalPlayerName}`,
            }}
            img={props.goalPlayer["id"]}
          ></PlayerCard>
        </div>}
        {isComplete &&
        
        <div>
                        <ResultCard
                          player={{
                            name: `${goalPlayerName}`,
                          }}
                          img={props.goalPlayer['id']}
                          result={finalResult}
                        />
                      </div>
        }

        {isComplete && (
          <Box
            alignItems="center"
            sx={{
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
              sx={{
                boxShadow: "none",
                marginBottom: "20px",
                textTransform: "none",
                fontFamily: "Roboto",
                borderRadius: 2,
                ":hover": { color: "primary", boxShadow: "none" },
              }}
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
