import { times } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    times: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    allDoctor:[],
    doctorDetail: {}
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            // console.log('check fire fetch gender start: ',action);
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:;          
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:        
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TIME_SCHEDULE_SUCCESS:;          
            state.times = action.dataTimes;
            return {
                ...state,
            }
        case actionTypes.FETCH_TIME_SCHEDULE_FAILED:        
            state.times = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR__DETAIL_SUCCESS:      
            state.doctorDetail = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR__DETAIL_FAILED:     //   
            state.doctorDetail = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctor;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                state.allDoctor = action.allDoctor;
                return {
                    ...state
                }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
                state.allDoctor = [];
                return {
                    ...state
                }
       
        default:
            return state;
    }
}

export default adminReducer;