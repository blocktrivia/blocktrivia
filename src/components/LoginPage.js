import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socket } from '../app';
import Fade from 'react-reveal/Fade';
import { appConfig } from '../utils/constants';
import { UserSession } from 'blockstack';

export class LoginPage extends React.Component {
    state = {
        userSession: new UserSession({ appConfig })
    }

    handleSignIn() {
        const { userSession } = this.state;
        userSession.redirectToSignIn();
    }

    render() {
        return (
            <div className="content-container login-page">
                <Fade>
                    <div className="login-content-wrapper">
                        <div className="login-text">
                            <div>
                                Hello,
                            </div>
                            <div>
                                Please sign in with <span>Blocktack</span> in order to use this application.
                            </div>
                        </div>
                        <div 
                        className="button button--cta"
                        onClick={this.handleSignIn.bind(this)}>
                            Sign In with Blockstack
                        </div>
                    </div>
                </Fade>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(LoginPage);