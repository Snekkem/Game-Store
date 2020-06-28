import React from "react";
import css from "./Navbar.module.css"
import logo from "./../../assets/images/logo.png"
import {NavLink, useHistory} from "react-router-dom";
import Cookies from 'universal-cookie';
import cart from './../../assets/images/cart.svg'
import wishlist from './../../assets/images/wishlist.svg'
import {getUserProfile} from "../../redux/users-reducer";


const Navbar = (props) => {
    console.log('navbar',props)

    const history = useHistory();

    let isAuth = () => {
        const cookies = new Cookies();
        return cookies.get('Token') ? false : true;
    }

    let logout = () => {
        const cookies = new Cookies();
        props.isAuthAC(false);
        cookies.remove('Token', {path: '/'});
        history.push('/store');
    }

    return (
        <nav className={`${css.navBg} navbar navbar-expand-lg navbar-dark`}>
            <div className="container">
                <NavLink className={css.navbarBrand} to="/store">
                    <img src={logo}/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav w-100 ml-5">
                        <li className={`nav-item`}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                МАГАЗИН
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Гонки"}>
                                    Гонки
                                </NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Шутеры"}>Шутеры</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item"
                                         to={"/games/search-by-genre/Стратегии"}>Стратегии</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Инди"}>Инди</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item"
                                         to={"/games/search-by-genre/Платформеры"}>Платформеры</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Королевская битва"}>Королевская
                                    битва</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/РПГ"}>РПГ</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Аркада"}>Аркада</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Квесты"}>Квесты</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to={"/games/search-by-genre/Карточнаые игры"}>Карточнаые
                                    игры</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item"
                                         to={"/games/search-by-genre/Файтинг"}>Файтинг</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item"
                                         to={"/games/search-by-genre/Симулятор"}>Симулятор</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item"
                                         to={"/games/search-by-genre/Спортивные"}>Спортивные</NavLink>
                            </div>
                        </li>
                        <li className={`nav-item`}>
                            <NavLink className="nav-link" to="/users">ПОЛЬЗОВАТЕЛИ</NavLink>
                        </li>
                        {isAuth()
                            ? <li className={`nav-item ml-auto`}>
                                <NavLink className="nav-link" to="/login">Войти</NavLink>
                            </li>
                            :
                            <>
                                <NavLink to={'/myProfile'} className={`${css.link} ml-2 mr-auto align-self-center`}>
                                    ПРОФИЛЬ
                                </NavLink>
                                <div className={"mr-3 d-flex align-items-center"}>
                                    {props.info ? props.info.Balance : 0}₴
                                </div>
                                <div className={"d-flex align-items-center"}>
                                    <li className={`nav-item mr-3`}>
                                        <NavLink to={"/wishlist"}>
                                            <img src={wishlist} className={css.cart}/>
                                        </NavLink>
                                    </li>
                                    <li className={`nav-item mr-3`}>
                                        <NavLink to={"/cart"}>
                                            <img src={cart} className={css.cart}/>
                                        </NavLink>
                                    </li>
                                    <li className={`nav-item`}>
                                        <button className={`${css.logout}`} type={"button"} onClick={logout}>Выйти
                                        </button>
                                    </li>
                                </div>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;