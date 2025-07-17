import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

import {
  useTheme,
} from "@mui/system";
import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";

function CompleteModal(props) {
  const [isModalOpen, setModalOpen] = React.useState(true);
  const [buttonText, setButtonText] = React.useState(
    "Copy Results For Sharing"
  );
  const { selectedPlayers } = useContext(
    SelectedPlayerContext
  );
  const goalName = `${props.goalPlayer["firstName"]} ${props.goalPlayer["lastName"]} ${props.goalPlayer["suffix"]}`;
  const startName = `${props.startPlayer["firstName"]} ${props.startPlayer["lastName"]} ${props.startPlayer["suffix"]}`;

  const totalBases = selectedPlayers.filter((element, index, array) => {
    return element["result"][0] == true;
  }).length;
  const outs = selectedPlayers.filter((element, index, array) => {
    return element["result"][0] == false;
  }).length;
  const url = "http://fill/this/in.com";
  let shareString = `I connected ${startName.trim()} to ${goalName.trim()} on BasePath!\n`;
  shareString += `Total bases: ${totalBases}, Outs: ${outs}.\n`;
  for (let base of selectedPlayers) {
    shareString += base["result"][0] ? "🟩" : "🟥";
  }
  shareString += "\n" + "⚾️".repeat(selectedPlayers.length);
  shareString += "\n" + `Play ${url}`;
  
  const handleModalClose = (event) => {
    setModalOpen(false);
  };

  const theme = useTheme();
  const style = {
    position: "relative",
    overflowY: "scroll",
    width: 400,
    height: 650,
    top: "15%",
    bgcolor: theme.palette.primary.main,
    boxShadow: 24,
    borderRadius: 5,

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
                SAFE!
              </Typography>

              <IconButton
                size="small"
                onClick={handleModalClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  color: theme.palette.text.main,
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
                You successfully connected{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {props.startPlayer.firstName} {props.startPlayer.lastName}{" "}
                  {props.startPlayer.suffix}
                </Box>{" "}
                to{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {goalName.trim()}
                </Box>
                !
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
              <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6"
              >
                {`You did it in ${selectedPlayers.length} total bases!`}
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
                <u>Your Path</u>
              </Typography>
            </Box>
            <Typography
              sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
              variant="h6"
              component="h6"
            >
              <Box
                sx={{
                  color: theme.palette.text.main,
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                <ol style={{ textAlign: "center", paddingLeft: 0 }}>
                  {[
                    { ...props.startPlayer, result: [1, null] },
                    ...selectedPlayers,
                    { ...props.goalPlayer, result: [2, null] },
                  ].map((item, index) => (
                    <li key={index} style={{ listStylePosition: "inside" }}>
                      {`${item.firstName} ${item.lastName} ${
                        item.suffix || ""
                      } ${
                        item.result?.[0] === 1
                          ? "🟢"
                          : item.result?.[0] === 2
                          ? "🏁"
                          : item.result?.[0] === true
                          ? "✅"
                          : "❌"
                      }`}
                    </li>
                  ))}
                </ol>
              </Box>
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shareString);
                  setButtonText("Copied!");
                }}
                sx={{
                  boxShadow: "none",
                  marginBottom: "10px",
                  textTransform: "none",
                  fontFamily: "Roboto",
                  ":hover": { color: "primary", boxShadow: "none" },
                }}
                variant="contained"
                color="secondary"
              >
                {`${buttonText}`}
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}
export default CompleteModal;
