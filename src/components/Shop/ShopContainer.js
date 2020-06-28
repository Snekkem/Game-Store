import React from 'react';
import Shop from "./Shop";
import {connect} from "react-redux";
import {getGames, getGamesByGenre, setIsFetchingAC, setSearchTextAC} from "../../redux/games-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";

class ShopContainer extends React.Component {
    componentDidMount() {
        this.props.loader(true);
        this.props.getGames();
        this.props.getGamesByGenre(this.props.match.params.name);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.name !== prevProps.match.params.name) {
            this.props.getGamesByGenre(this.props.match.params.name);
        }
    }

    render() {
        console.log(this.props)
        return <>
            <Shop {...this.props} />
            {this.props.isFetching ? <Preloader/> : null}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        games: state.gamesReducer.games,
        text: state.gamesReducer.searchText,
        gamesByGenre: state.gamesReducer.gamesByGenre,
        isFetching: state.gamesReducer.isFetching
    }
}

let withUrlDataContainerComponent = withRouter(ShopContainer);

export default connect(mapStateToProps, {
    getGames,
    getGamesByGenre,
    loader: setIsFetchingAC,
    text: setSearchTextAC
})(withUrlDataContainerComponent)