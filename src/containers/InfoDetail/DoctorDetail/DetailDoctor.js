import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getInfoDetailDoctorServie } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DetailDoctorSchedule from './DetailDoctorSchedule';
import DetailExtraInfoDoctor from './DetailExtraInfoDoctor';

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
        
        let {detailDoctor} = this.state;
        let nameVI,nameEN
        if(detailDoctor && detailDoctor.positionData){
            nameVI = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEN = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        let language = this.props.language;
        
        return (
            <div>
                <HomeHeader isshowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='doctor-info row'>
                        <div className='col col-2'>
                            <div className='image'
                                 style={{backgroundImage: `url(${detailDoctor.image ? detailDoctor.image:""})`}}>
                            </div>
                        </div>
                        <div className='col col-10'>
                            <div className='up'>{language === LANGUAGES.VI ? nameVI : nameEN}</div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                                </div>
                        </div>
                    </div>
                    <div className='doctor-schedule row'>
                        <div className='col col-6 col-left'>
                            <DetailDoctorSchedule doctorIdByParent={this.state.doctorId}/>
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
