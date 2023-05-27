import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getListProfiles, getPositionsInfo, deleteUser, updateStorePosition } from '../Actions/AdminActions';
import { getStoreList } from '../Actions/UserActions';
import {  DELETE_USER_RESET, GET_USERS_LIST_RESET, UPDATE_STORE_POS_RESET } from '../Constants/AdminConstants';

import './editProfileUserPage.css';


function EditProfileUserPage() {
    const [store, setStore] = useState('');
    const [position, setPosition] = useState('');
    console.log(store)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, listProfiles, success} = useSelector(state => state.getListProfiles);
    const {loading:loadingPosition, error:errorPosition, positionInfo} = useSelector(state => state.getPositions);
    const {loading:loadingStores, error:errorStores, stores} = useSelector(state => state.listStores);
    const {loading:loadingDelete, success:successDelete} = useSelector(state => state.deleteUser);
    const {loading:loadingUpdate, success:successUpdate} = useSelector(state => state.updateStorePos);
    

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!listProfiles || !positionInfo || !stores || successDelete || successUpdate) {
            dispatch(getListProfiles());           
            dispatch(getPositionsInfo());
            dispatch(getStoreList());            
            dispatch({type:DELETE_USER_RESET});
            dispatch({type:UPDATE_STORE_POS_RESET});
        }
    }, [userInfo, success, successDelete, successUpdate]);

    useEffect(() => {
        if (success) {
            setStore(listProfiles.map(profile => profile.store));
            setPosition(listProfiles.map(profile => profile.position));
        }
    }, [success])

    const updateStorePosHandler = (id, store, position) => {
        window.confirm(`Обновить данные по магазину и должности для сотрудника?`) && 
        dispatch(updateStorePosition({"id":id, 'store': store.id, 'position': position.id}));
    }

    const deleteUserHandler = (id) => {
        window.confirm(`Удалить пользователя?`) && 
        dispatch(deleteUser(id));
        dispatch({type:GET_USERS_LIST_RESET});       
    }

    const searchTargetHandler = (search) => {
        
        const targets = document.querySelectorAll('.target');            
        targets.forEach(target => {
            if (target.innerText.toLowerCase().includes(search.toLowerCase())) {
                target.parentElement.parentElement.classList.remove('hide');
            } else {
                target.parentElement.parentElement.classList.add('hide');
            }
        })
    }

    
    return (
        loading || loadingPosition || loadingStores || !listProfiles || !positionInfo || !stores ? <Spinner/> :
        
        (<div>
            <div className='nav-search'>
                <button onClick={() => navigate(-1)}>Назад</button>
                <input 
                    placeholder='Поиск'
                    onChange={(e) => searchTargetHandler(e.target.value)}
                />                
            </div>                        
           
            
            <table className='linkRow'>                
                <caption><strong>Информация по пользователям</strong></caption>
                <thead>
                    <tr>
                        <th className='first-profile'>№</th>
                        <th className='second-profile'>ФИО</th>
                        <th className='third-profile'>Магазин</th>
                        <th className='fourth-profile'>Должность</th>
                        <th className='fivth-profile'>Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {listProfiles.map((profile, i) => (
                                            
                        <tr key={profile.id}>
                            <td className='first-profile'># {i + 1}.</td>
                            <td className='second-profile'>
                                    <Link
                                        className='link target'
                                        to={`/statistics/users/profile/${profile.id}`}
                                    >{
                                        `${profile.first_name ? profile.first_name : ''} ${profile.second_name ? profile.second_name : ''} ${profile.last_name ? profile.last_name : ''}`.trim()
                                    }</Link>
                            </td>
                            <td className='third-profile'>
                                <select                                                        
                                    className='store-input'
                                    onChange={(e) => {
                                        let newState = [...store];
                                        newState[i] = stores[+e.target.selectedIndex-1];
                                        setStore(newState);}}
                                    >
                                        <option value={store[i] ? store[i] : null}></option>
                                    {stores.map(st => (
                                        <option value={st} key={st.name} selected={profile.store.id === st.id && 'selected'}>{st.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className='fourth-profile'>
                                <select
                                                        
                                    className='store-input'
                                    onChange={(e) => {
                                        let newState = [...position];
                                        newState[i] = positionInfo[+e.target.selectedIndex-1];
                                        setPosition(newState);}}
                                    >
                                        <option value={position[i] ? position[i] : null}></option>
                                    {positionInfo.map(pos => (
                                        <option value={pos} key={pos.name} selected={profile.position.id === pos.id && 'selected'}>{pos.name}</option>
                                    ))}
                                </select>
                            </td>
                            
                            <td className='fivth-stores'>
                                <div className='btn-stores'>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                        onClick={() => {
                                            updateStorePosHandler(profile.id, store[i], position[i]);  
                                        }}
                                    >Обновить</button>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                        onClick={() => {
                                            deleteUserHandler(profile.user_id);
                                        }}
                                    >Удалить</button>
                                </div>
                            </td>                      
       
                        </tr>
                    ))}
                
                </tbody>
            </table>
            {/* {successCreate  && <Message color={'lightgreen'}>Пользователь создан успешно.</Message>}
            {successDelete  && <Message color={'lightgreen'}>Пользователь успешно удален.</Message>}
            {successUpdate  && <Message color={'lightgreen'}>Статус успешно обновлен.</Message>} */}
        </div>)
    );
}

export default EditProfileUserPage;