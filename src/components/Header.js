import React from 'react';
import { socket } from '../app';
import { connect } from 'react-redux';
import { resetPlayers} from '../actions/players';
import { UserSession } from 'blockstack';
import { resetRoom, setQuestion, setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';
import logo from '../../public/images/logo.svg';

export class Header extends React.Component {

    constructor(props) {
        super(props);
        this.userSession = new UserSession()
        if (this.userSession.isUserSignedIn()) {
            this.user = this.userSession.loadUserData().username ? this.userSession.loadUserData().username : "ID-" + this.userSession.loadUserData().identityAddress;
        }
    }

    handleClick = () => {
        socket.disconnect();
        socket.connect();
        this.props.resetPlayers();
        this.props.resetType();
        this.props.resetGame();
        this.props.history.push("/");
    }

    signOut =() => {
        this.userSession.signUserOut();
        this.props.history.push("/");
    }
    
    render() {
        return (
            <header className={"header"}>
                <div className={"content-container"}>
                    <div className={"header__content"}>
                        <button className={"header__title button--link button"} onClick={this.handleClick}>
                            <img src={logo}></img>
                            <h3>BlockTrivia</h3>
                        </button>
                        {this.userSession.isUserSignedIn()
                        ?
                        <div className={"header__user"}>
                            <div className={"header__user_id"}>
                                {this.user}
                            </div>
                            <div onClick={this.signOut} className={"button button--cta header__user_button"}>
                                Sign out
                            </div>
                        </div>
                        : ""
                        }
                    </div>
                </div>
            </header>
        )
    }
};


const mapDispatchToProps = (dispatch) => ({
    resetPlayers: () => dispatch(resetPlayers()),
    resetType: () => dispatch(resetType()),
    resetGame: () => dispatch(resetGame())
});

export default connect(undefined, mapDispatchToProps)(Header);