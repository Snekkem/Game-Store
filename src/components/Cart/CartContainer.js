import React from "react";
import {connect} from "react-redux";
import Cart from "./Cart";
import {addGameInCart, buyGames, deleteGameFromCart, getUserCart} from "../../redux/cart-reducer";

class CartContainer extends React.Component {
    componentDidMount() {
        this.props.getUserCart();
    }

    render() {
        return <>
            <Cart {...this.props} />
        </>
    }
}

let mapDispatchToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
    }
}

export default connect(mapDispatchToProps, {getUserCart, addGameInCart,
    buyGames,deleteGameFromCart})(CartContainer)