import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';

class ManagerBookingPatient extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedDate: new Date()
        }
    }
    handleOnChangeDate = (selectedDate)=>{
        this.setState({
            selectedDate
        })
    }
    componentDidMount(){
        
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
    }
   
    render() {
      return (
        <div className='manager-schedule'>
            <div className='m-s-title'>QUẢN LÝ BỆNH NHÂN ĐẶT LỊCH KHÁM</div>
            <div className='container row'>
                <div className='col col-6'>
                    <label>Chọn ngày khám</label>
                    <DatePicker
                        className="form-control"
                        onChange={this.handleOnChangeDate}
                        selected={this.state.selectedDate}
                    />     
                </div>
                <div className='col col-12 mt-4'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerBookingPatient);
