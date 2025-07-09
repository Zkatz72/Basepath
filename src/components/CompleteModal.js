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
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function CompleteModal() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(true);
  const { prevPlayer, selectedPlayers, goalPlayer } = useContext(SelectedPlayerContext);
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
      height: 400,
      top: '25%',
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
        style={{display:'flex',justifyContent:'center',justifyContent:'center'}}
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
        <Box sx = {style}>
          <Box sx = {{paddingBottom:'10px'}} justifyContent= 'space-between' alignItems = "center" flexDirection='row' display={'flex'}  >
            
            <Typography sx = {{marginLeft: '20%', textAlign: 'center', color: 'white', fontFamily:'Figtree'}} id="modal-modal-title" variant="h5" component="h5">
              {`Congrats, you connected ${goalPlayer['firstName']}`}
            </Typography>
            <IconButton size="small" onClick = {handleModalClose} style = {{}}color="white"  aria-label="add an alarm">
                <CloseIcon/>
            </IconButton>
          </Box>
          </Box>
        </Slide>
      </Modal>
    
    </div>
  );
  
}
export default CompleteModal;