import React from 'react';
import Game from "./Game";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addGameInCart} from "./../../redux/cart-reducer"
import {
    DeleteReview,
    getGameByID,
    getGenreByGameID,
    getPicByGameID,
    getReviewsByGameID, SendReview,
    setIsFetchingAC,
} from "../../redux/games-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {getUserProfile, isExist, isExistInCart, isExistInWishlist} from "../../redux/users-reducer";
import {addGameInWishlist} from "../../redux/wish-reducer";

class GameContainer extends React.Component {
    componentDidMount() {
        let gameID = this.props.match.params.id;
        this.props.loader(true);
        this.props.isExist(gameID);
        this.props.getGameByID(gameID);
        this.props.isExistInCart(gameID);
        this.props.getPicByGameID(gameID);
        this.props.getGenreByGameID(gameID);
        this.props.isExistInWishlist(gameID);
        this.props.getReviewsByGameID(gameID);
        this.props.getUserProfile();
    }

    render() {
        return <>
            <Game {...this.props} />
            {this.props.isFetching ? <Preloader/> : null}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        game: state.gamesReducer.gameInfo,
        pictures: state.gamesReducer.pictures,
        genres: state.gamesReducer.genres,
        reviews: state.gamesReducer.reviews,
        isBought: state.usersReducer.isBought,
        isInCart: state.usersReducer.isInCart,
        isInWishlist: state.usersReducer.isInWishlist,
        userInfo: state.usersReducer.info,
        isFetching: state.gamesReducer.isFetching,
    }
}

let withUrlDataContainerComponent = withRouter(GameContainer);

export default connect(mapStateToProps, {
    getGameByID,
    getPicByGameID,
    getGenreByGameID,
    getReviewsByGameID,
    addGameInCart,
    isExistInCart,
    SendReview,
    isExist,
    getUserProfile,
    loader: setIsFetchingAC,
    addGameInWishlist,
    isExistInWishlist,
    DeleteReview,
})(withUrlDataContainerComponent)