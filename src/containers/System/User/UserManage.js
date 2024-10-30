import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {DeleteUserServiceAPI, EditUserServiceAPI, getAllUser} from '../../../services/userService';
import {CreateNewUserServiceAPI} from '../../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../../utils/emitter';
import _ from 'lodash';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalNewUser: false, // defaul khong mo ModalNewUser
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUser("ALL");
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            }, )
            // console.log("check state user: ", this.state.arrUsers); //[]
        }
    }

    handleAddNewUser() {
        this.setState({
            isOpenModalNewUser: true,
        })
    }

    handleEditUser = (user) => {
        //open modal and fill data
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser = async (user) => {
        try {
            let respone = await EditUserServiceAPI(user);
            //console.log("check respone create user: ", respone);
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalNewUser: !this.state.isOpenModalNewUser, //set toggle true/false
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser, //set toggle true/false
        })
    }

    createNewuser =async (data) => {
        try {
            let respone = await CreateNewUserServiceAPI(data);
            //console.log("check respone create user: ", respone);
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalNewUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA') 
            }
        } catch (e) {
            console.log(e);
        }

    }

    handleDeleteUser = async(user) => {
        try {
            let respone = await DeleteUserServiceAPI(user.id);
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalNewUser: false,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUser = this.state.arrUsers;
        return (
            <div className="users-container"> 
                <ModalUser
                    isOpen = {this.state.isOpenModalNewUser}
                    toggleFromUserManage = {this.toggleUserModal}
                    createNewuser = {this.createNewuser}
                />
                { 
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromUserManage = {this.toggleEditUserModal}
                        currentUser = {this.state.userEdit}
                        EditUser = {this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage users</div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-2 rounded'
                        onClick={() => {
                            this.handleAddNewUser()
                        }}>
                        <i className='fas fa-plus px-2'></i>
                        Add new users</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            { arrUser && arrUser.map((item, index) => {
                                return(
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                            onClick={() => {
                                                this.handleEditUser(item)
                                            }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => {
                                                    this.handleDeleteUser(item)
                                                }}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                        
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
