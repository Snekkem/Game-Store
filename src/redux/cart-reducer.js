import {cartAPI, userAPI} from "../api/api";
import Cookies from 'universal-cookie';

const GET_USER_CART_BY_ID = 'GET_USER_CART_BY_ID';
const BUY_GAMES_FROM_CART = 'BUY_GAMES_FROM_CART';
const ADD_GAME_IN_CART = 'ADD_GAME_IN_CART';
const DELETE_FROM_IN_CART = 'DELETE_FROM_IN_CART';
const BUY_GAMES = 'BUY_GAMES';

let initialState = {
    isAuth: false,
    cart: [],
    isFetching: false,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CART_BY_ID: {
            return {...state, cart: action.cart}
        }
        case BUY_GAMES_FROM_CART: {
            return {...state, cart: action.cart}
        }
        case ADD_GAME_IN_CART: {
            return {...state, cart: [...state.cart, action.game]}
        }
        case DELETE_FROM_IN_CART: {
            let gamesID = action.ID;
            return {
                ...state, cart: state.cart.filter((o) => {
                    return o.GameID !== gamesID
                })
            }
        }
        case BUY_GAMES: {
            return {...state, cart: action.status ? [] : state.cart}
        }

        default:
            return state;
    }
}

export const getUserCartAC = (cart) => ({type: GET_USER_CART_BY_ID, cart});

export const addGameInCartAC = (game) => ({type: ADD_GAME_IN_CART, game});

export const deleteGameFromCartAC = (ID) => ({type: DELETE_FROM_IN_CART, ID});

export const buyGamesAC = (status) => ({type: BUY_GAMES, status});

export const addGameInCart = (token, gameID) => (dispatch) => {
    cartAPI.addGameInCart(token, gameID).then(response => {
            dispatch(addGameInCartAC(response))
    })
}

export const buyGames = (token) => (dispatch) => {
    cartAPI.buyGames(token).then(response => {
        dispatch(buyGamesAC(response.status === 'Success'))
    })
}

export const deleteGameFromCart = (gameID, token) => (dispatch) => {
    debugger
    cartAPI.deleteGameFromCart(gameID, token).then(response => {
        dispatch(deleteGameFromCartAC(gameID))
    })
}

export const getUserCart = () => (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get('Token');
    userAPI.getUserCart(token).then(response => {
        dispatch(getUserCartAC(response));
    })
}

export default cartReducer;