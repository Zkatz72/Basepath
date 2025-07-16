import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useTheme } from "@emotion/react";
export default function BottomAppBar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: "auto",
        bgcolor: theme.palette.secondary.main,
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box flexGrow={1} textAlign={"center"} fontSize={"12px"}>
          Created by <u>Zachary Katz</u>. All data provided by
          BaseballReference®.
        </Box>
      </Toolbar>
    </AppBar>
  );
}
