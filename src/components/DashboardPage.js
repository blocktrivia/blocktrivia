import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setHost, setPlayer } from '../actions/clientType';
import { setRoom } from '../actions/game';
import Fade from 'react-reveal/Fade';
import { withCookies, Cookies } from 'react-cookie';
import uuid from "uuid";

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasEthereum: false,
            room: "",
            category: "0",
            difficulty: "any",
            questionCount: "5",
            error: "",
            background: ""
        }
    }

    componentDidMount() {
        const { cookies } = this.props;

        let ethAddr = cookies.get('ethAddr');
        let blockstackSession = JSON.parse(localStorage.getItem('blockstack-session'));
        
        let userData = blockstackSession.userData;

        if (ethAddr) {
            this.setState({
                hasEthereum: true
            })
        }

        if (!ethAddr) {
            if (userData.profile.account[0].service == "ethereum") {
                cookies.set('ethAddr', userData.profile.account[0].identifier)
                this.setState({
                    hasEthereum: true
                })
            } else {
                this.setState({
                    hasEthereum: false
                })
            }
        }
    }

    startAsHost = () => {
        this.props.setHost();
        this.props.history.push("/game/create");
    };

    startAsPlayer = () => {
        this.props.setPlayer();
        this.props.history.push("/game/join");
    };


    render() {
        return (
            <div className="box-layout">
                <Fade>
                    {
                        this.state.hasEthereum ?
                        <div className="box-layout">
                            <Fade>
                                <div className="box-layout__box">
                                    <h1 className="box-layout__title">BlockTrivia</h1>
                                    <h3 className="box-layout__subtitle">A trivia game in which you are rewarded tokens for correctly answering questions</h3>
                                    <div className="box-layout__button-container">
                                        <div className="box-layout__button">
                                            <button className="button" onClick={this.startAsHost}>Create Game</button>
                                        </div>
            
                                        <div className="box-layout__button">
                                            <button className="button" onClick={this.startAsPlayer}>Join Game</button>
                                        </div>
            
                                    </div>
            
                                </div>
                            </Fade>
            
                        </div>
                        : 
                        <div>Does not have eth</div>
                    }
                </Fade>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHost: () => dispatch(setHost()),
        setPlayer: () => dispatch(setPlayer()),
        setRoom: (room) => dispatch(setRoom(room))
    }
}

export default connect(undefined, mapDispatchToProps)(withCookies(DashboardPage));