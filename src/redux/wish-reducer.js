import {cartAPI, userAPI, wishlistAPI} from "../api/api";
import Cookies from 'universal-cookie';

const GET_USER_WISHLIST = 'GET_USER_WISHLIST';
const ADD_GAME_IN_WISHLIST = 'ADD_GAME_IN_WISHLIST';
const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';

let initialState = {
    isAuth: false,
    wishlist: [],
    isFetching: false,
}

const wishReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_WISHLIST: {
            return {...state, wishlist: action.wishlist}
        }
        case ADD_GAME_IN_WISHLIST: {
            debugger
            return {...state, wishlist: [...state.wishlist, action.game]}
        }
        case DELETE_FROM_WISHLIST: {
            let gamesID = action.ID;
            return {
                ...state, wishlist: state.wishlist.filter((o) => {
                    return o.GameID !== gamesID
                })
            }
        }
        default:
            return state;
    }
}

export const getUserWishlistAC = (wishlist) => ({type: GET_USER_WISHLIST, wishlist});

export const addGameInWishlistAC = (game) => ({type: ADD_GAME_IN_WISHLIST, game});

export const deleteGameFromWishlistAC = (ID) => ({type: DELETE_FROM_WISHLIST, ID});

export const addGameInWishlist = (token, gameID) => (dispatch) => {
    wishlistAPI.addGameInWishlist(token, gameID).then(response => {
        console.log(response)
        dispatch(addGameInWishlistAC(response))
    })
}

export const deleteGameFromWishlist = (gameID, token) => (dispatch) => {
    debugger
    wishlistAPI.deleteGameFromWishlist(gameID, token).then(response => {
        dispatch(deleteGameFromWishlistAC(gameID))
    })
}

export const getUserWishlist = () => (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get('Token');
    userAPI.getUserWishlist(token).then(response => {
        dispatch(getUserWishlistAC(response));
    })
}

export default wishReducer;