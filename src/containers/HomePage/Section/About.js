import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router'; 

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div className='section-share section-about' id='section-about'>
                <div className='row'>
                    <div className='col-md-6 section-about-content'>
                        <h2 className='title-section'>About HealthyYour</h2>
                        <p>HealthyYour is a web-based application designed to make booking medical appointments easy and convenient. Our mission is to provide a seamless experience for patients to connect with healthcare providers, ensuring timely and efficient care.</p>
                        <p>With HealthyYour, you can:</p>
                        <ul>
                            <li>Search for healthcare providers by specialty and location</li>
                            <li>View available appointment slots in real-time</li>
                            <li>Book and manage your appointments online</li>
                            <li>Receive reminders for upcoming appointments</li>
                        </ul>
                        <p>Our goal is to improve access to healthcare and enhance the patient experience through innovative technology.</p>
                    </div>
                    <div className='col-md-5'>
                        <img src='https://hih.vn/wp-content/uploads/2021/03/IMG_1464-scaled.jpg' alt='HealthyYour' className='img-fluid' />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
