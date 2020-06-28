import React, {useState} from 'react';
import css from './Game.module.css'
import noAvatar from './../../assets/images/NoAvatar.jpg'
import like from './../../assets/images/like.png'
import dislike from './../../assets/images/dislike.png'
import {NavLink, useHistory} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import Cookies from 'universal-cookie';
import {Field, reduxForm} from "redux-form";

const getImages = (props) => {
    const images = [];

    for (const {Path} of props.pictures) {
        images.push({
            original: Path,
            thumbnail: Path,
        })
    }
    return images;
}


const Game = (props) => {
    console.log(props)

    const [isLike, setLike] = useState(true);

    const SendReviewForm = (formProps) => {
        const [text, setText] = useState('');
        return <form onSubmit={formProps.handleSubmit}>
            <div className={`row no-gutters justify-content-between`}>
                <div className={"col-2 d-flex justify-content-center"}>
                    <NavLink to={"/myProfile"}>
                        {props.userInfo.UserImage
                            ? <img alt="userImg" className={css.reviewUserImage} src={props.reviews.UserImage}/>
                            : <img alt="userNoAvatar" className={css.reviewUserImage} src={noAvatar}/>}
                    </NavLink>
                </div>
                <div>
                    <Field className={css.textareaReview} maxLength="8000" name={"sendReview"} component={"textarea"}
                           required onChange={(e) => setText(e.target.value)} value={text}/>
                </div>
            </div>
            <div className={"d-flex justify-content-between"}>
                <div>
                    <div className={css.isRecommend}>Рекомендуете ли вы эту игру?</div>
                    <button className={`${css.btnRecommend} mr-5`}
                            type={"button"}
                            onClick={() => setLike(true)}>
                        <img src={like} className={isLike === true ? 'border border-light' : ''}/>
                    </button>
                    <button className={css.btnRecommend} onClick={() => setLike(false)} type={"button"}>
                        <img src={dislike} className={isLike === false ? 'border border-light' : ''}/>
                    </button>
                </div>
                <div>
                    <button type={"submit"} className={css.btnSend}>Отправить</button>
                </div>
            </div>
        </form>
    }

    const SendReviewReduxForm = reduxForm({
        form: 'sendReview'
    })(SendReviewForm)

    const onSubmit = (formData) => {
        props.SendReview(props.game.GameID, formData.sendReview, isLike);
    }

    const history = useHistory();

    const deleteReview = (reviewID) => {
        props.DeleteReview(props.game.GameID, reviewID);
    }

    const addInCart = () => {
        const cookie = new Cookies();
        const token = cookie.get('Token');
        if (token === undefined) {
            history.push('/login');
        } else {
            props.addGameInCart(token, props.game.GameID)
            history.push('/cart');
        }
    }

    const addInWishlist = () => {
        const cookie = new Cookies();
        const token = cookie.get('Token');
        if (token === undefined) {
            history.push('/login');
        } else {
            props.addGameInWishlist(token, props.game.GameID)
            history.push('/wishlist');
        }
    }

    let isAuth = () => {
        const cookie = new Cookies();
        return cookie.get('Token') ? true : false;
    }

    const images = getImages(props);

    return (
        <div className="container mx-auto">
            {props.game != null &&
            <div>
                <div className={css.gameName}>
                    {props.game.Name}
                </div>
                <div>
                    <ImageGallery items={images}/>
                </div>

                <div className={css.buyGame}>
                    <div className={css.buyName}>
                        Купить {props.game.Name}
                    </div>
                    {!props.isBought ? '' :
                        !props.isInWishlist
                            ? <button type={"button"} onClick={addInWishlist} className={css.btnAddWishlist}>В
                                желаемое</button>
                            : <div className={css.btnAddedWishlist}>Уже в желаемых</div>
                    }

                    <div className={css.namePrice}>
                        {!props.isBought
                            ? <div>Куплено</div>
                            : !props.isInCart ?
                                <>
                                    <div
                                        className={css.price}>{props.game.Price > 0 ? props.game.Price + '₴' : 'Бесплатно'}</div>
                                    <button type={"button"} className={`border-0 ${css.cart}`} onClick={addInCart}>
                                        В корзину
                                    </button>
                                </>
                                : <div>Уже в корзине</div>
                        }
                    </div>
                </div>
                <div>
                    <div className={css.title}>
                        ОБ ЭТОЙ ИГРЕ
                        <div className={css.separator}></div>
                    </div>
                    <div className={css.text}>
                        {props.game.Description}
                    </div>
                </div>
                <div className={css.requirements}>
                    <div className={css.title}>
                        СИСТЕМНЫЕ ТРЕБОВАНИЯ
                        <div className={css.separator}></div>
                    </div>
                    <div className={css.systemReq}>
                        <div><span>OC:</span> {props.game.OC}</div>
                        <div><span>Процессор:</span> {props.game.Processor}</div>
                        <div><span>Оперативаня память:</span> {props.game.RAM}</div>
                        <div><span>Видеокарта:</span> {props.game.VideoCard}</div>
                        <div><span>DirectX:</span> {props.game.DirectX}</div>
                        <div><span>Место на диске:</span> {props.game.DiskSpace}</div>
                    </div>
                </div>
                <div className={css.developments}>
                    <div className={css.title}>
                        О РАЗРАБОТКЕ
                        <div className={css.separator}></div>
                    </div>
                    <div className={css.devItem}>
                        <div><span>Название:</span> {props.game.Name}</div>
                        <div><span>Жанр:</span> {props.genres.map(genre => genre.Genre + ' ')}</div>
                        <div><span>Издатель:</span> {props.game.Publisher}</div>
                        <div><span>Дата выхода:</span> {props.game.Release.substr(0, 10)}</div>
                    </div>
                </div>
                <div className="mb-5">
                    <div className={css.title}>
                        ОТЗЫВЫ {props.reviews !== null && <span className="ml-auto">({props.reviews.length})</span>}
                        <div className={css.separator}></div>
                    </div>

                    {isAuth() &&
                    <div className={`${css.bgSendReview} my-4`}>
                        <h5 className={"mb-3"}>Написать отзыв к игре {props.game.Name}</h5>
                        <SendReviewReduxForm onSubmit={onSubmit}/>
                    </div>
                    }
                    {props.reviews ? props.reviews.map(r =>
                        <div key={r.ID} className={`${css.review} mt-3`}>
                            <NavLink className={css.userLink} to={`/users/${r.UserID}`}>
                                <div className={css.userInfo}>
                                    <div>
                                        {r.UserImage
                                            ? <img alt="userImg" className={css.userImage} src={r.UserImage}/>
                                            : <img alt="userNoAvatar" className={css.userImage} src={noAvatar}/>}
                                    </div>
                                    <div className="font-weight-bold">{r.UserName}</div>
                                </div>
                            </NavLink>
                            <div className={"d-flex flex-column font"}>
                                <div className="font-weight-normal">
                                    {r.isLike === true
                                        ? <div className="d-flex">
                                            <img src={like}/>
                                            <h5 className="ml-3">Рекомендую</h5>
                                        </div>
                                        : <div className="d-flex">
                                            <img src={dislike}/>
                                            <h5 className="ml-3">Не рекомендую</h5>
                                        </div>}
                                </div>
                                {r.Date &&
                                <div className={css.datePublish}>
                                    Опубликовано {r.Date.substr(0, 16).split('T').join(' ')}</div>}
                                <div className="mt-2">
                                    {r.Review}
                                </div>
                            </div>
                            {r.UserID === props.userInfo.ID &&
                            <button className={css.btnDeleteReview}
                                    onClick={() => deleteReview(r.ID)}>Удалить</button>}
                        </div>) : <h6 className="text-center mt-3">Пока отзывов нет</h6>}

                </div>
            </div>
            }
        </div>
    )
}

export default Game;