import React from 'react';
import {Route} from "react-router-dom";
import ShopContainer from "./components/Shop/ShopContainer";
import GameContainer from "./components/Game/GameContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Register from "./components/Register/Register";
import UserProfileContainer from "./components/UserProfile/UserProfileContainer";
import Login from "./components/Login/Login";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import CartContainer from "./components/Cart/CartContainer";
import WishesContainer from "./components/Wishlist/WishesContainer";


const App = () => {
    return (
        <div>
            <NavbarContainer/>
            <Route path='/cart' render={() => <CartContainer/>}/>
            <Route path='/wishlist' render={() => <WishesContainer/>}/>
            <Route path='/register' render={() => <Register/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/store' render={() => <ShopContainer/>}/>
            <Route exact path='/' render={() => <ShopContainer/>}/>
            <Route exact path='/users' render={() => <UsersContainer/>}/>
            <Route exact path='/myProfile' render={() => <UserProfileContainer/>}/>
            <Route exact path='/users/:id' render={() => <UserProfileContainer/>}/>
            <Route exact path='/games/:id' render={() => <GameContainer/>}/>
            <Route path='/games/search-by-genre/:name' render={() => <ShopContainer/>}/>
        </div>
    );
}

export default App;
