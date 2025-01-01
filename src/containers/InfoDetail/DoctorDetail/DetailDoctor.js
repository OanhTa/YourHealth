import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getInfoDetailDoctorServie } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DetailDoctorSchedule from './DetailDoctorSchedule';
import DetailExtraInfoDoctor from './DetailExtraInfoDoctor';
import ProfileDoctor from './ProfileDoctor';
import HomeFootage from '../../HomePage/HomeFootage';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            doctorId: -1
        }
    }

    async componentDidMount() {
        if(this.props.match.params.id && this.props.match.params && this.props.match){
            let id = this.props.match.params.id;
            this.setState({
                doctorId: id
            })

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
        let {detailDoctor, doctorId} = this.state;   
        return (
            <div>
                <HomeHeader isshowBanner={false}/>
                <div className='doctor-detail-container'>
                    <ProfileDoctor doctorIdByParent = {doctorId} isShowDes={true}/>
                    <div className='doctor-schedule row'>
                        <div className='col col-6 col-left'>
                            <DetailDoctorSchedule 
                                doctorIdByParent={this.state.doctorId} 
                                detailDoctor = {detailDoctor}
                            />
                        </div>
                        <div className='col col-6'>
                            <DetailExtraInfoDoctor doctorIdByParent={this.state.doctorId}/>
                        </div>
                    </div>
                    <div className='doctor-info-detail'>
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                             <div className='mardown' dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment'>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
