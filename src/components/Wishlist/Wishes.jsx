import React from "react";
import css from './Wishes.module.css'
import {NavLink} from "react-router-dom";
import Cookies from 'universal-cookie';

const Wishes = (props) => {
    console.log(props)

    let deleteItem = (gameID) => {
        const cookie = new Cookies();
        const token = cookie.get('Token');
        props.deleteGameFromWishlist(gameID, token);
    }

    return (
        <div className={"container"}>
            <h2 className={`${css.title}`}>СПИСОК ЖЕЛАЕМОГО</h2>
            <div className={css.listGames}>
                {props.wishlist && props.wishlist.length > 0 ?
                props.wishlist.map(g =>
                    <div className={"d-flex mt-3"} key={g.GameID}>
                        <NavLink className={css.gameLink} to={`/games/${g.GameID}`}>
                            <div >
                                <img src={g.Path}/>
                            </div>
                        </NavLink>
                        <div className={"w-100"}>
                            <NavLink className={css.gameLink} to={`/games/${g.GameID}`}>
                                <div className={"d-flex"}>
                                    <div>
                                        {g.Name}
                                    </div>
                                    <div className={"ml-auto"}>
                                        {g.Price}₴
                                    </div>
                                </div>
                            </NavLink>
                            <div className={"d-flex"}>
                                <button type={"button"} onClick={() => deleteItem(g.GameID)} className={css.deleteItem}>Удалить</button>
                            </div>
                        </div>
                    </div>
                ): <h4 className={"text-center"}>Список желаний пуст.</h4>}
            </div>
        </div>
    )
}

export default Wishes;