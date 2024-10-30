import React, { Component } from 'react';

import Select from 'react-select'
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './ManagerSchedule.scss'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleServie } from '../../../services/userService';

class ManagerSchedule extends Component {
    constructor(props){
        super(props);

        this.state={
            allDoctor: [],
            allTimes:[],
            selectedOption: {},
            selectedDate:[]
        }
    }
    buildDataInputSelect= (data)=>{
        if(data && data.length>0){
            let array = []
            data.map((item, index)=>{
                let object = {}
                let babelVi = `${item.firstName} ${item.lastName}`
                let babelEn = `${item.lastName} ${item.firstName}`
                object.value = item.id
                object.label = this.props.language === LANGUAGES.VI? babelVi : babelEn
                array.push(object)//[{label, value}, {}]
            })
            return array
        }
    }
    componentDidMount(){
        this.props.getAllDoctor()
        this.props.getAllTimes()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
       
        if(prevProps.allScheduleTimes !== this.props.allScheduleTimes){
            
            let data = this.props.allScheduleTimes;
            if(data && data.length>0){
                data = data.map((item)=>{
                    item.isSelected = false;
                    return item;
                })
            }

            this.setState({
                allTimes: data
            })
        }
        
    }
    handleChange=async(selectedOption)=>{
        this.setState({
            selectedOption
        })

    }
    handleOnChangeDate = (selectedDate)=>{
        this.setState({
            selectedDate
        })
    }
    handleSelectTime = (item)=>{
        let {allTimes}=this.state;

        allTimes = allTimes.map((time)=>{
            if(time.id === item.id){
                time.isSelected = !time.isSelected;
            }
            return time;
        })
        this.setState({
            allTimes: allTimes
        })
    }
    handleSaveSchedule = async()=>{
        let {allTimes, selectedOption, selectedDate}=this.state;
        if(!selectedDate){
            toast.error("Chưa chọn ngày khám")
            return
        }
        if(selectedOption && _.isEmpty(selectedOption)){//là {}
            toast.error("Chưa chọn bác sĩ")
            return
        }
        let formattedDate = new Date(selectedDate[0]).getTime()
        let result = []

        if(allTimes && allTimes.length>0){
            let selectedTime = allTimes.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length>0){
                selectedTime.map(item=>{
                    let object = {}
                    object.doctorId = selectedOption.value
                    object.date = formattedDate
                    object.timeType = item.keyMap
                    result.push(object)
                })
            }else{
                toast.error("Chưa chọn thời gian")
                return
            }
        }

        let res = await saveBulkScheduleServie({
            arrSchedule: result,
            doctorId: selectedOption.value,
            date: formattedDate
        });
        if(res && res.errCode === 0){
            toast.success(res.message);
        }else{
            toast.error("Lưa thất bại: " , res)
        }
    }
    render() {
        let {allTimes}=this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
                <div className='manager-schedule'>
                    <div className='m-s-title'><FormattedMessage id="manager-schedule.title"/></div>
                    <div className='container row'>
                        <div className='col col-6'>
                             <label><FormattedMessage id="manager-schedule.choose-doctor"/></label>
                             <Select 
                                options={this.state.allDoctor} 
                                value={this.state.selectedOption}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className='col col-6'>
                            <label><FormattedMessage id="manager-schedule.choose-date"/></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDate}
                                selected={this.state.selectedDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col col-12 m-s-hour'>
                            { allTimes && allTimes.length>0 &&
                                allTimes.map( (item, index) => {
                                    return(
                                        <button 
                                            className={item.isSelected === true ?'btn btn-schedule isSelected': 'btn btn-schedule'} 
                                            key={index} 
                                            onClick={()=>this.handleSelectTime(item)}
                                        >
                                            {this.props.language === LANGUAGES.VI? item.valueVi: item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div 
                            className='btn btn-primary'
                            onClick={this.handleSaveSchedule}
                        ><FormattedMessage id="manager-schedule.save-schedule"/></div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allScheduleTimes: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllTimes: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSchedule);
