import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {setIsFetchingAC} from "../../redux/games-reducer";
import UserProfile from "./UserProfile";
import {
    getGamesByUserID,
    getGamesProfile,
    getUserByID,
    getUserProfile,
    updateAboutUser
} from "../../redux/users-reducer";

class UserProfileContainer extends React.Component {
    componentDidMount() {
        this.props.loader(true);

        console.log('ds',this.props.match.params)
        if(this.props.match.params.id) {
            this.props.getUserByID(this.props.match.params.id);
            this.props.getGamesByUserID(this.props.match.params.id);
        } else {
            console.log('dasdsadssd')
            this.props.getUserProfile();
            this.props.getGamesProfile();
        }
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <UserProfile {...this.props}/>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.usersReducer.info,
        userGames: state.usersReducer.userGames,
        isFetching: state.gamesReducer.isFetching
    }
}

let withUrlDataContainerComponent = withRouter(UserProfileContainer);

export default connect(mapStateToProps, {
    loader: setIsFetchingAC, getUserByID, getGamesByUserID, getUserProfile, getGamesProfile, updateAboutUser
})(withUrlDataContainerComponent)