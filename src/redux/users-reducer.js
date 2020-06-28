import {cartAPI, userAPI, wishlistAPI} from "../api/api";
import Cookies from "universal-cookie";

const SET_USERS = 'SET_USERS';
const SEARCH_TEXT = 'SEARCH_TEXT';
const GET_BY_ID = 'GET_BY_ID';
const GET_GAMES_BY_USER_ID = 'GET_GAMES_BY_USER_ID';
const IS_BOUGHT = 'IS_BOUGHT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const IS_IN_CART = 'IS_IN_CART';
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const GET_GAMES_PROFILE = 'GET_GAMES_PROFILE';
const IS_IN_WISHLIST = 'IS_IN_WISHLIST';
const UPDATE_ABOUT_USER = 'UPDATE_ABOUT_USER';
const GET_BALANCE = 'GET_BALANCE';

let initialState = {
    users: [],
    searchUsers: '',
    userInfo: [],
    userGames: [],
    userPhoto: null,
    searchText: '',
    isBought: false,
    isInCart: false,
    isInWishlist: false,
    info: [],
    isFetching: false,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SEARCH_TEXT: {
            return {...state, searchText: action.searchText}
        }
        case GET_BY_ID: {
            return {...state, userInfo: action.userInfo}
        }
        case GET_GAMES_BY_USER_ID: {
            return {...state, userGames: action.games}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case IS_BOUGHT: {
            return {...state, isBought: action.status}
        }
        case IS_IN_CART: {
            return {...state, isInCart: action.status}
        }
        case IS_IN_WISHLIST: {
            return {...state, isInWishlist: action.status}
        }
        case GET_USER_PROFILE: {
            return {...state, info: action.userProfile}
        }
        case GET_GAMES_PROFILE: {
            return {...state, userGames: action.userGames}
        }
        case UPDATE_ABOUT_USER: {
            return {...state, info: {...state.info, AboutUser: action.aboutUser}}
        }
        case GET_BALANCE: {
            return {...state, info: {...state.info, Balance: action.balance}}
        }
        default:
            return state;
    }
}

export const setUsersAC = (users) => ({type: SET_USERS, users});

export const setSearchTextAC = (searchText) => ({type: SEARCH_TEXT, searchText});

export const getUserInfoAC = (userInfo) => ({type: GET_BY_ID, userInfo});

export const getUserProfileAC = (userProfile) => ({type: GET_USER_PROFILE, userProfile});

export const isBoughtAC = (status) => ({type: IS_BOUGHT, status});

export const getGamesByUserIDAC = (games) => ({type: GET_GAMES_BY_USER_ID, games});

export const getGamesProfileAC = (userGames) => ({type: GET_GAMES_PROFILE, userGames});

export const setIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const isInExistCartAC = (status) => ({type: IS_IN_CART, status});

export const isExistWishlistAC = (status) => ({type: IS_IN_WISHLIST, status});

export const updateAboutUserAC = (aboutUser) => ({type: UPDATE_ABOUT_USER, aboutUser});

export const getBalanceAC = (balance) => ({type: GET_BALANCE, balance});

export const getBalance = () => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    userAPI.getBalance(token).then(response => {
        dispatch(getBalanceAC(response.Balance))
    })
}

export const getUserProfile = () => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    userAPI.getMyProfile(token).then(response => {
        dispatch(getUserProfileAC(response))
        dispatch(setIsFetchingAC(false));
    })
}

export const updateAboutUser = (aboutUser) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    userAPI.updateUserAbout(token, aboutUser).then(response => {
        if (response.Status === 'Success update') {
            dispatch(updateAboutUserAC(aboutUser))
        }
    })
}

export const getGamesProfile = () => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    userAPI.getGamesProfile(token).then(response => {
        dispatch(getGamesProfileAC(response))
        dispatch(setIsFetchingAC(false));
    })
}

export const isExistInCart = (gameID) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    cartAPI.isExistInCart(token, gameID).then(data => {
        dispatch(isInExistCartAC(data.Status === 'Exist'));
    })
}

export const isExistInWishlist = (gameID) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    wishlistAPI.isExistInWishlist(token, gameID).then(data => {
        console.log(data.Status === 'Exist', data.Status)
        dispatch(isExistWishlistAC(data.Status === 'Exist'));
    })
}

export const isExist = (gameID) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    userAPI.isBought(token, gameID).then(data => {
        dispatch(isBoughtAC(data.Status === 'Not Exist'));
    })
}


export const getUsers = () => (dispatch) => {
    userAPI.getUsers().then(data => {
        dispatch(setUsersAC(data));
        dispatch(setIsFetchingAC(false));
    })
}

export const getUserByID = (userID) => (dispatch) => {
    userAPI.getUserByID(userID).then(data => {
        dispatch(getUserInfoAC(data));
        dispatch(setIsFetchingAC(false));
    })
}

export const getGamesByUserID = (userID) => (dispatch) => {
    userAPI.getGamesByUserID(userID).then(data => {
        dispatch(getGamesByUserIDAC(data));
        dispatch(setIsFetchingAC(false));
    })
}

export default usersReducer;
