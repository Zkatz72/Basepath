
import Typography from "@mui/material/Typography";
import PlayerCard from "./PlayerCard";
import { useTheme } from "@emotion/react";
function ResultCard(props) {
  
  const [correct, team, cur, checking] = props.result;
  const theme = useTheme();
  return (
    <PlayerCard isGoal = {false} img={props.img} player={props.player}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: correct
            ? theme.palette.success.main
            : theme.palette.error.main,
          paddingTop: ".3rem",
          fontFamily: "Roboto",
        }}
      >
        {correct ? "Correct!" : "Incorrect!"}
      </Typography>

      {team != null ? (
        <Typography variant="h7" sx={{ color: theme.palette.text.main }}>
          {`${checking} played with ${cur} on the ${team}.`}
        </Typography>
      ) : (
        <Typography variant="h7" sx={{ color: theme.palette.text.main }}>
          {`${checking} has never played on a team with ${cur.trim()}.`}
        </Typography>
      )}
    </PlayerCard>
  );
}

export default ResultCard;
