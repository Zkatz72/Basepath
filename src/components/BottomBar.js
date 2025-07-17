
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";


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
