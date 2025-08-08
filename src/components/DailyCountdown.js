import Countdown from 'react-countdown';
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const getNextMidnightPST = () => {
  const now = new Date();
  const pstNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const midnight = new Date(pstNow);
  midnight.setHours(24, 0, 0, 0); // 12:00 AM PST tomorrow
  return midnight;
};

function DailyCountdown() {
const theme = useTheme();
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "10px" }}>
      <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6">Time until next game (PST):</Typography>

        
      <Countdown
        date={getNextMidnightPST()}
        renderer={({ hours, minutes, seconds }) => (
         <Typography
                sx={{ color: theme.palette.text.main, fontFamily: "Roboto" }}
                variant="h6"
                component="h6">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Typography>
        )}
      />
    </Box>
  );
}

export default DailyCountdown;