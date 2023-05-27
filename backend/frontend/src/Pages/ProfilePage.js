import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import Form from '../Components/Form/Form';
import { Message } from '../Components/Message/Message';
import { getUserProfile, getStoreList, createProfile, updateProfile } from '../Actions/UserActions';
import { USER_UPDATE_PROFILE_RESET, USER_CREATE_PROFILE_RESET,USER_GET_PROFILE_RESET } from '../Constants/UserConstants';

function ProfilePage() {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [store, setStore] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, profileInfo, success} = useSelector(state => state.userProfile);    
    const {loading:loadingStores, error:errorStores, stores} = useSelector(state => state.listStores);   
    const { success: successCreate, loading: loadingCreate, error: errorCreate } = useSelector(state => state.createProfile);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = useSelector(state => state.updateProfile);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {     
            
            if ( !success ) {                
                dispatch(getUserProfile());
                dispatch(getStoreList());            
            } else {
                if (profileInfo.profileExist) {
                    setFirstName(profileInfo.profile.first_name);
                    setSecondName(profileInfo.profile.second_name);
                    setLastName(profileInfo.profile.last_name);
                    setTelephone(profileInfo.profile.telephone);
                    setEmail(profileInfo.profile.email);
                    setStore(profileInfo.profile.store);
                } else {
                    setEmail(userInfo.email);
                }                
            }
            dispatch({type: USER_CREATE_PROFILE_RESET});
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            
        }
           
    },[dispatch, userInfo, navigate, success, successUpdate, successCreate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!profileInfo.profileExist) {
            dispatch(createProfile({
                'first_name': firstName,
                'second_name': secondName,
                'last_name': lastName,
                'email': email,
                'telephone': telephone ? telephone: null,
                'store': store,
                'password': password1
            }))
            dispatch({type:USER_GET_PROFILE_RESET});
            
        } else {           
            dispatch(updateProfile({
                'profileId': profileInfo.profile.id,
                'first_name': firstName,
                'second_name': secondName,
                'last_name': lastName,
                'email': email,
                'telephone': telephone ? telephone: null,
                'store': store,
                'password': password1
            }))
            dispatch({type:USER_GET_PROFILE_RESET});
        }       
    }
    return (
        loading || loadingStores ? <Spinner/> : (
            <div>
                <Form>
                    <h1>Ваш профайл</h1>
                    <p className='text'>Проверьте свои данные. Если нужно обновить данные, то замените текущие данные в нужных полях и нажмите "Обновить".</p>
                    <label htmlFor="Имя" className='text'>Имя</label>
                    <input 
                        type="text" 
                        name="Имя" 
                        className='form-input'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="Отчество" className='text'>Отчество</label>
                    <input 
                        type="text" 
                        name="Отчество" 
                        className='form-input'
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                    <label htmlFor="Фамилия" className='text'>Фамилия</label>
                    <input 
                        type="text" 
                        name="Фамилия" 
                        className='form-input'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="Email" className='text'>Email</label>
                    <input 
                        type="email" 
                        name="Email" 
                        className='form-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Телефон" className='text'>Телефон</label>
                    <input 
                        type="text" 
                        name="Телефон" 
                        className='form-input'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                    
                    {!loadingStores && stores && (
                        <>
                        <label htmlFor="Магазин" className='text'>Магазин</label>
                        <select 
                            name="Магазин" 
                            className='form-input'
                            value={store}
                            onChange={(e) => setStore(stores[e.target.value])}
                        >
                            <option key='selected' value={store}>{store.name}</option>
                            {stores.map((st, i) => (
                                <option key={st.id} value={i} >{st.name} </option>
                            ))}
                        </select>
                        </>
                    )}

                    <p>Для изменения пароля введите новый пароль ниже и повторите его.</p>
                    <label htmlFor="Пароль" className='text'>Пароль</label>
                    <input 
                        type="password" 
                        name="Пароль" 
                        className='form-input'
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                    
                    <label htmlFor="Повтор Пароля" className='text'>Повторите новый пароль</label>
                    <input 
                        type="password" 
                        name="Повтор Пароля" 
                        className='form-input'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    {!(password1 === password2) && <p style={{color: 'red'}}>Пароли не совпадают</p>}
                    <button className='form-btn' onClick={submitHandler} disabled={loading||loadingCreate||loadingUpdate||loadingStores || !(password1 === password2)}>Обновить</button>
                </Form>
                {!loading&& !loadingCreate&& !loadingStores && !loadingUpdate && success && (successCreate || successUpdate) && <Message color={'lightgreen'}>Данные пользователя  успешно загружены</Message>}
                {(error || errorCreate || errorUpdate || errorStores) && <Message color={'#ff6363'}>Возникла ошибка:</Message>}
                {error && <Message color={'#ff6363'}>{error}</Message>}
                {errorCreate && <Message color={'#ff6363'}>{error}</Message>}
                {errorUpdate && <Message color={'#ff6363'}>{error}</Message>}
                {errorStores && <Message color={'#ff6363'}>{error}</Message>}
                {(error || errorCreate || errorUpdate || errorStores) && <Message color={'#ff6363'}>Проверьте правильность введенных данных</Message>}
            </div>
        )        
    );
}

export default ProfilePage;