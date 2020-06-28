import React from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {isAuthAC} from "../../redux/auth-reducer";
import {getBalance, getUserProfile} from "../../redux/users-reducer";

class NavbarContainer extends React.Component {
    componentDidMount() {
        this.props.getBalance();
    }

    render() {
        return <>
            <Navbar {...this.props} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        info: state.usersReducer.info
    }
}

export default connect(mapStateToProps, {isAuthAC, getUserProfile, getBalance})(NavbarContainer);