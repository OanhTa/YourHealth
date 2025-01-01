import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Modal ,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './BookingModel.scss'
import ProfileDoctor from '../ProfileDoctor';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions';
import Select from 'react-select'
import { postPatientBookingAppoinment } from '../../../../services/userService';
import { lte } from 'lodash';

class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: "",
            doctorName: "",
            email: "",
            fullName: "",
            selectedDate: "",
            address: "",
            selectedGender: "",
            phonenumber: "",
            reason: "",
            timeType: "",
            gender: [],
            language: ""
        }
    }

    async componentDidMount() {
       this.props.getGenderStart()
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux),
                language: this.props.language,
            })
        }
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.selectedSchedule !== this.props.selectedSchedule ||
            prevProps.detailDoctor !== this.props.detailDoctor) {
            
            let doctorId = this.props.detailDoctor?.id || null;
            let timeType = this.props.selectedSchedule?.timeType || null;
            let doctorName = this.props.detailDoctor
                ? `${this.props.detailDoctor.firstName} ${this.props.detailDoctor.lastName}` : '';
    
            this.setState({
                doctorId,
                doctorName,
                timeType
            });
        }
    }
    buildDataGender (data){
        let result = [];
        let language = this.props.language
        if(data && data.length >0){
            data.map((item)=>{
                let object = {};
                object.label = language === LANGUAGES.EN ? item.valueEn: item.valueEn
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result
    }
    handleChageInput(e, key){
        let value = e.target.value;
        let stateCopy = {...this.state};
        stateCopy[key]= value
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDate = (selectedDate)=>{
        this.setState({
            selectedDate: selectedDate[0]
        })
    }
    handleOnChangeSelect = (selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    handleConfirmBooking = async() =>{
        let res = await postPatientBookingAppoinment(this.state)
        if(res && res.errCode === 0){
            toast.success("Đặt lịch hẹn thành công")
            this.props.closeModel()
        }else{
            toast.error("Lỗi chưa đặt được lịch khám")
        }
    }
    render() {
       let {isOpen, closeModel, detailDoctor, selectedSchedule, selectedDay, language, intl } = this.props;
       return (
            <Modal isOpen={isOpen} size="lg" centered backdrop>
                <ModalHeader >
                    <FormattedMessage id="patient-booking-model.title"/>
                </ModalHeader>
                <ModalBody>
                    <div className='doctor-model-container'>
                        <ProfileDoctor 
                            detailDoctor={detailDoctor}  
                            selectedSchedule={selectedSchedule} 
                            selectedDay = {selectedDay}
                            isShowDes={false}
                        /> 
                        <div className='price m-3'>
                            <span className="text-uppercase" style={{ fontWeight: 600 }}>
                                <FormattedMessage id="section-doctor.price" />
                            </span>
                            <span className='text-primary'>{detailDoctor?.DoctorInfo?.priceData 
                                ? (language === LANGUAGES.EN 
                                    ? ("$"+detailDoctor.DoctorInfo.priceData.valueEn )
                                    : (detailDoctor.DoctorInfo.priceData.valueVi)+"Vnd")
                                : '' 
                            }</span>
                        </div>
                    </div>
                    <div className="container">
                        
                        <div className="form-group mt-2">
                            <label><FormattedMessage id="patient-booking-model.title-1"/></label>
                            <input
                                className="form-control mt-1"
                                placeholder={intl.formatMessage({ id: 'patient-booking-model.email' })} 
                                value={this.state.email}
                                onChange={(e)=>this.handleChageInput(e, "email")}
                            />
                        </div>

                        <div className="form-row mt-1">
                            <div className="form-group col-6">
                                <input
                                    className="form-control"
                                    placeholder={intl.formatMessage({ id: 'patient-booking-model.name' })} 
                                    value={this.state.fullName}
                                    onChange={(e)=>this.handleChageInput(e, "fullName")}
                                />
                            </div>
                            <div className="form-group col-6">
                                <DatePicker
                                    className="form-control"
                                    placeholder={intl.formatMessage({ id: 'patient-booking-model.date' })} 
                                    onChange={this.handleOnChangeDate}
                                    selected={this.state.selectedDate}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-1">
                            <input
                                className="form-control"
                                placeholder={intl.formatMessage({ id: 'patient-booking-model.add' })} 
                                value={this.state.address}
                                onChange={(e)=>this.handleChageInput(e, "address")}
                            />
                        </div>

                        <div className="form-row mt-1">
                            <div className="form-group col-3">
                                <Select
                                    options={this.state.gender}
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={intl.formatMessage({ id: 'patient-booking-model.gender' })} />
                            </div>
                            <div className="form-group col-9">
                                <input
                                    className="form-control"
                                    placeholder={intl.formatMessage({ id: 'patient-booking-model.phone' })}
                                    value={this.state.phonenumber}
                                    onChange={(e)=>this.handleChageInput(e, "phonenumber")}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-2">
                            <label><FormattedMessage id="patient-booking-model.reason" /></label>
                            <input
                                className="form-control mt-1"
                                placeholder={intl.formatMessage({ id: 'patient-booking-model.reason' })}
                                value={this.state.reason}
                                onChange={(e)=>this.handleChageInput(e, "reason")}
                            />
                        </div>  
                    </div>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.handleConfirmBooking}>
                    <FormattedMessage id="patient-booking-model.send" />
                </Button>{' '}
                <Button color="secondary" onClick={closeModel}>
                    <FormattedMessage id="patient-booking-model.cancel" />
                </Button>
                </ModalFooter>
            </Modal>
         );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BookingModel));
