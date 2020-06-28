import React from "react";
import {connect} from "react-redux";
import Wishes from "./Wishes";
import {deleteGameFromWishlist, getUserWishlist} from "../../redux/wish-reducer";

class WishesContainer extends React.Component {
    componentDidMount() {
        this.props.getUserWishlist();
    }

    render() {
        return <>
            <Wishes {...this.props} />
        </>
    }
}

let mapDispatchToProps = (state) => {
    return {
        wishlist: state.wishReducer.wishlist
    }
}

export default connect(mapDispatchToProps, {getUserWishlist, deleteGameFromWishlist})(WishesContainer)