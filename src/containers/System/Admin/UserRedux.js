import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'

import './UserRedux.scss';
import TableManageUser from './TableManageUser';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {

        this.props.getGenderStart() //dispatch ben duoi
        this.props.getPositionStart()
        this.props.getRoleStart()

    }

    //được gọi sau khi render chạy: render => didupdate
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''//lấy val select default
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if(prevProps.listUsers != this.props.listUsers){
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,
                previewImgURL: ''
            })
        }
    }

    openPreviewImg = () => {
        if(!this.state.previewImgURL)
            return

        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let {action} = this.state;

        if(action === CRUD_ACTION.CREATE){
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(action === CRUD_ACTION.EDIT){
            //fire redux edit user
            this.props.editAUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender, 
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    
    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state}; 
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for(let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;    
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            
        }
        return isValid;
    }

    handleEditUserfromParent = (user) => {

        //load imgString base64 >>> image
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            gender: user.gender,
            position: user.positionId,
            role: user.role,
            avatar: user.avatar,
            previewImgURL: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id
        })
    }

    render() {
        console.log(this.state)
        let language = this.props.language;

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let {email, password, firstName, lastName, address, phonenumber, gender, position, role, avatar} = this.state;

        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    CRUD User with Redux
                </div>
                <div className="user-redux-body" >
                <div className="container">
                    <div className='row col-12'>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                        <div className="row mt-2">
                            <div className="form-group col-6">
                                <label ><FormattedMessage id="manage-user.email"/></label>
                                <input type="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        name="email"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, "email")
                                        }}
                                        value={email}
                                        disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}></input>
                                </div>
                                <div className="form-group col-6">
                                    <label ><FormattedMessage id="manage-user.password"/></label>
                                    <input type="password"
                                            className="form-control" 
                                            placeholder="Password" 
                                            name="password"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "password")
                                            }}
                                            value={password}
                                            disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}></input>
                                </div>
                                <div className="form-group col-6">
                                    <label ><FormattedMessage id="manage-user.first-Name"/></label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="First name"
                                            name="firstName"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "firstName")
                                            }}
                                            value={firstName}></input>
                                </div>
                                <div className="form-group col-6">
                                    <label ><FormattedMessage id="manage-user.last-Name"/></label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Last name"
                                            name="lastName"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "lastName")
                                            }}
                                            value={lastName}></input>
                                </div>
                                <div className="form-group col-8">
                                    <label ><FormattedMessage id="manage-user.address"/></label>
                                    <input type="text"
                                            className="form-control"
                                            name="address"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "address")
                                            }}
                                            value={address}></input>
                                </div>
                                <div className="form-group col-4">
                                    <label ><FormattedMessage id="manage-user.phone"/></label>
                                    <input type="text"
                                            className="form-control"
                                            name="phonenumber"
                                            placeholder="+84"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "phonenumber")
                                            }}
                                            value={phonenumber}></input>
                                </div>
                                <div className="form-group col-3">
                                    <label ><FormattedMessage id="manage-user.gender"/></label>
                                    <select name="gender"
                                            className="form-control"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "gender")
                                            }}
                                            value={gender}
                                            >
                                            {genders && genders.length > 0 && genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language ===  LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label ><FormattedMessage id="manage-user.position"/></label>
                                    <select name="position"
                                            className="form-control"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "position")
                                            }}
                                            value={position}
                                            >
                                            {positions && positions.length > 0 && positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language ===  LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label ><FormattedMessage id="manage-user.role"/></label>
                                    <select name="role"
                                            className="form-control"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "role")
                                            }}
                                            value={role}
                                            >
                                            {roles && roles.length > 0 && roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language ===  LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label ><FormattedMessage id="manage-user.image"/></label>
                                    <div className='preview-img-container'>
                                        <input id='preview-img' type='file' hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        
                                        />
                                        <label className='lable-upload' htmlFor='preview-img'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className='preview-image'
                                                style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                                onClick={()=> this.openPreviewImg()}
                                        >
                                        </div>

                                        {this.state.isOpen === true && 
                                            <Lightbox
                                            mainSrc={this.state.previewImgURL}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning ml-3' : 'btn btn-primary ml-3'}
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edit"/> : <FormattedMessage id="manage-user.save"/>}
                                        </button>
                                </div>
                                <div className='col-12 mb-5'>
                                    <TableManageUser
                                        handleEditUserfromParent={this.handleEditUserfromParent}
                                        action = {this.state.action}
                                    />
                                </div>
                            </div>
                        </div>                  
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editAUser: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
