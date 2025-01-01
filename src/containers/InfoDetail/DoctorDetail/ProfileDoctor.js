import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss'
import { getInfoDetailDoctorServie, getProfileDoctorServie } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            doctorIdByParent: '',
            detailDoctor: {}
        }
    }

    async componentDidMount() { 
        await this.fetchProfile();
    }
    
    async componentDidUpdate(prevProps, prevState) {
            if (this.props.doctorIdByParent !== prevProps.doctorIdByParent) {
                await this.fetchProfile();
            }
        }
    fetchProfile = async()=>{
        let res = await getInfoDetailDoctorServie(this.props.doctorIdByParent);

        if (res && res.errCode === 0) {
            this.setState({
                doctorIdByParent: this.props.doctorIdByParent, // cập nhật state
                detailDoctor: res.data
            });
        }
    }
    showHidePrice = ()=>{
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let {isShowDes, selectedSchedule, selectedDay} = this.props;
        let {detailDoctor, doctorIdByParent} = this.state;

        let nameVI,nameEN
        if(detailDoctor && detailDoctor.positionData){
            nameVI = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEN = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        let language = this.props.language;
        return (
            <div className='doctor-profile-container'>
                <div className='profile-info row'>
                    <div className='col col-2'>
                        <div className='image'
                            style={{backgroundImage: `url(${detailDoctor.image ? detailDoctor.image:""})`}}>
                        </div>
                    </div>
                    <div className='col col-10'>
                        <div className='up'>{language === LANGUAGES.VI ? nameVI : nameEN}</div>
                        {isShowDes ?
                        (<div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                        </div>)
                        :
                        (<div className='down'>
                            {selectedSchedule && selectedSchedule.timeTypeData && selectedDay &&
                                <div>
                                    <div>
                                        {language === LANGUAGES.EN ? 
                                            selectedSchedule.timeTypeData.valueEn + " - " + selectedDay
                                            : 
                                            selectedSchedule.timeTypeData.valueVi + " " + selectedDay
                                        }
                                    </div>
                                    <div>Đặt lịch miễn phí tại đây</div>
                                </div>
                            }
                        </div>) 
                        }
                      </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
