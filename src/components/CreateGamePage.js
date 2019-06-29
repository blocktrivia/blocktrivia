import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { Redirect } from 'react-router-dom';
import { setRoom } from '../actions/game';
import Fade from 'react-reveal/Fade';
import { withCookies } from 'react-cookie';

export class CreateGamePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            name: "",
            colour: "#00FFF3",
            ethAddress: "",
            category: "0",
            difficulty: "any",
            questionCount: "5",
            error: "",
            background: ""
        }
    }

    componentDidMount() {
        const { cookies } = this.props;
        let ethAddress = cookies.get('ethAddress');

        if (ethAddress) {
            this.setState({ ethAddress });
        }

        let blockstackSession = JSON.parse(localStorage.getItem('blockstack-session'));
        let userData = blockstackSession.userData;
        this.setState({
            name: userData.username ? userData.username : "ID-" + userData.identityAddress
        });
    }

    onRoomChange = (e) => {
        const room = e.target.value;
        this.setState({ room });
    };

    onEthAddressChange = (e) => {
        const ethAddress = e.target.value;

        function hashCode(str) { // java String#hashCode
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
               hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        } 
        
        function intToRGB(i){
            var c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
        
            return "00000".substring(0, 6 - c.length) + c;
        }

        this.setState({ colour: '#' + intToRGB(hashCode(ethAddress)) });

        this.setState({ ethAddress });
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
            name: this.state.name,
            colour: this.state.colour,
            room: this.state.room,
            ethAddress: this.state.ethAddress,
 
            category: this.state.category,
            difficulty: this.state.difficulty,
            questionCount: this.state.questionCount
        };
        //console.log("submitting")
        socket.emit("createRoom", config, (res) => {
            //console.log("res!", res);
            if (res.code === "success") {
                // console.log(config)
                socket.emit("joinRoom", config, (res) => {
                    //console.log("res!", res);
                    if (res.code === "success") {
                        this.setState({ error: "" })
                        this.props.setRoom(this.state.room);
                        this.props.history.push("/game/lobby");
                    } else {
                        this.setState({ error: res.msg })
                    }
                })

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
                            <input
                                type="text"
                                placeholder="Ethereum Address"
                                value={this.state.ethAddress}
                                onChange={this.onEthAddressChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(CreateGamePage));