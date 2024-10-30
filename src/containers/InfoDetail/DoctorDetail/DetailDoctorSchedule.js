import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleByDateServie } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DetailDoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allSchedule: []
        }
    }
    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    createInputDate = ()=>{
        let dateArr = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            
            if (i === 0) { 
                // Set the current day's label
                let time = moment(new Date()).format('DD/MM');
                object.lable = this.props.language === LANGUAGES.VI ? 
                    `Hôm nay - ${time}` : `Today - ${time}`;
                
            } else {
                // Set future days' labels
                let valueVi = moment(new Date()).add(i, "day").format('dddd - DD/MM'); // in Vietnamese
                let valueEn = moment(new Date()).add(i, "day").locale("en").format('dddd - DD/MM'); // in English
        
                object.lable = this.props.language === LANGUAGES.VI ?
                    this.capitalizeFirstLetter(valueVi) : valueEn;
            }
            object.value = moment(new Date()).add(i, "day").startOf("day").valueOf();
            dateArr.push(object);
        }
        
        return dateArr 

    }
    componentDidMount = ()=> {
        let arrDate = this.createInputDate();
        if(arrDate && arrDate.length > 0){
            this.setState({
                allDays: arrDate
            })
        }
    }
    
    componentDidUpdate = async(prevProps, prevState, snapshot)=>{
        if(this.props.language !== prevProps.language){
            let arrDate = this.createInputDate();
            this.setState({
                allDays: arrDate && arrDate.length > 0 ? arrDate : []
            })
        }
        if(this.props.doctorIdByParent !== prevProps.doctorIdByParent){
            let res = await getScheduleByDateServie(this.props.doctorIdByParent, this.state.allDays[0].value)
          
            this.setState({
                allSchedule: res ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async(e)=>{
        let doctorId = this.props.doctorIdByParent;
        let date = e.target.value;

        let res = await getScheduleByDateServie(doctorId, date)
        this.setState({
             allSchedule: res.data || [  ]
        }) 
    }
    render() {
        let {allDays, allSchedule}= this.state
        let {language }= this.props
        console.log(this.state.allSchedule)

        return (
                <div>
                    <div className='choose-day'>
                        <select 
                            class="day-select"
                            onChange={(e)=>this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length>0 && allDays.map((day, index)=>{
                                return(                               
                                    <option key={index} value={day.value}>{day.lable}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='my-2'>
                        <span><i className='fas fa-calendar-alt mr-1'></i></span>
                        <span><FormattedMessage id="section-doctor.schedule"/></span>
                    </div>
                    <div className='all-schedule'>
                       {allSchedule && allSchedule.length > 0 ? (
                            <>
                                {allSchedule.map((item, index) => {
                                    return (
                                        <button
                                            className='btn m-2 btn-warning hsla(217, 89%, 51%, 0.5)'
                                            style={{ minWidth: '160px'}}
                                            key={index}
                                        >
                                            {language === LANGUAGES.EN 
                                                ? item.timeTypeData.valueEn 
                                                : item.timeTypeData.valueVi}
                                        </button>
                                    );
                                })}
                                <div className='book-free'>
                                    <FormattedMessage id="section-doctor.book-free" />
                                    <i className='far fa-hand-point-up'></i>
                                </div>
                            </>
                        ) : (
                            <div className="font-italic">
                                <FormattedMessage id="section-doctor.message" />
                            </div>
                        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorSchedule);
