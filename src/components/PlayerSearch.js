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
function PlayerSearch(props) {
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isListVisible, setListVisible] = useState(false);
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
    function removeDiacritics(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    let text = query;
    const invalidCharsRegex = /[\\\^\$\*\+\?\.\(\)\|\[\]\{\}]/g;

    text = text.replace(invalidCharsRegex, "");

    const regex = new RegExp(`^${text}`, "i");

    let res = [];
    if (text.length === 0) {
      res = [];
      setSuggestions(res);
      return;
    }

    let p = [];
    for (let f in props.players) {
      p.push(props.players[f]);
    }
    res = p.filter((p) => {
      let name = removeDiacritics(`${p["firstName"]} ${p["lastName"]}`);
      let f = removeDiacritics(p["firstName"]);
      let l = removeDiacritics(p["lastName"]);
      return regex.test(f) || regex.test(l) || regex.test(name);
    });
    res.sort((a,b)=>(b["endYear"] - b["startYear"]) - (a["endYear"] - a["startYear"]))
    res = res.slice(0, 50)
    res.sort((a,b)=>(b['startYear']-a['startYear']))
    setSuggestions(res.slice(0, 50));
  }

  return (
    <div className={classes.container}>
      <div id="search-section" className={classes.searchContainer}>
        <form onSubmit={searchSubmit} className={classes.form}>
          <div className="input-group">
            {suggestions.length != 0 ? (
              <span
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderRight: "none",
                  borderBottomLeftRadius: "0px",
                }}
                class="input-group-text no-right-border"
                id="basic-addon2"
              >
                <SearchIcon sx={{color: "white" }} />
              </span>
            ) : (
              <span
                style={{
                  borderRight: "none",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                }}
                class="input-group-text no-right-border"
                id="basic-addon2"
              >
                <SearchIcon />
              </span>
            )}

            <input
              type="text"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                borderLeft: "none",
                paddingLeft: '0px',
                boxShadow: 'none',
                outline: 'none',
                outlineColor:'white',
                borderColor: 'white'
              }}
              className={`form-control no-outline rounded-top rounded-start-0 ${
                !isListVisible || suggestions.length == 0
                  ? "rounded-bottom rounded-0"
                  : "rounded-0"
              }  `}
              placeholder="Search Player"
              onChange={handleChange}
              onFocus={showList}
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
