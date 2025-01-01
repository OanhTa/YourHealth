import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login  from './Auth/Login';
import System from '../routes/System';
import Doctor from '../routes/Doctor';

import { CustomToastCloseButton } from '../components/CustomToast';

import HomePage from './HomePage/HomePage.js'

import CustomScrollbars from '../components/CustomScrollbars.js'
import DetailDoctor from './InfoDetail/DoctorDetail/DetailDoctor.js';
import VerifyBooking from './InfoDetail/VerifyBooking.js';
import DetailSpecialty from './InfoDetail/SpecialtyDetail/DetailSpecialty.js';
import DetailClinic from './InfoDetail/ClinicDetail/DetailClinic.js';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    {/* history -> refest website van giu data */}
                    <div className="main-container"> 
                    
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100vw'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />

                                    {/*  Đặt route chi tiết trước */}
                                    <Route path={path.DOCTOR_DETAIL} component={DetailDoctor} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />

                                    <Route path={path.SPECIALTY_DETAIL} component={DetailSpecialty} />
                                    <Route path={path.CLINIC_DETAIL} component={DetailClinic} />
                                    
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.VERIFY_EMAIL} component={VerifyBooking} />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer //pop-up as alert
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position='bottom-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="blue"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);