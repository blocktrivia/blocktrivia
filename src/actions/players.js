
export const addPlayer = (player) => ({
    type: "ADD_PLAYER",
    player
});

export const removePlayer = (name) => ({
    type: "REMOVE_PLAYER",
    name
});

export const resetPlayers = () => ({
    type: "RESET_PLAYERS"
});

export const setPlayers = (players) => ({
    type: "SET_PLAYERS",
    players
});

export const setScore = (name, score) => ({
    type: "SET_SCORE",
    name,
    score
});

export const setStroke = (name, colour) => ({
    type: "SET_STROKE",
    colour,
    name
});

export const resetStroke = () => ({
    type: "RESET_STROKE"
});