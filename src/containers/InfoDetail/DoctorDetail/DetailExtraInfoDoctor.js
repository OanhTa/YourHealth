import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss'

class DetailExtraInfoDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    async componentDidMount() {
        
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
    showHidePrice = ()=>{
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        
        return (
            <div className='doctor-extra-info'>
               <div className='content-up'>
                    <div className='py-1'>ĐỊA CHỈ KHÁM: </div>
                    <div className='name-clinic'>Giao Diện Hiển Thị Thông Tin Khám Bệnh</div>
                    <div className='clinic-address'>Giao Diện Hiển Thị Thông Tin Khám Bệnh</div>
               </div>
               {this.state.isShow ?
                    <div className='content-down border'>
                        <div className='border-bottom py-1'>GIÁ KHÁM: </div>
                        <div className='price'>
                            <div className='d-flex justify-content-between'>
                                <div>Giá khám: </div>
                                <div>25.000</div>
                            </div>
                            <div className='des'>Được ưu tiên khám trước khi đặt lịch hẹn tại đây</div>
                        </div>
                        <div className='note'>Giao Diện Hiển Thị Thông Tin Khám Bệnh</div>
                        <div className='showHide mt-2' onClick={this.showHidePrice}>Ân bảng giá</div>
                    </div>
                    :
                    <div className='content-down border-0'>
                        <div>
                            GIÁ KHÁM: 25.000
                            <span className='showHide'  onClick={this.showHidePrice}> Xem chi tiết</span>
                        </div>
                    </div>
                }
               
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
