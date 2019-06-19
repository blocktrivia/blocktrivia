const defaultPlayersState = [];

export default (state = defaultPlayersState, action) => {
    switch (action.type) {
        case "ADD_PLAYER" :
            return [...state, action.player];
        case "REMOVE_PLAYER": 
            return state.filter((player) => player.name !== action.name);
        case "RESET_PLAYERS" : 
            return defaultPlayersState;
        case "SET_PLAYERS":
            return action.players;
        case "SET_SCORE":
            return state.map((player) => {
                if(player.name === action.name) {
                    return {
                        ...player,
                        score: action.score
                    };
                } else {
                    return player;
                };
            });
        case "SET_STROKE": 
            return state.map((player) => {
                if(player.name === action.name) {
                    return {
                        ...player,
                        stroke: action.colour
                    };
                } else {
                    return player;
                };
            });
        case "RESET_STROKE": 
            return state.map((player) => {
                return {
                    ...player,
                    stroke: ""
                };
            });
        default: 
            return state;
    }
}