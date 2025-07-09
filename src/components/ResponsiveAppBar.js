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
import { Modal } from "@mui/material";
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
                  color: "white",
                  fontFamily: "Figtree",
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                About BasePath
              </Typography>

              <IconButton
                size="small"
                onClick={handleModalClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  color: "white",
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{ color: "white", fontFamily: "Figtree" }}
                variant="h9"
                component="h9"
              >
                BasePath is a daily baseball quiz game powered by data provided by Baseball
                Reference®.
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Figtree",
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                How To Play
              </Typography>
            </Box>
            <Typography
              sx={{ color: "white", fontFamily: "Figtree" }}
              variant="h9"
              component="h9"
            >
              The goal of BasePath is to travel from one player to another,
              using only <i>connected</i> players. Two players are{" "}
              <i>connected</i> if they played together at any point in their
              career. <br></br>
              <br></br>There's no need to name the team they played for; just
              give us a teammate of the starting player and keep going!
              Just make sure to enter the goal player's name once you think you're rounding home!
              
            </Typography>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Figtree",
                }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
              >
                Notes
              </Typography>
            </Box>
            <Typography
              sx={{ color: "white", fontFamily: "Figtree" }}
              variant="h9"
              component="h9"
            >
              <ul>
              <li>
                Two players are considered <i>teammates</i> if they played for the <b>same team</b> at the <b>same time</b>.
              </li>
              <li>
                It is possible for two players to have never played in a game together and still be considered teammates.
              </li>
              
              </ul>
              
            </Typography>
          </Box>
        </Slide>
      </Modal>
      <AppBar
        position="fixed"
        sx={{
          borderBottom: "1px solid #0f0f0f",
          bgcolor: theme.palette.primary.main,
          backgroundImage: "none",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SportsBaseballIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Figtree",
                fontWeight: 700,
                letterSpacing: ".2rem",
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
                color="inherit"
              ></IconButton>
            </Box>
            <SportsBaseballIcon
              sx={{
                color: "white",
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Figtree",
                fontWeight: 700,
                letterSpacing: ".2rem",
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
                  <InfoOutlinedIcon sx={{ color: "white" }} />
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
