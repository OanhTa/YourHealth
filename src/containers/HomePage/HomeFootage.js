import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFootage.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { changeLanguageApp } from '../../store/actions';

class HomeFootage extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="home-footage-footer">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-4 contact-info">
                                <h5>Công ty Cổ phần Công nghệ BookingCare</h5>
                                <p>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                                <p>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                                <p>
                                    <strong>Hotline:</strong> 0779- 394- 364 (7h30 - 18h)<br />
                                    <strong>Email:</strong> oanhta20032003@gmail.com (7h30 - 18h)
                                </p>
                            </div>
                            <div className="col-4 branch-office">
                                <h5>Văn phòng tại Hà Nội</h5>
                                <p>Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4</p>
                                <div className="ministry">
                                    <p><strong>Bộ công thương:</strong></p>
                                    <p>Bảo trợ chuyên mục nội dung:</p>
                                    <ul>
                                        <li><strong>Hello Doctor:</strong> Chuyên mục "Sức khỏe tinh thần"</li>
                                        <li><strong>Bernard:</strong> Chuyên mục "Y khoa chuyên sâu"</li>
                                        <li><strong>Doctor Check:</strong> Chuyên mục "Sức khỏe tổng quát"</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4 download-app">
                                <h5>Tải ứng dụng BookingCare</h5>
                                <p>Cho điện thoại hoặc máy tính bảng:</p>
                                <ul className="app-links">
                                    <li><a href="#">Android</a></li>
                                    <li><a href="#">iPhone/iPad</a></li>
                                    <li><a href="#">Khác</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3 footer-end">
                            <p className="footer-text">&copy; 2024 YourHealth. All rights reserved.</p>
                            <p className="footer-text mb-0">Designed by <span className="brand-name">OanhTa</span></p>
                    </div>
                </footer>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFootage);
