import logo from "./logo.svg";
//import './App.css';
import Layout from "./components/ui/Layout";
import data from "./players.json";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import PlayerSearch from "./components/PlayerSearch";
import InfoModal from "./components/modals/InfoModal";
import PlayerList from "./components/PlayerList";
import MainScreen from "./components/MainScreen";
import {teammate} from './teammate'
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Toolbar } from "@mui/material";
import BottomAppBar from "./components/BottomBar";
import { ThemeProvider } from '@mui/material/styles';
import {darkTheme, lightTheme} from './components/ui/theme'
import Trie from "./structures/Trie";
import games from './games.json'
const start = 'trout-001mik'
const end = 'otani-000sho'
function App() {
  const [players, setPlayers] = useState([]);
  //const [curPlayer, setCurPlayer] = useState(new Object);
  //const [curPlayer2, setCurPlayer2] = useState(new Object);
  //const
const startDate = new Date('2025-7-16'); // YYYY-MM-DD format


  const [startPlayer, setStartPlayer] = useState(null)
  const [endPlayer, setEndPlayer] = useState(null)
  const [dataReal, setData] = useState(null)
  const [dataReal2, setData2] = useState(null)
  const [teammateRes, setTeammateRes] = useState(null)
  console.log('here')
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#000'
});
  useEffect(() => {
    // Simulate data loading from the JSON file
    const today = new Date();
    console.log('here2')
    const diffInMs = today - startDate;
    const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    setPlayers(data);
    const todaysGame = games[daysPassed]
    setStartPlayer(todaysGame['start'])
    setEndPlayer(todaysGame['end'])
    

    //console.log(curPlayer.id)
  }, []);
  useEffect(() => {
    // Simulate data loading from the JSON file
    
    //console.log(curPlayer)
    console.log(dataReal)
  }, [ dataReal]);
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference on initial load
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);
  



  /*
  function fetchData(route){
    
      fetch(`${route}`)
        .then((res) => res.json())
        .then((data) => setData(data));
     
  }
  function fetchData2(route){
    
    fetch(`${route}`)
      .then((res) => res.json())
      .then((data) => setData2(data));
   
}
  function checkTeamate(){
    console.log(curPlayer)
    console.log(curPlayer2)
    console.log(dataReal)
    console.log(dataReal2)
    console.log(dataReal2[curPlayer2.id])
    console.log(dataReal[curPlayer.id])
    setTeammateRes(teammate(dataReal[curPlayer.id], dataReal2[curPlayer2.id]))
  }
  function addPlayer(player)
  {
    console.log('here')
    setCurPlayer(player)
    fetchData(`players/${player['lastName'][0]}`)
    
    //setAddedPlayers([...addedPlayers, player]);
    //console.log(addedPlayers)
  }

  function deletePlayer(){
    setCurPlayer(new Object)
    setData(null)
    
  }
  function deletePlayer2(){
    setCurPlayer2(new Object)
    setData2(null)
  }
  function addPlayer2(player)
  {
    console.log(player['id'])
    setCurPlayer2(player)
    fetchData2(`players/${player['lastName'][0]}`)
    //setAddedPlayers([...addedPlayers, player]);
    //console.log(addedPlayers)
  }
    */
   function removeDiacritics(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  let firstTrie = new Trie();
  
  let lastTrie = new Trie();
  let fullNameTrie = new Trie();
  let suffixTrie = new Trie();
  for (let id in data){
    let player = data[id]
    let fN = `${player['firstName']} ${player['lastName']} ${player['suffix']}`.trim()
    let firstName = removeDiacritics(player['firstName'].toLowerCase())
    let lastName = removeDiacritics(player['lastName'].toLowerCase())
    let fullName = removeDiacritics(fN.toLowerCase())
    let suffix= removeDiacritics(player['suffix'].toLowerCase())
    
    firstTrie.insert(firstName, player)
    lastTrie.insert(lastName, player)
    fullNameTrie.insert(fullName, player)
    suffixTrie.insert(suffix, player)

    
  }
  const theme = darkMode ? darkTheme : lightTheme;
  return (

  <ThemeProvider theme={theme}>
    <Layout>
      <ResponsiveAppBar />

      {(startPlayer !== null && endPlayer !== null) ? (
        <MainScreen
          nTrie={fullNameTrie}
          sTrie={suffixTrie}
          fTrie={firstTrie}
          lTrie={lastTrie}
          players={players}
          curPlayer={data[startPlayer]}
          goalPlayer={data[endPlayer]}
        />
      ) : (
        <div>Loading...</div> // optional loading indicator
      )}

      <BottomAppBar />
    </Layout>
  </ThemeProvider>
);
}

export default App;
