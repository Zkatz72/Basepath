import { useState, useRef } from "react";
import PlayerName from "./PlayerName";
import classes from "./PlayerSearch.module.css";
import PlayerList from "./PlayerList";
import { useEffect } from "react";
import { Combobox } from "@headlessui/react";
import ReactSearchBox from "react-search-box";
import { scroller } from "react-scroll";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import Trie from "../structures/Trie";
function PlayerSearch(props) {
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isListVisible, setListVisible] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const ref = useRef(null);

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

  return (
    <div ref={ref} className={classes.container}>
      <div id="search-section" className={classes.searchContainer}>
        <form onSubmit={searchSubmit} className={classes.form}>
          <div className="input-group">
            {suggestions.length != 0 ? (
              <span
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderRight: "none",
                  borderColor: theme.palette.bord.main,
                  borderBottomLeftRadius: "0px",
                }}
                className="input-group-text no-right-border"
                id="basic-addon2"
              >
                <SearchIcon sx={{ color: theme.palette.icon.main }} />
              </span>
            ) : (
              <span
                style={{
                  borderRight: "none",
                  borderColor: theme.palette.bord.main,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.icon.main,
                }}
                className="input-group-text no-right-border"
                id="basic-addon2"
              >
                <SearchIcon />
              </span>
            )}
            {isFocused && (
              <div
                style={{
                  content: "''",
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "1px",
                  borderRadius: "6px",
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
            <input
              type="text"
              value={query}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.bord.main,
                borderLeft: "none",
                paddingLeft: "0px",
                boxShadow: "none",
                outline: "none",
                outlineColor: theme.palette.bord.main,
                borderColor: theme.palette.bord.main,
              }}
              className={`form-control no-outline rounded-top rounded-start-0 ${
                !isListVisible || suggestions.length == 0
                  ? "rounded-bottom rounded-0"
                  : "rounded-0"
              }  `}
              placeholder="Search Player"
              onChange={handleChange}
              onFocus={(e) => {
                showList();
                setFocused(true);
              }}
            />
          </div>
          {suggestions.length > 0 && isListVisible && (
            <PlayerList players={suggestions} nameClick={hideList} />
          )}
        </form>
      </div>
    </div>
  );
}

export default PlayerSearch;
