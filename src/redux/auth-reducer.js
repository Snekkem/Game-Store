import {authAPI} from "../api/api";
import Cookies from 'universal-cookie';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_REGISTER_DATA = 'SET_REGISTER_DATA';
const IS_AUTH = 'IS_AUTH';

const cookies = new Cookies();


let initialState = {
    name: '',
    balance: 0,
    email: null,
    password: null,
    location: null,
    aboutUser: null,
    userImage: null,
    isAuth: cookies.get('Token') ? true : false,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_REGISTER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case IS_AUTH: {
            return {
                ...state, isAuth: action.isAuth
            }
        }
        default:
            return state;
    }
}

export const isAuthAC = (isAuth) => ({type: IS_AUTH, isAuth})

export const setRegisterUserData = (userName, email, balance, location, aboutUser, userImage, password) => (dispatch) => {
    authAPI.Register(userName, email, balance, location, aboutUser, userImage, password).then(response => {
        console.log(response.data)
    })
}

export const setAuthUserData = (email, password) => (dispatch) => {

    return authAPI.Auth(email, password).then(response => {
        const token = response.data.Token;
        const expirationDate = response.data.ExpirationDate;

        if (token && expirationDate) {
            cookies.set('Token', token, {path: '/', expires: new Date(expirationDate)});
            return true;
        }
        return false;
    })
}

export default authReducer;