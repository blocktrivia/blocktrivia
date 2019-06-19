const { GameManager } = require("js-gamemanager");
const { getQuestions } = require("./questions");

class TriviaGameManager extends GameManager {
    constructor() {
        super();
        this.quizzes = {};
    }

    addGame(hostID, roomName, category, difficulty, questions) {
        let game = {
            host: hostID,
            room: roomName,
            active: false
        }
        this.games.push(game);

        getQuestions(category, difficulty, questions).then((res) => {

            var quiz = {
                qs: res,
                waiting: 0
            }

            this.quizzes[roomName] = quiz;


        }).catch((e) => {
            console.log(e);
        });

        return game

    };


    getCurrentQuestion(room) {
        return this.quizzes[room].qs[0];
    };

    nextQuestion(room) {
        this.quizzes[room].qs.shift();
        //console.log(this.quizzes[room].qs);

    };

    availableQuestions(room) {
        return this.quizzes[room].qs.length;
    };

    setWaiting(room) {
        var val = this.getFromRoom(room).length;
        this.quizzes[room].waiting = val;
        //console.log("waiting", val);
    };

    updateWaiting(room) {
        if (this.quizzes[room].waiting > 0) {
            this.quizzes[room].waiting -= 1;
        }
        //console.log("updated waiting!");
    };

    getWaiting(room) {
        return this.quizzes[room].waiting;
    };

    updateScore(socketID, points) {
        var player = this.getPlayerBySocket(socketID);
        if (player) {
            var i = this.players.findIndex((p) => {
                return p.id === socketID;
            });
            this.players[i].score += points;
        };
        //console.log("Updated Score!");
        return this.getPlayerBySocket(socketID);

    };
}

module.exports = {TriviaGameManager};