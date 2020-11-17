import React, {useEffect, useState} from 'react';
import Overlay from "./europe/Overlay";
import OverlayIngame from "./europe/OverlayIngame";
import convertState from './convertState';

function App() {
    const [globalState, setGlobalState] = useState({});
    const [config, setConfig] = useState({
        frontend: {
            scoreEnabled: false,
            spellsEnabled: true,
            coachesEnabled: false,
            blueTeam: {
                name: "Team Blue",
                score: 0,
                coach: "",
                color: "rgb(0,151,196)"
            },
            redTeam: {
                name: "Team Red",
                score: 0,
                coach: "",
                color: "rgb(222,40,70)"
            },
            patch: ""
        }
    });
    useEffect(() => {
        Window.PB.on('newState', state => {
            setGlobalState(state.state);
            setConfig(state.state.config);
        });

        Window.PB.on('heartbeat', hb => {
            setConfig(hb.config);
        });

        Window.PB.on('game_start', gameStart => {
            setGlobalState({currentlyIngame: true, ingameStateData: gameStart});
        });

        Window.PB.on('game_pause', gamePause => {
            console.log("Game Paused. Show this somehow?");
        });

        Window.PB.on('game_unpause', gameUnpause => {
            console.log("Game Unpaused. Show this somehow?");
        });

        Window.PB.on('game_over', gameStop => {
            console.log("Game Over!");
            setGlobalState({currentlyIngame: false, blueTeam: {isActive: false, picks: [], bans: []}, redTeam: {isActive: false, picks: [], bans: []}});
        });

        Window.PB.on('ingame_heartbeat', hb => {
            setGlobalState({currentlyIngame: true, ingameStateData: hb.ingameStateData});
        });

        /*
        Window.PB.on('ingame_event', ingameEvent => {
            console.log("received ingame event");
            console.log(ingameEvent);
            ingameEvent.newEvent = true;
            setGlobalState({currentlyIngame: true, ingameEvent:ingameEvent});

            if(ingameEvent.EventName === 'GameOver') {
                setGlobalState({currentlyIngame: false, blueTeam: {isActive: false, picks: [], bans: []}, redTeam: {isActive: false, picks: [], bans: []}});
            }
        });
        */

        Window.PB.start();
        
    }, []);

    return (
        <div className="App">
            <Overlay state={convertState(globalState, Window.PB.backend)} config={config}/>
            <OverlayIngame state={globalState} config={config}/>
        </div>
    );


}

export default App;
