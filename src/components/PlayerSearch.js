import { useState, useRef } from "react";
import classes from "./PlayerSearch.module.css";
import PlayerList from "./PlayerList";
import { useEffect } from "react";
import { scroller } from "react-scroll";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { Button, InputBase } from "@mui/material";
import { useContext } from "react";
import SelectedPlayerContext from "./store/selected-player-context";
function PlayerSearch(props) {
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isListVisible, setListVisible] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const ref = useRef(null);
  const {
    selectedPlayers,
    
  } = useContext(SelectedPlayerContext);
  useEffect(() => {
    function handleClick(event) {
      // Check if click is outside the div referenced by ref
      if (ref.current && !ref.current.contains(event.target)) {
        setListVisible(false);
        setFocused(false);
        setSuggestions([]);
      }
    }

    // Attach the event listener on mount
    document.addEventListener("mousedown", handleClick);

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function searchSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    let text = event.target.value;

    setQuery(text);
  }

  const showList = () => setListVisible(true);
  const hideList = () => {
    setListVisible(false);
    setQuery("");
    setFocused(false);
    scroller.scrollTo("search-section", {
      duration: 50,
      smooth: true,
      offset: -window.innerHeight / 2, // Adjust to center the element
    });
    setSuggestions([]);
  };
  useEffect(() => {
    updateSuggestions();
  }, [query]);
  const theme = useTheme();
  async function updateSuggestions() {
    /*
    function removeDiacritics(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
      */
    let text = query.trim();
    const invalidCharsRegex = /[\\\^\$\*\+\?\.\(\)\|\[\]\{\}]/g;

    text = text.replace(invalidCharsRegex, " ");
    const regex = new RegExp(`^${text}`, "i");

    let res = [];
    if (text.length === 0) {
      res = [];
      setSuggestions(res);
      return;
    }

    let p = [];
    let f = props.fTrie.getWithPrefix(text.toLowerCase());

    let l = props.lTrie.getWithPrefix(text.toLowerCase());
    let n = props.nTrie.getWithPrefix(text.toLowerCase());
    let s = props.sTrie.getWithPrefix(text.toLowerCase());
    /*
    for (let f in props.players) {
      p.push(props.players[f]);
    }
    res = p.filter((p) => {
      let name = removeDiacritics(`${p["firstName"]} ${p["lastName"]}`);
      let f = removeDiacritics(p["firstName"]);
      let l = removeDiacritics(p["lastName"]);
      return regex.test(f) || regex.test(l) || regex.test(name);
    });
  */
    let seen = new Set();
    res = [...f, ...l, ...n, ...s].filter((player) => {
      let key = player.id || `${player.firstName}-${player.lastName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    res.sort(
      (a, b) => b["endYear"] - b["startYear"] - (a["endYear"] - a["startYear"])
    );
    res = res.slice(0, 50);
    res.sort((a, b) => b["startYear"] - a["startYear"]);
    setSuggestions(res.slice(0, 50));
  }
  //i make a search bar from scratch below...
  return (
    <>
    <div ref={ref} className={classes.container}>
      <div id="search-section" className={classes.searchContainer}>
       <form onSubmit={searchSubmit} style={{ width: "100%" }}>
  <div style={{ position: "relative", display: "flex", width: "100%" }}>
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.text.main}`,
        borderRight: "none",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius:
          !isListVisible || suggestions.length === 0 ? 8 : 0,
        height: 40,
      }}
    >
      <SearchIcon sx={{ color: theme.palette.bord.main }} />
    </div>

    <InputBase
      value={query}
      placeholder="Search..."
      onChange={handleChange}
      onFocus={() => {
        showList();
        setFocused(true);
      }}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.main,
        border: `1px solid ${theme.palette.text.main}`,
        borderLeft: "none",
        pl: 1,
        pr: 1,
        height: 40,
        fontSize: "1rem",
        borderTopRightRadius: 8,
        borderBottomRightRadius:
          !isListVisible || suggestions.length === 0 ? 8 : 0,
        width: "100%",
        "&::placeholder": {
          color: theme.palette.infor.main,
        },
      }}
    />

    {isFocused && (
      <div
        style={{
          content: "''",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderRadius: 8,
          borderBottomRightRadius:
          !isListVisible || suggestions.length === 0 ? 8 : 0,
          borderBottomLeftRadius:
          !isListVisible || suggestions.length === 0 ? 8 : 0,
          boxShadow: `
            4px 0 10px rgba(0, 123, 255, 0.6),
            0 -4px 10px rgba(0, 123, 255, 0.6),
            0 4px 10px rgba(0, 123, 255, 0.6)
          `,
          zIndex: 0,
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    )}
  </div>

  {suggestions.length > 0 && isListVisible && (
    <PlayerList players={suggestions} nameClick={hideList} />
  )}
</form>
      </div>

      
    </div>
    {selectedPlayers.length == 0 &&
    <Button
              onClick={props.swapper
              }
              sx={{
                boxShadow: "none",
                marginBottom: "10px",
                textTransform: "none",
                fontFamily: "Roboto",
                borderRadius: 2,
                ":hover": { color: "primary", boxShadow: "none" },
              }}
              variant="contained"
              color="secondary"
            >
              Swap players
            </Button>}
      </>
  );
}

export default PlayerSearch;
