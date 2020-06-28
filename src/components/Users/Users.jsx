import React, {useState} from 'react';
import css from './Users.module.css'
import searchImg from "./../../assets/images/search.svg"
import UserItem from "./UserItem";

const Users = (props) => {
    console.log(props)
    const [text, setText] = useState('');

    let onTextChanged = (e) => {
        setText(props.text(e));
    }

    let onSubmitForm = (e) => {
        e.preventDefault();
    }

    let filteredNames = props.users.filter(
        (name) => {
            if (text.searchText !== undefined)
                return name.UserName.toLowerCase().indexOf(text.searchText.toLowerCase()) !== -1;
        }
    );

    return (
        <div className="container">
            <div className={css.findFriends}>Найти друзей</div>
            <div className={css.searchByName}>Поиск по имени пользователя.</div>
            <form onSubmit={(e) => onSubmitForm(e)}>
                <input className={css.input} onChange={(e) => onTextChanged(e.target.value)} type="text"/>
                <button type="submit" className={`${css.btnSubmit} btn btn-info`}>
                    <img src={searchImg} alt="search"/>
                </button>
            </form>

            <div className="mt-4 mb-2">ПОЛЬЗОВАТЕЛИ</div>

            {filteredNames.length !== 0
                ? filteredNames.map(su => <UserItem key={su.ID} users={su} />)
                : props.users.map(su => <UserItem key={su.ID} users={su}/>)
            }
        </div>
    )
}


export default Users;