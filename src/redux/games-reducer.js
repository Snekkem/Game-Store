import {cartAPI, gamesAPI} from "../api/api";
import Cookies from "universal-cookie";

const SET_GAMES = 'SET_GAMES';
const GET_BY_ID = 'GET_BY_ID';
const GET_PIC_BY_GAME_ID = 'GET_PIC_BY_GAME_ID';
const GET_GENRE_BY_GAME_ID = 'GET_GENRE_BY_GAME_ID';
const GET_REVIEWS_BY_GAME_ID = 'GET_REVIEWS_BY_GAME_ID';
const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE';
const SEARCH_TEXT = 'SEARCH_TEXT';
const REVIEW_TEXT = 'REVIEW_TEXT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SEND_REVIEW = 'SEND_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

let initialState = {
    games: [],
    gamesByGenre: [],
    gameInfo: null,
    pictures: [],
    genres: [],
    reviews: null,
    searchText: '',
    reviewText: '',
    isFetching: false,
}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES: {
            return {...state, games: action.games}
        }
        case GET_BY_ID: {
            return {...state, gameInfo: action.game}
        }
        case GET_PIC_BY_GAME_ID: {
            return {...state, pictures: action.pictures}
        }
        case GET_GENRE_BY_GAME_ID: {
            return {...state, genres: action.genres}
        }
        case GET_REVIEWS_BY_GAME_ID: {
            return {...state, reviews: action.reviews}
        }
        case SEARCH_TEXT: {
            return {...state, searchText: action.text}
        }
        case REVIEW_TEXT: {
            return {...state, reviewText: action.text}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case GET_GAMES_BY_GENRE: {
            return {...state, gamesByGenre: action.games}
        }
        case SEND_REVIEW: {
            return {...state, reviews: [action.review, ...state.reviews]}
        }
        case DELETE_REVIEW: {
            return {...state, reviews: state.reviews.filter(r => r.ID !== action.reviewID)}
        }
        default:
            return state;
    }
}

export const setGamesAC = (games) => ({type: SET_GAMES, games});

export const getGameByIdAC = (game) => ({type: GET_BY_ID, game})

export const getPicByGameIdAC = (pictures) => ({type: GET_PIC_BY_GAME_ID, pictures})

export const getGenreByGameIdAC = (genres) => ({type: GET_GENRE_BY_GAME_ID, genres})

export const getReviewsByGameIdAC = (reviews) => ({type: GET_REVIEWS_BY_GAME_ID, reviews})

export const sendReviewAC = (review) => ({type: SEND_REVIEW, review})

export const deleteReviewAC = (reviewID) => ({type: DELETE_REVIEW, reviewID})

export const setSearchTextAC = (text) => ({type: SEARCH_TEXT, text})

export const setIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getGameByGenreAC = (games) => ({type: GET_GAMES_BY_GENRE, games})

export const SendReview = (gameID, review, isLike) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    gamesAPI.sendReview(token, gameID, review, isLike).then(response => {
        dispatch(sendReviewAC(response))
    })
}

export const DeleteReview = (gameID, reviewID) => (dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get('Token');
    debugger
    gamesAPI.deleteReview(token, gameID, reviewID).then(response => {
        console.log(response)
        if (response.Status === 'Success')
            dispatch(deleteReviewAC(reviewID))
    })
}

export const getGames = () => (dispatch) => {
    gamesAPI.getGames().then(data => {
        dispatch(setGamesAC(data))
        dispatch(setIsFetchingAC(false));
    })
}

export const getGameByID = (gameID) => (dispatch) => {
    gamesAPI.getGameByID(gameID).then(data => {
        dispatch(getGameByIdAC(data[0]));
        dispatch(setIsFetchingAC(false));
    })
}

export const getPicByGameID = (gameID) => (dispatch) => {
    gamesAPI.getPicByGameID(gameID).then(data => {
        dispatch(getPicByGameIdAC(data))
    })
}

export const getGenreByGameID = (gameID) => (dispatch) => {
    gamesAPI.getGenreByGameID(gameID).then(data => {
        dispatch(getGenreByGameIdAC(data));
    })
}

export const getReviewsByGameID = (gameID) => (dispatch) => {
    gamesAPI.getReviewsByGameID(gameID).then(data => {
        dispatch(getReviewsByGameIdAC(data));
    })
}

export const getGamesByGenre = (gameName) => (dispatch) => {
    gamesAPI.getGamesByGenre(gameName).then(data => {
        dispatch(getGameByGenreAC(data));
    })
}

export default gamesReducer;
