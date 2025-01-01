import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFootage from '../../HomePage/HomeFootage';
import { getAllCodeService, getInfoDetailDoctorServie, getSpecialtyByIdServie, handleLoginAPI } from '../../../services/userService';
import DetailDoctorSchedule from '../DoctorDetail/DetailDoctorSchedule';
import ProfileDoctor from '../DoctorDetail/ProfileDoctor';
import DetailExtraInfoDoctor from '../DoctorDetail/DetailExtraInfoDoctor';
import { LANGUAGES } from '../../../utils';
import { values } from 'lodash';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            arrDoctor: [],
            arrProvince: [],
            specialtyId: -1,
            specialtyInfo:{}
        }
    }

    async componentDidMount() {
        if(this.props.match.params.id && this.props.match.params && this.props.match){
            let id = this.props.match.params.id;
            //lấy chi tiết chuyên khoa
            let specialtyIntro = await getSpecialtyByIdServie({id, province: 'ALL'});
            if(specialtyIntro && specialtyIntro.errCode === 0){
                this.setState({
                    specialtyId: id,
                    specialtyInfo: specialtyIntro.data.specialty,
                    arrDoctor: specialtyIntro.data.doctorInfo
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
        
        //thêm mục toàn quốc
        let resProvince = await getAllCodeService("PROVINCE");
        if(resProvince && resProvince.data && resProvince.errCode === 0){
            resProvince.data.unshift({
                createAt: null,
                keyMap: "ALL",
                type: "PROVINCE",
                valueEn:"ALL",
                valueVi: "Toàn quốc"
            })
            this.setState({
                arrProvince: resProvince.data
            })
        } 

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
    }
    handleChangeSelect = async(e) =>{
        let provinceId = e.target.value;
        if(this.props.match.params.id && this.props.match.params && this.props.match){
            let id = this.props.match.params.id;
            
            let specialtyIntro = await getSpecialtyByIdServie({id, province: provinceId});
            if(specialtyIntro && specialtyIntro.errCode === 0){
                this.setState({
                    specialtyInfo: specialtyIntro.data.specialty,
                    arrDoctor: specialtyIntro.data.doctorInfo
                })
            }  
        }

    }
    render() {  
        let {arrDoctor, detailDoctor, specialtyInfo, arrProvince} = this.state
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isshowBanner={false}/>
                <div className='specialty-info'>
                    {specialtyInfo && specialtyInfo.descriptionHTML &&
                        <div className='mardown' dangerouslySetInnerHTML={{ __html: specialtyInfo.descriptionHTML }}></div>
                    }
                </div>
                <select 
                    className='search-doctor-byprovice'
                    onChange={(e) =>this.handleChangeSelect(e)}
                >
                {
                    arrProvince && arrProvince.map((provice, index)=>{
                        return (
                            <option 
                                className='provice-item row' 
                                key={index}
                                value={provice.keyMap}
                                >
                                {this.props.language === LANGUAGES.VI ? provice.valueVi : provice.valueEn}
                            </option>
                        )
                    })
                }
                </select>
                {
                    arrDoctor.map((doctor, index)=>{
                        return (
                            <div className='specialty-item row' key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
