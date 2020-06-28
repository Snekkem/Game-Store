import React from "react";
import css from './FormsControl.module.css';

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
        <div>
            <input {...input} {...props}  />
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}