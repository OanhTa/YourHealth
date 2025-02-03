import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Doctor from './Section/Doctor';
import './HomePage.scss';

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeFootage from './HomeFootage';
import Clinic from './Section/Clinic';
import Handbook from './Section/Handbook';
import About from './Section/About';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true, arrows: false } },
            ],
        };
        
        return (
            <div>
                <HomeHeader isshowBanner={true} />
                <Specialty  settings={settings} />
                <Clinic  settings={settings} />
                <Doctor settings={settings} />
                <Handbook settings={settings} />
                <About />
                <HomeFootage />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
