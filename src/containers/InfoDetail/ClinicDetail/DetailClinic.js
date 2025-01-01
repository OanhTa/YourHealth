import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFootage from '../../HomePage/HomeFootage';
import {getInfoDetailDoctorServie, getClinicByIdServie } from '../../../services/userService';
import DetailDoctorSchedule from '../DoctorDetail/DetailDoctorSchedule';
import ProfileDoctor from '../DoctorDetail/ProfileDoctor';
import DetailExtraInfoDoctor from '../DoctorDetail/DetailExtraInfoDoctor';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            arrDoctor: [],
            clinicId: -1,
            clinicInfo:{}
        }
    }

    async componentDidMount() {
        if(this.props.match.params.id && this.props.match.params && this.props.match){
            let id = this.props.match.params.id;
            //lấy chi tiết phòng khám
            let clinicIntro = await getClinicByIdServie(id);
            if(clinicIntro && clinicIntro.errCode === 0){
                this.setState({
                    clinicId: id,
                    clinicInfo: clinicIntro.data.clinic,
                    arrDoctor: clinicIntro.data.doctorInfo
                })
            } 
            //lấy chi tiết bác sĩ
            let res = await getInfoDetailDoctorServie(id);  
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }          
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
    }
    
    render() {  
        let {arrDoctor, detailDoctor, clinicInfo} = this.state
        return (
            <div className='detail-clinic-container'>
                <HomeHeader isshowBanner={false}/>
                <div className='clinic-info'>
                    {clinicInfo && clinicInfo.descriptionHTML &&
                        <>
                            <h2>{clinicInfo.name}</h2>
                            <div 
                                className='mardown' 
                                dangerouslySetInnerHTML={{ __html: clinicInfo.descriptionHTML }}
                            ></div>
                        </>
                    }
                </div>
               
                {
                    arrDoctor.map((doctor, index)=>{
                        return (
                            <div className='clinic-item row' key={index}>
                                <div className='col col-6 col-left'>
                                    <ProfileDoctor doctorIdByParent = {doctor.doctorId} isShowDes={true}/>
                                    <p className='showDetail'>
                                        <Link to={`/doctor-info/${doctor.doctorId}`}>Xem thêm</Link>
                                    </p>
                                </div>
                                <div className='col col-6 col-right'>
                                    <DetailDoctorSchedule 
                                        doctorIdByParent={doctor.doctorId} 
                                        detailDoctor = {detailDoctor}
                                     />
                                     <DetailExtraInfoDoctor doctorIdByParent={doctor.doctorId}/>
                                </div>
                            </div>
                        )
                    })
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
