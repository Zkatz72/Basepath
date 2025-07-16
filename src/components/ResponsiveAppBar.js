import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Modal } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Fade from "@mui/material/Fade";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

import {
  borderRadius,
  fontFamily,
  height,
  palette,
  useTheme,
} from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = (event) => {
    setModalOpen(true);
  };
  const handleModalClose = (event) => {
    setModalOpen(false);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";
  const style = {
    position: "relative",

    width: 400,
    height: 650,
    top: "15%",
    bgcolor: theme.palette.primary.main,
    boxShadow: 24,
    borderRadius: 5,
    overflowY: "scroll",
    p: 2,
  };
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
                variant="h6"
                component="h6"
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
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>How to Play</u>
              </Typography>

              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6"
              >
                The goal of BasePath is to travel from one player to another,
                using only <i>connected</i> players. Two players are{" "}
                <i>connected</i> if they played together on the same team at any
                point in their career. <br></br>
                <br></br>There's no need to name the team they played for; just
                give us a teammate of the starting player and keep going! Just
                make sure to enter the goal player's name once you think you're
                rounding home!
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
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                <u>Notes</u>
              </Typography>

              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6"
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
                </ul>
              </Typography>
              <Divider
                color={theme.palette.bar.main}
                sx={{ marginBottom: "10px" }}
              />
              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6"
              >
                A new BasePath puzzle is available daily!
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Modal>
      <AppBar
        position="fixed"
        sx={{
          border: `.1px solid ${theme.palette.bord.main}`,
          borderBottom: `.1px solid ${theme.palette.bord.main}`,
          borderRight: "none",
          borderLeft: "none",
          borderTop: "none",

          bgcolor: theme.palette.primary.main,
          backgroundImage: "none",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src={isDarkMode ? "dmIcon.svg" : "lmIcon.svg"}
              alt="My Icon"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: 64,
                height: 64,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto",
                fontWeight: 700,
                letterSpacing: "0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BasePath
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color={theme.palette.icon.main}
              ></IconButton>
            </Box>
            <Box
              component="img"
              src={isDarkMode ? "dmIcon.svg" : "lmIcon.svg"}
              alt="My Icon"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: 60,
                height: 60,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Roboto",
                fontWeight: 700,
                letterSpacing: "0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BasePath
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="How to play">
                <IconButton onClick={handleModalOpen} sx={{ p: 0 }}>
                  <InfoOutlinedIcon sx={{ color: theme.palette.icon.main }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
