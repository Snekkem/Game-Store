import React from 'react';
import css from './Login.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControl";
import {email, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {isAuthAC, setAuthUserData} from "../../redux/auth-reducer";

const minLength = minLengthCreator(6);

const LoginForm = (props) => {

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center mt-4">
                <form onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <small htmlFor="exampleInputEmail1">Email *</small>
                        <Field type="email" className={`form-control ${css.input}`} id="exampleInputEmail1"
                               aria-describedby="emailHelp" component={Input} name={"email"} required
                               validate={[required, email]}/>
                    </div>
                    <div className="form-group">
                        <small htmlFor="exampleInputPassword1">Password *</small>
                        <Field type="password" required className={`form-control ${css.input}`}
                               id="exampleInputPassword1" component={Input} name={"password"}
                               validate={[required, minLength]}/>
                    </div>
                    <div className="mx-auto">
                        <button type="submit" className="btn btn-outline-success mr-4">Войти</button>
                        <NavLink type="button" className="btn btn-outline-secondary"
                                 to='/register'>Зарегистрироваться</NavLink>
                    </div>

                </form>
            </div>
        </div>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {
    const history = useHistory();
    const onSubmit = async (formData) => {
        let status = await props.setAuthUserData(formData.email, formData.password);

        if (status) {
            props.isAuthAC(true);
            history.push('/store');
        }
    }

    return <div>
        <h4 className="text-center my-3">Вход</h4>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default connect(null, {setAuthUserData, isAuthAC})(Login)