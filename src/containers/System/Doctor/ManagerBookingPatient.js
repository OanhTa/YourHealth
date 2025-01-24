import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientBookingByDoctor, sendConfirmBill } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import ConfirmModel from './ConfirmModel';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import './ManagerBookingPatient.scss'

class ManagerBookingPatient extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedDate: [],
            dataPatient:[],
            dataModel: {},
            isOpenModelBooking: false,
            isActive: false
        }
    }
    handleOnChangeDate = (selectedDate)=>{
        this.setState({
            selectedDate
        })
    }
    componentDidMount(){
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        let { selectedDate } = this.state;
        if (prevState.selectedDate !== selectedDate) {
            await this.sendConfirmBill()
        }
    }
    sendConfirmBill = async() =>{
        let { selectedDate } = this.state;
        if (selectedDate && selectedDate[0]) {
            let formattedDate = moment(selectedDate[0], "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                                .local() // Chuyển đổi về local timezone
                                .startOf("day") // Đặt về 00:00:00
                                .valueOf(); // Timestamp
            
            let user = this.props.user;
            if (user) {
                let res = await getAllPatientBookingByDoctor(user.id, formattedDate);
                if(res && res.errCode === 0){
                    this.setState({
                        dataPatient: res.data
                    })
                }else{
                    this.setState({
                        dataPatient: []
                    })
                }
            }
        }
    }
    handleConfirm = (item)=>{
        const data = {
            doctorId: item.doctorId,
            patientid: item.patientid,
            timeType: item.timeType,
            email: item.patientData && item.patientData.email,
            patientName: item.patientData && item.patientData.firstName,
            language: this.props.language
        }
        this.setState({
            dataModel: data && data,
            isOpenModelBooking: true
        })
    }
    handleCloseModelSchedule = ()=>{
        this.setState({
            isOpenModelBooking: false
        })
    }
    handleSendConfirm = async(data)=>{       
        this.setState({
            isActive: true
        })
        let res = await sendConfirmBill({
            ...this.state.dataModel,
            ...data
        })
        if(res && res.errCode === 0){
            toast.success("Send success")
            this.setState({
                isOpenModelBooking: false,
                isActive: false
            })
        }else{
            this.setState({
                isActive: false
            })
            toast.error("Something wrong...")
        }
    }
    render() {
      const { dataPatient } = this.state;
      return (
        <LoadingOverlay
                active={this.state.isActive}
                spinner
                text='Loading...'
        >
             <>
            <div className='manager-schedule'>
                <div className='m-s-title'><FormattedMessage id="manager-booking.title"/></div>
                <div className='container row'>
                    <div className='col col-6'>
                        <label><FormattedMessage id="manager-booking.choose-day"/></label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDate}
                            selected={this.state.selectedDate}
                        />     
                    </div>
                    <div className='col col-12 mt-4'>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"><FormattedMessage id="manager-booking.name"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.email"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.phone"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.address"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.gender"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.time"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.status"/></th>
                                    <th scope="col"><FormattedMessage id="manager-booking.action"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient && dataPatient.length > 0 ? (
                                    dataPatient.map((patient, index) => {
                                        const { 
                                            patientData,
                                            timeTypeB, 
                                            statusId 
                                        } = patient;
                                        let { language} = this.props;
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{patientData.firstName}</td>
                                                <td>{patientData.email}</td>
                                                <td>{patientData.phonenumber}</td>
                                                <td>{patientData.address}</td>
                                                <td>{language === LANGUAGES.VI ?patientData.genderData.valueVi: patientData.genderData.valueEn}</td>
                                                <td>{language === LANGUAGES.VI ?timeTypeB.valueVi: timeTypeB.valueEn}</td>
                                                <td>{statusId}</td>
                                                <td>
                                                    <button className='btn btn-primary mr-1' onClick={()=>this.handleConfirm(patient)}>
                                                        <FormattedMessage id="manager-booking.confirm"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmModel 
                isOpen={this.state.isOpenModelBooking} 
                dataModel = {this.state.dataModel}
                closeModel={this.handleCloseModelSchedule}
                handleSendConfirm = {this.handleSendConfirm}
            />
            </>
        </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerBookingPatient);
