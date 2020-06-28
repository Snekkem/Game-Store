import css from "./Shop.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

const GameItem = (props) => {
    return (
        <div key={props.games.ID} id={props.games.ID}
             className={"col-12 col-md-5 col-lg-3 d-flex mt-5 px-0 mx-2 border-0 card"}>
            <NavLink to={'/games/' + props.games.ID} className={css.link}>
                <img className={`${css.img} card-img-top`}
                     src={props.games.Path}/>
            </NavLink>
            <div className={`${css.bgGame} card-body d-flex`}>
                <div className="my-auto">{props.games.Name}</div>
                <div className={`${css.price} my-auto`}>{props.games.Price > 0 ? props.games.Price + '₴': 'Бесплатно'}</div>
            </div>
        </div>
    )
}

export default GameItem;