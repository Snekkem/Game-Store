import React, {useState} from 'react';
import css from './Shop.module.css'
import searchImg from "./../../assets/images/search.svg";
import GameItem from "./GameItem";

const Shop = (props) => {
    const [text, setText] = useState('');

    let filteredGames = props.games.filter(
        (game) => {
            if (text.text !== undefined)
                return game.Name.toLowerCase().indexOf(text.text.toLowerCase()) !== -1;
        }
    );

    let onSubmitForm = (e) => {
        e.preventDefault();
    }

    let onChangeText = (text) => {
        setText(props.text(text));
    }

    return (
        <div className="container mx-auto">
            <div className={`{css.title} row no-gutters align-items-center`}>
                <div className={"mr-auto"}>ИГРЫ</div>
                <form className={`${css.navItem} form-inline my-2 my-lg-0`}
                      onSubmit={(e) => onSubmitForm(e)}>
                    <input className={`${css.input} form-control`}
                           type="search" placeholder="Поиск" onChange={(e) => onChangeText(e.target.value)}/>
                    <button type="submit" className={`${css.btnSubmit} p-1 btn btn-info`}>
                        <img src={searchImg} alt="search"/>
                    </button>
                </form>
            </div>
            <div className={css.separator}></div>
            <div className="d-flex justify-content-center flex-wrap">
                {props.gamesByGenre.length === 0
                    ? filteredGames.length === 0
                        ? props.games.map(g => <GameItem key={g.ID} games={g}/>)
                        : filteredGames.map(fg => <GameItem key={fg.ID} games={fg}/>)
                    : props.gamesByGenre.map(gbg => <GameItem key={gbg.ID} games={gbg}/>)
                }
            </div>
        </div>
    )
}

export default Shop;