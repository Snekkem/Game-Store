import React, {useState} from "react";
import css from "./UserProfule.module.css"
import noAvatar from './../../assets/images/NoAvatar.jpg'
import {NavLink} from "react-router-dom";
import pencil from "./../../assets/images/pencil.png"
import ImageUploader from 'react-images-upload';

const UserProfile = (props) => {
    console.log(props)

    const [pictures, setPictures] = useState([]);

    const [textareaVisible, setTextareaVisible] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');

    let onDrop = (picture) => {
        setPictures(pictures.concat(picture))
    }

    let showTextarea = () => {
        if (textareaVisible) {
            setTextareaVisible(false);
            props.updateAboutUser(textareaValue);
        } else {
            setTextareaVisible(true);
            props.updateAboutUser(textareaValue);
        }
    }

    return (
        <div className={"container"}>
            <div className={css.userProfile}>
                <div className={"mr-3"}>
                    {props.user && props.user.UserImage
                        ? <img className={css.userPhoto} src={props.user.UserImage}/>
                        : <img className={css.userPhoto} src={noAvatar}/>
                    }
                    {props.user && props.location.pathname === "/myProfile"
                        ? <ImageUploader
                            name={"photo"}
                            withIcon={true}
                            buttonText='Choose image'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            fileSizeError={"file size is too big"}
                            fileTypeError={"is not supported file extension"}
                            withLabel={false}
                            withIcon={false}
                            singleImage={true}
                            fileContainerStyle={{
                                backgroundColor: 'transparent',
                                boxShadow: 'none', padding: 0, margin: 0
                            }}
                        />
                        : ''}
                </div>
                {props.user && props.location.pathname === "/myProfile" ?
                    <div>

                        <div className={css.userName}>{props.user.UserName}</div>
                        <p className={css.location}>{props.user.Location
                            ? props.user.Location
                            : <span>Информация отсутствует.</span>
                        }
                        </p>
                        <p className={css.aboutUser}>
                            <div>
                                {textareaVisible
                                    ? props.user.AboutUser
                                        ? <textarea className={css.editAboutUser} rows={"3"}
                                                    onChange={(e) => setTextareaValue(e.target.value)}
                                                    cols={"50"}>{props.user.AboutUser}</textarea>
                                        : <textarea onChange={(e) => setTextareaValue(e.target.value)}
                                                    className={css.editAboutUser} rows={"3"} cols={"60"}/>
                                    : props.user.AboutUser
                                        ? <span>{props.user.AboutUser}</span>
                                        : <span>Информация отсутствует.</span>
                                }
                                <button className={css.edit} onClick={showTextarea}>
                                    <img src={pencil}/>
                                </button>
                            </div>
                        </p>
                    </div>
                    : <div>
                        <div className={css.userName}>{props.user.UserName}</div>
                        <p className={css.location}>{props.user.Location ? props.user.Location : 'Информация отсутствует.'}</p>
                        <p className={css.aboutUser}>{props.user.AboutUser ? props.user.AboutUser : 'Информация отсутствует.'}</p>
                    </div>}
            </div>

            <div className={css.userGames}>
                <div className={css.title}>Игры</div>

                {props.userGames !== null &&
                props.userGames.length !== 0 ?
                    props.userGames.map(g =>
                        <NavLink className={css.gameLink} key={g.GameId} to={`/games/${g.GameId}`}>
                            <div className={css.gamesList}>
                                <div className={css.gameImg}>
                                    <img src={g.Path}/>
                                </div>
                                <div>
                                    {g.Name}
                                </div>
                            </div>
                        </NavLink>
                    ) : <h5 className={"text-center"}>У данного пользователя игр нет.</h5>}
            </div>
        </div>
    )
}

export default UserProfile;