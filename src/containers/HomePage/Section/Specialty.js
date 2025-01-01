import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Slider from 'react-slick';
import { getAllSpecialtyServie } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'; 

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSpecial: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyServie();
        if(res && res.errCode === 0){
            this.setState({
                allSpecial: res.data
            })
        }
    }
    hadeleViewDetailSpecialty =(item)=>{
        this.props.history.push(`/specialty-info/${item.id}`);
    }
    render() {
        let {allSpecial } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.speciality"/></span>
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
                                        <div className='section-customize' onClick={()=>{this.hadeleViewDetailSpecialty(item)}}>
                                            <div 
                                                className='bg-image section-special'
                                                style={{backgroundImage: `url(${imageBase64})`}}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
