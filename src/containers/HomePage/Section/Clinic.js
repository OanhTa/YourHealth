import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Slider from 'react-slick';
import { getAllClinicServie } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'; 

class Clinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSpecial: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicServie();
        if(res && res.errCode === 0){
            this.setState({
                allSpecial: res.data
            })
        }
    }
    hadeleViewDetailClinic =(item)=>{
        this.props.history.push(`/clinic-info/${item.id}`);
    }
    render() {
        let {allSpecial } = this.state
        return (
            <div className='section-share section-clinic'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.clinic"/></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                    </div>
                    <div className='section-item'>
                        <Slider {...this.props.settings}>
                            {
                                allSpecial && allSpecial.length > 0 && allSpecial.map((item, index) => {
                                    let imageBase64 = ''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-customize' onClick={()=>{this.hadeleViewDetailClinic(item)}}>
                                            <div 
                                                className='bg-image section-special'
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                    backgroundSize: 'contain',
                                                    backgroundColor: '#fff'
                                                }}
                                            ></div>
                                            <div className='sub-title'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
