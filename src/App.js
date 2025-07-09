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
import Example from "./components/Example";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Toolbar } from "@mui/material";
import BottomAppBar from "./components/BottomBar";
import { ThemeProvider } from '@mui/material/styles';
import {darkTheme, lightTheme} from './components/ui/theme'
const start = 'trout-001mik'
const end = 'otani-000sho'
function App() {
  const [players, setPlayers] = useState([]);
  //const [curPlayer, setCurPlayer] = useState(new Object);
  //const [curPlayer2, setCurPlayer2] = useState(new Object);
  //const
  const [startPlayer, setStartPlayer] = useState(Object)
  const [endPlayer, setEndPlayer] = useState(Object)
  const [dataReal, setData] = useState(null)
  const [dataReal2, setData2] = useState(null)
  const [teammateRes, setTeammateRes] = useState(null)
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#142433'
});
  useEffect(() => {
    // Simulate data loading from the JSON file
    
    setPlayers(data);
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
  const theme = darkMode ? darkTheme : lightTheme;
  return (

    <ThemeProvider theme = {theme}>
    <Layout>
      <ResponsiveAppBar>
      </ResponsiveAppBar>
      <MainScreen players={players} curPlayer = {data['otani-000sho']} goalPlayer = {data['otani-000sho']}/>
      <BottomAppBar></BottomAppBar>
    </Layout>
    </ThemeProvider>
  );
}

export default App;
