import PlayerName from "./PlayerName";
import classes from "./PlayerList.module.css";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";
function PlayerList(props) {
  const theme = useTheme();
  return (
    <div>
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "200px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          maxWidth: "500px",
          zIndex: 1000,
          position: "absolute",
          backgroundColor: theme.palette.primary.main,
          width: "80%",
          border: `1px solid ${theme.palette.bord.main}`,
          paddingTop: "5px",
          paddingBottom: "5px",
          borderTop: 0,
        }}
      >
        {props.players.map((item) => (
          <PlayerName
            key={item.id}
            player={item}
            click={props.nameClick}
            name={`${item.firstName} ${item.lastName} ${item.suffix}`}
          />
        ))}
      </Box>
    </div>
  );
}

export default PlayerList;
