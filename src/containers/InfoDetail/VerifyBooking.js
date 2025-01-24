import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookingAppoinment } from '../../services/userService';
import { FormattedMessage } from 'react-intl';
import HomeFootage from '../HomePage/HomeFootage';

class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           statusVerify : false,
           errCode: ''
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookingAppoinment({token, doctorId})

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: 0, 
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res?.errCode || "", 
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    render() {
        let {statusVerify, errCode} = this.state
        return (
            <div>
                <HomeHeader isshowBanner={false}/>
                <div className="text-center shadow-lg p-4 rounded">
                    {statusVerify ? (
                        errCode === 0 ? (
                            <div className="verify-success">
                                <h3 className="text-success">
                                    <FormattedMessage id="verify-booking-model.title.success" />
                                </h3>
                                <p>
                                    <FormattedMessage id="verify-booking-model.message.success" />
                                </p>
                            </div>
                        ) : (
                            <div className="verify-failure">
                                <h3 className="text-danger">
                                    <FormattedMessage id="verify-booking-model.title.failure" />
                                </h3>
                                <p>
                                    <FormattedMessage id="verify-booking-model.message.failure" />
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="loading">
                            <h3 className="text-primary">
                                <FormattedMessage id="verify-booking-model.title.loading" />
                            </h3>
                            <p>
                                <FormattedMessage id="verify-booking-model.message.loading" />
                            </p>
                        </div>
                    )}
                </div>
                <HomeFootage />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
