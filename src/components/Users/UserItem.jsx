import css from "./Users.module.css";
import noAvatar from "../../assets/images/NoAvatar.jpg";
import React from "react";
import {NavLink} from "react-router-dom";

const UserItem = (props) => {
    return <NavLink className={css.userLink} to={`users/${props.users.ID}`}>
    <div key={props.users.ID} className={`${css.userItem} row no-gutters mt-3`}>
            <div>
                {props.users.UserImage !== null && props.users.UserImage !== ""
                    ? <img className={css.avatar} src={props.users.UserImage} alt="userImage"/>
                    : <img className={css.avatar} src={noAvatar} alt="noAvatar"/>
                }
            </div>
            <div>
                <h5>{props.users.UserName}</h5>
                <div>{props.users.Location !== null && props.users.Location}</div>
            </div>
    </div>
    </NavLink>
}

export default UserItem;