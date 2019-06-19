import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import LoadingPage from './components/LoadingPage';
import { setCategories, setQuestion, setMessage, setStatus, setScoreboard, resetGame} from './actions/game';
import { addPlayer, removePlayer, setStroke, setScore, resetStroke, setPlayers } from './actions/players';
import {resetType} from './actions/clientType'


import 'normalize.css/normalize.css';
import './styles/styles.scss';

export const socket = io();
const store = configureStore();

socket.on("categories", (data) => {
   store.dispatch(setCategories(data));
});

socket.on("PLAYER-CONNECTED", (player) => {
   store.dispatch(addPlayer(player));
});

socket.on("PLAYER-DISCONNECT", (player) => {
   store.dispatch(removePlayer(player.name));
});

socket.on("ALL-DISCONNECT", () => {
   const state = store.getState();
   if(state.game.status !== "finished") {
      store.dispatch(resetGame());
      store.dispatch(setPlayers([]));
      store.dispatch(resetType());
      socket.disconnect();
      socket.connect();
      alert("All players disconnected. Taking you back to the home page.")
      history.push("/");
   }
});

socket.on("HOST-DISCONNECT", () => {
   const state = store.getState();
   if(state.game.status !== "finished") {
      store.dispatch(resetGame());
      store.dispatch(setPlayers([]));
      store.dispatch(resetType());
      socket.disconnect();
      socket.connect();
      alert("Host Disconnected. Taking you back to the home page.")
      history.push("/");
   }
});

socket.on("correctAnswer", (data) => {
   store.dispatch(setScore(data.name, data.score));
   store.dispatch(setStroke(data.name, "green"));
});

socket.on("incorrectAnswer", (player) => {
   store.dispatch(setStroke(player, "red"));
});

socket.on("gameFinished", (scoreboard) => {

   store.dispatch(setScoreboard(scoreboard));
   store.dispatch(setStatus("finished"));
});

socket.on("newQuestion", (res) => {
   
   if(res.wait === true) {
      setTimeout(() => {
         store.dispatch(setMessage(""));
         store.dispatch(resetStroke());
         store.dispatch(setQuestion(res.question));
         history.push("/play");
      }, 2000);
   } else {
      store.dispatch(setMessage(""));
      store.dispatch(setStatus("active"));
      store.dispatch(setQuestion(res.question));
      history.push("/play");
   }

   

});

const jsx = (
   <Provider store={store}>
      <AppRouter />
   </Provider>
);


ReactDOM.render(jsx, document.getElementById("app"));
