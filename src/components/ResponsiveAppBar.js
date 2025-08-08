import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Modal } from "@mui/material";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DailyCountdown from "./DailyCountdown";
import { useContext, useEffect, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import { useTheme } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isStatsModalOpen, setStatsModalOpen] = useState(false);
  const [stats, setStats] = useState([{ stat: "Avg, Outs", val: 10 }])

  const {
    selectedPlayers,
    restoreSelectedPlayers,
    setPrevPlayer,
    isComplete,
    makeComplete,
    setGoalPlayer,
    curPlayer,
    puzzle,
  } = useContext(SelectedPlayerContext);
  const handleModalOpen = (event) => {
    setModalOpen(true);
  };
  const handleModalClose = (event) => {
    setModalOpen(false);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleStatsModalOpen = (event) => {
    setStatsModalOpen(true);
  };
  const handleStatsModalClose = (event) => {
    setStatsModalOpen(false);
  };

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";
  const style = {
    position: "relative",

    maxWidth: 400,
    maxHeight: 650,
    width: "90%",
    height: "80%",
    top: "10%",
    bgcolor: theme.palette.primary.main,
    boxShadow: 24,
    borderRadius: 2,
    overflowY: "scroll",
    p: 2,
  };
  const styleStats = {
    position: "relative",

    maxWidth: 400,
    maxHeight: 650,
    width: "90%",
    height: "55%",
    top: "10%",
    bgcolor: theme.palette.primary.main,
    boxShadow: 24,
    borderRadius: 2,
    overflowY: "scroll",
    p: 2,
  };

  useEffect(() => {
    //get the stats

    let totalOuts = 0;
    let totalBases = 0;
    let totalGamesPlayed = 0;
    let currentStreak = 0;
    let cur = props.puzzle;
    console.log(cur)
    while (true) {
      if (localStorage[`bp-${cur}`] != null) {
        currentStreak += 1;
        cur -= 1;
      } else {
        break;
      }
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.startsWith("bp")) {
        totalGamesPlayed += 1;
        const sp = JSON.parse(localStorage[key])["selectedPlayers"];

        totalBases += sp.filter((element, index, array) => {
          return element["result"][0];
        }).length;
        totalOuts += sp.filter((element, index, array) => {
          return element["result"][0] == false;
        }).length;

        console.log(totalBases)
      }
    }

    const avgOuts = Math.round((totalOuts / totalGamesPlayed) * 100)/ 100
    const avgTotalBases = Math.round((totalBases / totalGamesPlayed) * 100)/ 100

    const curStats = [

      
      {stat: "Avg. Outs", val: isNaN(avgOuts) ? "∞" : avgOuts },
      {stat: "Avg. Total Bases", val: isNaN(avgTotalBases) ? "∞" : avgOuts},
      {stat: 'Current Streak', val : currentStreak},
      {stat: 'Games Played', val : totalGamesPlayed}
    ];

    setStats(curStats)
  }, []);
  return (
    <div className="AppBar">
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        style={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "center",
        }}
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
          <Box sx={style}>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.main,
                  fontFamily: "Roboto",
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>About BasePath</u>
              </Typography>

              <IconButton
                size="small"
                onClick={handleModalClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  color: theme.palette.icon.main,
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="p"
                component="p"
              >
                BasePath is a daily baseball quiz game powered by data provided
                by Baseball Reference®.
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.main,
                  fontFamily: "Roboto",
                  paddingBottom: "10px"
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>How to Play</u>
              </Typography>

              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="p"
                component="p"
              >
                The goal of BasePath is to travel from one player to another,
                using only <i>connected</i> players. Two players are{" "}
                <i>connected</i> if they played together on the same team at any
                point in their career. <br></br>
                <br></br>There's no need to name the team they played for; just
                give us a teammate of the starting player and keep going!
                <br></br>
                <br />
                <b>
                  <u>Total bases:</u>
                </b>{" "}
                Correct guesses.
                <br />
                <b>
                  <u>Outs:</u>
                </b>{" "}
                Incorrect guesses.
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.main,
                  fontFamily: "Roboto",
                  paddingBottom: "10px"
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>Notes</u>
              </Typography>

              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="p"
                component="p"
              >
                <ul>
                  <li>
                    Two players are considered <i>teammates</i> if they played
                    for the <b>same team</b> at the <b>same time</b>.
                  </li>
                  <li>
                    It is possible for two players to have never played in a
                    game together and still be considered teammates.
                  </li>
                  <li>
                    BasePath uses stints for each player as provided by BaseballReference®; any stints missing start and/or end dates are assumed to be the length of the entire season.
                  </li>
                </ul>
              </Typography>
              <Divider
                color={theme.palette.bar.main}
                sx={{ marginBottom: "10px" }}
              />

              <DailyCountdown></DailyCountdown>
            </Box>
          </Box>
        </Slide>
      </Modal>
      <Modal
        open={isStatsModalOpen}
        onClose={handleStatsModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Slide direction="up" in={isStatsModalOpen} mountOnEnter unmountOnExit>
          <Box sx={styleStats}>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.text.main,
                  fontFamily: "Roboto",
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>Stats</u>
              </Typography>

              <IconButton
                size="small"
                onClick={handleStatsModalClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  color: theme.palette.icon.main,
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            {stats.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                  variant="h2"
                  component="h2"
                >
                  {item.val}
                </Typography>
                <Typography
                  sx={{ color: theme.palette.infor.main, fontFamily: "Roboto" }}
                  variant="p"
                  component="p"
                >
                  {item.stat}
                </Typography>
              </Box>
            ))}
          </Box>
        </Slide>
      </Modal>
      <AppBar
        position="fixed"
        sx={{
          border: `1px solid ${theme.palette.bord.main}`,
          borderBottom: `1px solid ${theme.palette.bord.main}`,
          borderRight: "none",
          borderLeft: "none",
          borderTop: "none",

          bgcolor: theme.palette.primary.main,
          backgroundImage: "none",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              <Tooltip title="Statistics">
                <IconButton
                  size="small"
                  aria-label="user stats"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleStatsModalOpen}
                  color={theme.palette.icon.main}
                >
                  <svg
                    fill={theme.palette.icon.main}
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22,7H16.333V4a1,1,0,0,0-1-1H8.667a1,1,0,0,0-1,1v7H2a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM7.667,19H3V13H7.667Zm6.666,0H9.667V5h4.666ZM21,19H16.333V9H21Z" />
                  </svg>
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                alignItems: "center",
                flexDirection: "flex",
                display: { xs: "flex", md: "flex" },
              }}
            >
              <Box
                component="img"
                src={
                  isDarkMode ? "/Basepath/dmIcon.svg" : "/Basepath/lmIcon.svg"
                }
                alt="My Icon"
                sx={{
                  display: { xs: "flex", md: "flex" },

                  width: 56,
                  height: 56,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "flex" },

                  fontFamily: "Roboto",
                  fontWeight: 700,
                  letterSpacing: "0rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BasePath
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="How to play">
                <IconButton onClick={handleModalOpen} sx={{ p: 0 }}>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={theme.palette.icon.main}
                      stroke-width="2"
                    />
                    <path
                      d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                      stroke={theme.palette.icon.main}
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="1"
                      fill={theme.palette.icon.main}
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
      <Box
        component="section"
        sx={{
          width: "100%",
          p: 0,
          flexGrow: 1,

          borderBottom: `none`,
          zIndex: 1000,
          display: "flex",
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
            border: `1px solid ${theme.palette.bord.main}`,
            borderLeft: "none",
            borderTop: "none",
            borderRight: "none",
          }}
        >
          <Typography sx={{ color: theme.palette.text.main }}>
            Total bases:{" "}
            {
              selectedPlayers.filter((element, index, array) => {
                return element["result"][0];
              }).length
            }
          </Typography>
        </Box>

        <Box sx={{ width: "1px" }} bgcolor={theme.palette.bord.main}></Box>
        <Box
          sx={{
            p: 2,
            flex: 1,
            border: `1px solid ${theme.palette.bord.main}`,
            borderRight: "none",
            borderTop: "none",
            borderLeft: "none",
            zIndex: 2000,
          }}
        >
          <Typography sx={{ color: theme.palette.text.main }}>
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
    </div>
  );
}
export default ResponsiveAppBar;
