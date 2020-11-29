import React, {useEffect, useState} from 'react';
import Overlay from "./ingameLayout/Overlay";

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
            console.log("[IngameUI] Game Start!");
            setGlobalState({currentlyIngame: true, ingameStateData: gameStart});
        });

        Window.PB.on('game_pause', gamePause => {
            console.log("[IngameUI] Game Paused. Show this somehow?");
        });

        Window.PB.on('game_unpause', gameUnpause => {
            console.log("[IngameUI] Game Unpaused. Show this somehow?");
        });

        Window.PB.on('game_over', gameStop => {
            console.log("[IngameUI] Game Over!");
            setGlobalState({currentlyIngame: false, blueTeam: {isActive: false, picks: [], bans: []}, redTeam: {isActive: false, picks: [], bans: []}});
        });

        Window.PB.on('ingame_heartbeat', hb => {
            setGlobalState({currentlyIngame: true, ingameStateData: hb.ingameStateData});
        });

        Window.PB.start();
        
    }, []);

    if (config) {

        return (
            <div className="App">
                <Overlay state={globalState} config={config}/>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }

}

export default App;
