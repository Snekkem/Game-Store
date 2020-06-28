import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import gamesReducer from "./games-reducer";
import usersReducer from "./users-reducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth-reducer";
import cartReducer from "./cart-reducer";
import wishReducer from "./wish-reducer"

let reducers = combineReducers({
    gamesReducer,
    usersReducer,
    authReducer,
    cartReducer,
    wishReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;