import React, {useState} from 'react';
import css from './Register.module.css'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {setRegisterUserData} from "../../redux/auth-reducer";
import {useHistory} from "react-router-dom";
import {email, maxLengthCreator, minLengthCreator, passwordsMatch, required} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControl";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

const maxLength25 = maxLengthCreator(25);
const minLength = minLengthCreator(6);

let countryValue = '';
let regionValue = '';

const RegisterForm = (props) => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    let selectCountry = (val) => {
        setCountry(val);
        countryValue = val;
    }

    let selectRegion = (val) => {
        setRegion(val);
        regionValue = val;
    }
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <small htmlFor="exampleInputName">Name *</small>
                    <Field type="text" className={`form-control ${css.input}`} id="exampleInputName"
                           aria-describedby="emailHelp" name={"name"}
                           component={Input} validate={[required, maxLength25]}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputEmail">Email *</small>
                    <Field type="email" className={`form-control ${css.input}`} id="exampleInputEmail"
                           aria-describedby="emailHelp" name={"email"}
                           validate={[required, maxLength25, email]} component={Input}/>
                </div>
                <div className="form-group">
                    <CountryDropdown required className={`form-control mt-4 ${css.input}`}
                                     value={country}
                                     onChange={(val) => selectCountry(val)}/>
                    <RegionDropdown required className={`form-control mt-4 ${css.input}`}
                                    country={country}
                                    value={region}
                                    onChange={(val) => selectRegion(val)}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputPassword">Password *</small>
                    <Field type="password" className={`form-control ${css.input}`}
                           id="exampleInputPassword" component={Input} name={"password"}
                           validate={[required, maxLength25, minLength]}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputConfirmPassword">Confirm Password *</small>
                    <Field type="password" className={`form-control ${css.input}`}
                           id="exampleInputConfirmPassword" component={Input} name={"confirmPassword"}
                           validate={[required, maxLength25, passwordsMatch, minLength]}/>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-outline-success">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    )
}

const RegisterReduxFrom = reduxForm({
    form: 'register'
})(RegisterForm)

const Register = (props) => {
    const history = useHistory();

    const onSubmit = (formData) => {
        if (formData.confirmPassword === formData.password) {
            props.setRegisterUserData(formData.name, formData.email, 0, countryValue + ' ' + regionValue,
                null, null, formData.password);
            history.push('/login');
        } else {
            console.log("pass")
        }
    }

    return <div>
        <h4 className="text-center my-3">Регистрация</h4>
        <RegisterReduxFrom onSubmit={onSubmit}/>
    </div>
}

export default connect(null, {setRegisterUserData})(Register);