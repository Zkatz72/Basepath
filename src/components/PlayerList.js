import PlayerName from "./PlayerName";
import classes from './PlayerList.module.css'

import {  useTheme } from '@mui/system';
function PlayerList(props)
{
    const theme = useTheme()
    return (<div>
        <div className = {classes.list} style = {{backgroundColor: theme.palette.secondary.main}}>
        {props.players.map((item) => (
          <PlayerName player = {item} click = {props.nameClick} key = {item['id']} name={`${item["firstName"]} ${item["lastName"]} ${item['suffix']}`} />
        ))}
        </div>
    </div>);
}

export default PlayerList;