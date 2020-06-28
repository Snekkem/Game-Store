import React from "react";
import preloader from './../../assets/images/loader.svg';
import css from './Proloader.module.css';

let Preloader = (props) => {
    return <div className={`text-center ${css.loader}`}>
        <img src={preloader}/>
    </div>
}

export default Preloader;