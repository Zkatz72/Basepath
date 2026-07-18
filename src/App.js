import logo from "./logo.svg";
//import './App.css';
import Layout from "./components/ui/Layout";
import data from "./players.json";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import MainScreen from "./components/MainScreen";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import BottomAppBar from "./components/BottomBar";
import { ThemeProvider } from '@mui/material/styles';
import {darkTheme, lightTheme} from './components/ui/theme'
import Trie from "./structures/Trie";
import games from './games.json'

function App() {
  const [players, setPlayers] = useState([]);
  
const startDate = new Date(2026, 6, 18); // YYYY-MM-DD format


  const [startPlayer, setStartPlayer] = useState(null)
  const [endPlayer, setEndPlayer] = useState(null)
  const [dataReal, setData] = useState(null)
  const [darkMode, setDarkMode] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data/theme loading, or wait for font/theme
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // 1 second delay

    return () => clearTimeout(timer);
  }, []);
  

  function swap(){
    let tmp = startPlayer;
    setStartPlayer(endPlayer)
    setEndPlayer(tmp)
  }
  useEffect(() => {
    // Simulate data loading from the JSON file
    const today = new Date();
    const diffInMs = today - startDate;
    const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    setPlayers(data);
    console.log(daysPassed)
    const todaysGame = games[daysPassed % games.length]
    console.log(todaysGame)
    setStartPlayer(todaysGame['start'])
    setEndPlayer(todaysGame['end'])
    

    //console.log(curPlayer.id)
  }, []);
  
  

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
  const today = new Date();
  //const now = new Date()
  //const diffInMs = now - startDate;
  //const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
  const diffInMs = today - startDate;
  const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const num = daysPassed
  return (

  <ThemeProvider theme={theme}>
    <Layout>
      <ResponsiveAppBar puzzle = {num} />

      {(!isLoading && startPlayer !== null && endPlayer !== null) ? (
        <MainScreen
          nTrie={fullNameTrie}
          sTrie={suffixTrie}
          fTrie={firstTrie}
          lTrie={lastTrie}
          players={players}
          curPlayer={data[startPlayer]}
          goalPlayer={data[endPlayer]}
          swapper = {swap}
          puzzle = {`bp-${num}`}
        />
      ) : (
        <LoadingScreen/> 
      )}

      <BottomAppBar />
    </Layout>
  </ThemeProvider>
);
}

export default App;
