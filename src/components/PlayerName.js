import classes from "./PlayerName.module.css";
import { useContext, useState } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { color, useTheme } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import { Padding } from "@mui/icons-material";
function PlayerName(props) {
  const { player, selectPlayer, unselectPlayer } = useContext(
    SelectedPlayerContext
  );
  const theme = useTheme();
  const namePlate = {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "5px",
    paddingBottom: "5px",
    display: { xs: "flex", md: "flex" },
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  };
  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    height: "100%",
    padding: "5px",
    margin: "10px",
    width: "80%",
    flex: 3,
    backgroundColor: theme.palette.quartenary.main,
    borderRadius: "10px",

    color: theme.palette.primary.main,
    fontFamily: ["Figtree"].join(","),
    "&:hover": {
      backgroundColor: theme.palette.quinary.main,
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.quinary.main,
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  return (
    <>
      <Box sx={namePlate}>
        <Box sx={{ flex: 14, marginLeft: "10px" }}>
          <Box sx={{ color: theme.palette.text.main }}>
            {props.name}
            <Box sx={{ fontSize: ".8rem", color: theme.palette.infor.main }}>
              {`${props.player["startYear"]}-${props.player["endYear"]}`}
            </Box>
          </Box>
        </Box>
        <Button
          onClick={() => {
            props.click();
            selectPlayer(props.player);
          }}
          sx={{
            boxShadow: "none",
            color: theme.palette.primary.main,
            width: "10%",
            marginRight: "10px",
            borderRadius: "5px",
            bgcolor: theme.palette.quartenary.main,
            textTransform: "none",
            fontFamily: "Roboto",
            ":hover": {
              bgcolor: theme.palette.quinary.main,
              boxShadow: "none",
            },
          }}
          variant="contained"
        >
          Select
        </Button>
      </Box>
    </>
  );
}

export default PlayerName;
