import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'; 
import handbookImage from '../../../assets/hanbook.png';
class Handbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSpecial: []
        }
    }

    async componentDidMount() {
       
    }
    hadeleViewDetailHanbook =(item)=>{
        console.log(item)
    }
    render() {
        return (
            <div className='section-share section-handbook' id='section-hanbook'>
                <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>CẨM NANG</span>
                                <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                        </div>
                <div className='section-item'>
                <Slider {...this.props.settings}>
                    {/* Cẩm nang 1 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(1) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 1</div>
                    </div>
                    {/* Cẩm nang 2 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(2) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 2</div>
                    </div>
                    {/* Cẩm nang 3 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(3) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 3</div>
                    </div>
                    {/* Cẩm nang 4 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(4) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 4</div>
                    </div>
                    {/* Cẩm nang 5 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(5) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 5</div>
                    </div>
                    {/* Cẩm nang 6 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(6) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 6</div>
                    </div>
                    {/* Cẩm nang 7 */}
                    <div className='section-customize' onClick={() => { this.handleViewDetailHanbook(7) }}>
                        <div className='bg-image section-special' style={{ backgroundImage: `url(${handbookImage})` }}></div>
                        <div className='sub-title'>Cẩm nang 7</div>
                    </div>
                    </Slider>
                </div>
            </div>
        </div>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
