import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/User/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManagerDoctorInfo from '../containers/System/Doctor/ManagerDoctorInfo';
import Header from '../containers/Header/Header';
import ManagerSpecialty from '../containers/System/Specialty/ManagerSpecialty';
import ManagerClinic from '../containers/System/Clinic/ManagerClinic';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-admin" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManagerDoctorInfo} />
                            <Route path="/system/manage-specialty" component={ManagerSpecialty} />
                            <Route path="/system/manage-clinic" component={ManagerClinic} />
                            {/* <Route path="/doctor/manage-schedule" component={ManagerSchedule} /> */}
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
