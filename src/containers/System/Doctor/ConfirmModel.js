import React, { Component } from 'react';
import { connect } from "react-redux";
import {Button, Modal ,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash';
import './ConfirmModel.scss'
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';

class ConfirmModel extends Component {
    constructor(props){
        super(props);

        this.state={
            email: '',
            imgBase64: ''
        }
    }
    componentDidMount(){
        let {dataModel } = this.props
        if(dataModel){
            this.setState({
                email: dataModel.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.dataModel !== this.props.dataModel){
            let {dataModel } = this.props
            this.setState({
                email: dataModel.email
            })
        }
    }

    handleChageInput(e, key){
        let value = e.target.value;
        let stateCopy = {...this.state};
        stateCopy[key]= value
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if(file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendConfirm = ()=>{
        this.props.handleSendConfirm(this.state)
    }
    render() {
      let {isOpen, closeModel } = this.props;
      return (
            <Modal isOpen={isOpen} size="lg" centered backdrop>
                <ModalHeader >
                    Hóa đơn khám bệnh
                </ModalHeader>
                <ModalBody>
                    <div className="container">   
                        <div className="form-row mt-1">
                            <div className="form-group col-6">
                                Email bệnh nhân
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e)=>this.handleChageInput(e, "email")}
                                />
                            </div>
                            <div className="form-group col-6">
                                Chọn file đơn thuốc
                                <input
                                    className="form-control"
                                    type='file'
                                    onChange={(e)=>this.handleOnChangeImage(e)}
                                />
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.handleSendConfirm}>
                    <FormattedMessage id="patient-booking-model.send" />
                </Button>{' '}
                <Button color="secondary" onClick={closeModel}>
                    <FormattedMessage id="patient-booking-model.cancel" />
                </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModel);
