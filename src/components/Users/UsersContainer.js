import React from 'react';
import {connect} from "react-redux";

import {withRouter} from "react-router-dom";
import Users from "./Users";
import {getUsers, setSearchTextAC} from "../../redux/users-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {setIsFetchingAC} from "../../redux/games-reducer";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.loader(true);
        this.props.getUsers();
    }

    render() {
        return <>
            <Users users={this.props.users}
                   text={this.props.text}
                   searchUsers={this.props.searchUsers}
                   isFetching={this.props.isFetching}/>
            {this.props.isFetching ? <Preloader/> : null}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        text: state.usersReducer.searchText,
        searchUsers: state.usersReducer.searchUsers,
        isFetching: state.gamesReducer.isFetching
    }
}

let withUrlDataContainerComponent = withRouter(UsersContainer);

export default connect(mapStateToProps, {
    getUsers,
    loader: setIsFetchingAC,
    text: setSearchTextAC
})(withUrlDataContainerComponent)