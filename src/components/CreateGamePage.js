import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setRoom } from '../actions/game';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export class CreateGamePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            category: "0",
            difficulty: "any",
            questionCount: "5",
            error: "",
            background: ""
        }
    }

    onRoomChange = (e) => {
        const room = e.target.value;
        this.setState({ room });
    };

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({ category })
    }

    onDifficultyChange = (e) => {
        const difficulty = e.target.value;
        this.setState({ difficulty });
    }

    onCountChange = (e) => {
        const questionCount = e.target.value;
        this.setState({ questionCount });
    }
    submitForm = (e) => {
        e.preventDefault();
        const config = {
            room: this.state.room,
            category: this.state.category,
            difficulty: this.state.difficulty,
            questionCount: this.state.questionCount
        };
        //console.log("submitting")
        socket.emit("createRoom", config, (res) => {
            //console.log("res!", res);
            if (res.code === "success") {
                this.setState({ error: "" })
                this.props.setRoom(this.state.room);
                this.props.history.push("/game/lobby");
            } else {
                this.setState({ error: res.msg })
            }
        });

    };

    render() {
        return (
            <div className="content-container">
                {
                    this.props.type === "" && <Redirect to="/" />
                }
                <div className="box-layout__box">
                    <Fade>
                        <form className="form" onSubmit={this.submitForm}>
                            <h1 className={"box-layout__title"}>Create New Game</h1>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}
                            <input
                                type="text"
                                placeholder="Room Name"
                                autoFocus
                                value={this.state.room}
                                onChange={this.onRoomChange}
                                className="text-input"
                            />
                            <select className="select" value={this.state.category} onChange={this.onCategoryChange}>
                                <option key={"0"} value={"0"}>Any Categories</option>
                                {
                                    this.props.categories.map((category) => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                            <select className="select" value={this.state.difficulty} onChange={this.onDifficultyChange}>
                                <option key={"any"} value={"any"}>Any Difficulty</option>
                                <option key="easy" value="easy">Easy</option>
                                <option key="medium" value="medium">Medium</option>
                                <option key="hard" value="hard">Hard</option>
                            </select>
                            <select className="select" value={this.state.questionCount} onChange={this.onCountChange}>
                                <option key="5" value="5">5 Questions</option>
                                <option key="10" value="10">10 Questions</option>
                                <option key="15" value="15">15 Questions</option>
                            </select>
                            <button className="button">Create</button>

                        </form>
                    </Fade>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    categories: state.game.categories,
    type: state.type
});

const mapDispatchToProps = (dispatch) => ({
    setRoom: (room) => dispatch(setRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);