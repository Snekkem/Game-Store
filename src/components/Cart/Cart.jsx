import React from "react";
import css from './Cart.module.css'
import {NavLink} from "react-router-dom";
import Cookies from 'universal-cookie';

const Cart = (props) => {
    console.log(props)
    let price = 0;

    if (props.cart && props.cart.length !== 0) {
        props.cart.map(p => price += p.Price)
    }

    let buyGames = () => {
        const cookie = new Cookies();
        const token = cookie.get('Token');
        props.buyGames(token);
    }

    let deleteItem = (gameID) => {
        const cookie = new Cookies();
        const token = cookie.get('Token');
        props.deleteGameFromCart(gameID, token);
    }

    return (
        <div className={"container"}>
            <h2 className={`${css.title}`}>ВАША КОРЗИНА</h2>
            <div className={css.listGames}>
                {props.cart && props.cart.length > 0 ?
                props.cart.map(g =>
                    <div className={"d-flex mt-3"} key={g.GameID}>
                        <NavLink className={css.gameLink} to={`/games/${g.GameID}`}>
                            <div>
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
                ): <h4 className={"text-center"}>Корзина пуста.</h4>}
                <div className={"row no-gutters mt-4"}>
                    <div>Общая сумма</div>
                    <div className={"ml-auto font-weight-bold"}>{price}₴</div>
                </div>
                <div className={"d-flex justify-content-end mt-4 pb-2"}>
                    <button onClick={buyGames} className={"btn btn-outline-success"}>Купить</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;