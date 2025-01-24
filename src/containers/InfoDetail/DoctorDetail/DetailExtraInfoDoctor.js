import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailExtraInfoDoctor.scss'
import { getExtraInfoDoctorServie } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DetailExtraInfoDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        await this.fetchExtraInfo();
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.doctorIdByParent !== prevProps.doctorIdByParent){
            await this.fetchExtraInfo();
        }
    }
    fetchExtraInfo = async() =>{
        let res = await getExtraInfoDoctorServie(this.props.doctorIdByParent)
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
    }
    showHidePrice = ()=>{
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let {extraInfor} = this.state;
        let language = this.props.language;
        return (
            <div className='doctor-extra-info'>
               <div className='content-up'>
                    <div className='mb-1 title-cus'><FormattedMessage id="section-doctor.address-clinic"/></div>
                    <div className='name-clinic'>{extraInfor.nameClinic}</div>
                    <div className='clinic-address'>{extraInfor.addressClinic}</div>
               </div>
               {this.state.isShow ? (
                <div className='content-down border'>
                    <div className='border-bottom ml-1 py-1 title-cus'>
                        <FormattedMessage id="section-doctor.price"/>
                    </div>
                    <div className='price'>
                        <div className='d-flex justify-content-between'>
                            <div><FormattedMessage id="section-doctor.price"/></div>
                            <div>
                                {language === LANGUAGES.EN ? (
                                    <NumberFormat
                                        value={extraInfor.priceData.valueEn}
                                        displayType="text"
                                        prefix="$"
                                        thousandSeparator={true}/>
                                ) : (
                                    <NumberFormat
                                        value={extraInfor.priceData.valueVi}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix=" VNĐ"/>
                                )}
                            </div>
                        </div>
                        <div className='des'>
                            <FormattedMessage id="section-doctor.note-1"/><br/>
                            <FormattedMessage id="section-doctor.note-2"/>
                            {language === LANGUAGES.EN ? extraInfor.paymentData.valueEn : extraInfor.paymentData.valueVi}
                        </div>
                    </div>
                    <div className='note'>{extraInfor.note}</div>
                    <div className='showHide ml-1 mt-2' onClick={this.showHidePrice}>
                        <FormattedMessage id="section-doctor.hide"/>
                    </div>
                </div>
                ) : (
                    <div className='content-down border-0'>
                         <div>
                                <span className='ml-1'>
                                    <FormattedMessage id="section-doctor.price"/>
                                    <span className='price-hide'>
                                        {language === LANGUAGES.EN ? (
                                            <NumberFormat
                                                value={extraInfor.priceData && extraInfor.priceData.valueEn}
                                                displayType="text"
                                                prefix="$"
                                                thousandSeparator={true}/>
                                        ) : (
                                            <NumberFormat
                                                value={extraInfor.priceData && extraInfor.priceData.valueVi}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix=" VNĐ"/>
                                        )}
                                    </span>
                                </span>
                                <span className='showHide' onClick={this.showHidePrice}>
                                     <FormattedMessage id="section-doctor.show"/>
                                </span>
                        </div>
                    </div>
                 )}               
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailExtraInfoDoctor);
