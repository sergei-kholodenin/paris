import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import { Message } from '../Components/Message/Message';
import { loginUser } from '../Actions/UserActions';
import { USER_LOGOUT_REQUEST } from '../Constants/UserConstants';

import './loginpage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo, loading, error} = useSelector(state => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
        if (error) {
            dispatch({type:USER_LOGOUT_REQUEST});
        }
    }, [userInfo, dispatch, error, navigate]);

    const loginHandler = (e) => {
        e.preventDefault();
        if (!userInfo) {
            dispatch(loginUser(email, password));
        }        
    }
    return (
        loading ? <Spinner/> :        
        (<div className="bg">
            <div className="container-form">
                <h1>Вход на портал</h1>
                <form onSubmit={loginHandler}>
                    <div className="form-control">
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                        <label>
                            {`Электронная почта`.split('').map((letter, i) => (
                                <span key={i + 100} style={{transitionDelay: `${i * 50}ms`}}>{letter}</span>
                            ))}
                        </label>
                    </div>
                    <div className="form-control">
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <label>
                            {`Пароль`.split('').map((letter, i) => (
                                <span key={i +200} style={{transitionDelay: `${i * 50}ms`}}>{letter}</span>
                            ))}
                        </label>
                    </div>

                    <button className="btn" type="submit"><strong>Войти</strong></button>
                    <p className="text">Не получается войти или забыли пароль? Обратитесь к администратору базы данных.</p>
                </form>
            </div>
            {error && <Message color={'#ff6363'}>Возникла ошибка:</Message>}
            {error && <Message color={'#ff6363'}>{error}</Message>}
            {error && <Message color={'#ff6363'}>Проверьте правильность введенных данных</Message>}
        </div>)
    
    );
}

export default LoginPage;