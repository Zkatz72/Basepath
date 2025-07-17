import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
function PlayerCard(props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box
      alignItems="center"
      sx={{
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Box
        textAlign={"center"}
        alignItems="center"
        bgcolor={""}
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            borderRadius: "20%",
            width: "100px",
            height: "150px",
            marginTop: "10px",
            border: props.img ? "none" : `2px solid ${theme.palette.bord.main}`,
          }}
          src={
            props.img
              ? `/Basepath/images/${props.img}.jpg`
              : isDarkMode
              ? "/Basepath/images/image.png"
              : "/Basepath/images/image2.png"
          }
          alt="player"
        />
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: theme.palette.text.main,
            paddingTop: ".3rem",
            fontFamily: "Roboto",
          }}
        >
          {props.player["name"]}
        </Typography>
        {props.children}
      </Box>
    </Box>
  );
}

export default PlayerCard;
