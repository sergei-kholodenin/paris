import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import Form from '../Components/Form/Form';
import { Message } from '../Components/Message/Message';
import { getStoreList } from '../Actions/UserActions';
import { takeProfileById, getPositionsInfo, createProfileById, updateProfileById } from '../Actions/AdminActions';
import { GET_PROFILE_RESET, CREATE_PROFILE_RESET, UPDATE_PROFILE_RESET, GET_LIST_PROFILES_RESET } from '../Constants/AdminConstants';

function EditProfilePage() {
    const {id} = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [storeName, setStoreName] = useState('');
    const [posName, setPosName]  = useState('');
    const [telephone, setTelephone] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, profileId, success} = useSelector(state => state.takeProfile);    
    const {loading:loadingStores, error:errorStores, stores} = useSelector(state => state.listStores);
    const {loading:loadingPosition, error:errorPosition, positionInfo} = useSelector(state => state.getPositions)   ;
    const { success: successCreate, loading: loadingCreate, error: errorCreate, message:messageCreate } = useSelector(state => state.createUserProfile);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate, message:messageUpdate } = useSelector(state => state.updateUserProfile);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
        if (!profileId || profileId.profile.id !== id) {
            dispatch(takeProfileById(id));
        }        
           
        if (!positionInfo) {                
            dispatch(getPositionsInfo());
        }
        if (!stores) {                
            dispatch(getStoreList())
        }
        if (successCreate || successUpdate) {
            dispatch({type:CREATE_PROFILE_RESET});
            dispatch({type:UPDATE_PROFILE_RESET});
        }
    }

    },[ userInfo, id, positionInfo, stores, successCreate, successUpdate]);

    useEffect(() => {
        if (stores && positionInfo && profileId) {
            setEmail('');
            setFirstName('');
            setSecondName('');
            setLastName('');
            setTelephone('');
            setStoreName('');
            setPosName('');
            if (!profileId.profileExist) {
                setEmail(profileId.profile.email);
            } else if (profileId.profileExist) {
                setFirstName(profileId.profile.first_name);
                setSecondName(profileId.profile.second_name);
                setLastName(profileId.profile.last_name);
                setTelephone(profileId.profile.telephone);
                setStoreName(profileId.profile.store);
                setPosName(profileId.profile.position);
                setEmail(profileId.profile.email);
            }  
        }
    }, [success])

    const submitHandler = (e) => {
        e.preventDefault();
        if (!profileId.profileExist) {
            dispatch(createProfileById({
                'userId': profileId.profile.id,
                'first_name': firstName,
                'second_name': secondName,
                'last_name': lastName,
                'email': email,
                'telephone': telephone ? telephone: null,
                'store': storeName,
                'position': posName,
                'password': password1
            }))
            dispatch({type:GET_PROFILE_RESET});
            dispatch({type:GET_LIST_PROFILES_RESET});
            
        } else {         
            dispatch(updateProfileById({
                'profileId': profileId.profile.id,
                'userId': profileId.profile.user_id,
                'first_name': firstName,
                'second_name': secondName,
                'last_name': lastName,
                'email': email,
                'telephone': telephone ? telephone: null,
                'store': storeName,
                'position': posName,
                'password': password1
            }))
            dispatch({type:GET_PROFILE_RESET});
        }       
    }
    return (
        loading || loadingStores || loadingPosition || !stores || loadingCreate || loadingUpdate|| !positionInfo  ? <Spinner/> : (
            <div>
                <div className='nav-search'>
                    <button onClick={() => navigate(-1)}>Назад</button>                                  
                </div>
                <Form>
                    <h1>{`Профайл ${email}`}</h1>
                    <p className='text'>Проверьте данные. Если нужно обновить данные, то замените текущие данные в нужных полях и нажмите "Обновить".</p>
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
                        type="number" 
                        name="Телефон" 
                        className='form-input'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                    
                    
                    <label htmlFor="Должность" className='text'>Должность</label>
                    <select 
                        name="Должность" 
                        className='form-input'
                        onChange={(e) => setPosName(positionInfo[e.target.value])}
                    >
                        <option key='selected' value={posName} selected>{posName.name}</option>
                        {positionInfo.map((pos, i) => (
                            <option key={pos.id} value={i} >{pos.name} </option>
                        ))}
                    </select>

                    <label htmlFor="Магазин" className='text'>Магазин</label>
                    <select 
                        name="Магазин" 
                        className='form-input'
                        onChange={(e) => setStoreName(stores[e.target.value])}
                    >
                        <option key='selected' value={storeName} selected>{storeName.name}</option>
                        {stores.map((st, i) => (
                            <option key={st.id} value={i} >{st.name} </option>
                        ))}
                    </select>

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
                    <button className='form-btn' onClick={submitHandler} disabled={loading||loadingCreate||loadingUpdate||loadingStores || loadingPosition || !(password1 === password2)}>Обновить</button>
                </Form>
                {(successCreate || successUpdate) && <Message color={'lightgreen'}>Данные пользователя  успешно загружены</Message>}
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

export default EditProfilePage;