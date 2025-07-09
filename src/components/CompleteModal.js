import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Fade from '@mui/material/Fade';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { borderRadius, fontFamily, palette, useTheme } from '@mui/system'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useContext } from 'react';
import SelectedPlayerContext from "./store/selected-player-context";
import { PropaneSharp } from '@mui/icons-material';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function CompleteModal(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(true);
  const { prevPlayer, selectedPlayers, goalPlayer } = useContext(SelectedPlayerContext);
  const goalName = `${goalPlayer['firstName']} ${goalPlayer['lastName']} ${goalPlayer['suffix']}`
  let shareString = ""
  for(let base of selectedPlayers){
    shareString += (base['result'][0] ? "🟩" : "🟥")
  }
  shareString += '\n' + "⚾️".repeat(selectedPlayers.length)

  const handleModalOpen = (event) => {
    setModalOpen(true)
  }
  const handleModalClose = (event) => {
    setModalOpen(false)
  }
  
  const theme = useTheme()
  const style = {
      position: 'relative',
  
      width: 400,
      height: 650,
      top: '15%',
      bgcolor: theme.palette.primary.main,
      boxShadow: 24,
      borderRadius: 5,
      p: 2,
    };
  return (
    
    <div className='AppBar'>
    
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
                SAFE!
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
  You successfully connected{" "}
  <Box component="span" sx={{ fontWeight: "bold" }}>
    {prevPlayer.firstName} {prevPlayer.lastName} {prevPlayer.suffix}
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
              sx={{ color: "white", fontFamily: "Figtree"}}
              variant="h9"
              component="h9"
            >
              {`You did it in ${selectedPlayers.length} total bases!`}
              
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
                <u>Your Path</u>
              </Typography>
            </Box>
            <Typography
              sx={{ color: "white", fontFamily: "Figtree" }}
              variant="h9"
              component="h9"
            >
              <Box sx={{ color: "white", fontFamily: "Figtree" }}>
            <ol>
              {[{...prevPlayer, result: [1,null]},...selectedPlayers,{...goalPlayer, result: [2,null]}].map((item, index) => (
                <li key={index}>{`${item['firstName']} ${item['lastName']} ${item['suffix']} ${item['result'][0] === true ? "✅" : (item['result'][0] === 1 ? "🟢" : (item['result'][0] === 2 ? "🏁" :"❌"))}`}</li>
              ))}
            </ol>
          </Box>
              
            </Typography>
          </Box>
        </Slide>
      </Modal>
    
    </div>
  );
  
}
export default CompleteModal;