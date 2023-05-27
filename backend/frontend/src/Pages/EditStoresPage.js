import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getStoresInfo, updateStoreName, deleteStore, createStore } from '../Actions/AdminActions';
import { UPDATE_STORE_NAME_RESET } from '../Constants/AdminConstants';


function EditStoresPage() {
    const [storeName, setStoreName] = useState([]);
    const [newStore, setNewStore] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, storesList} = useSelector(state => state.storesInfo);
    const {success:successStoreName, message:messageStoreName} = useSelector(state => state.updateStoreName);    

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!storesList){
            dispatch(getStoresInfo());
        } else {
            setStoreName(storesList.map(store => store.name)); 
        }
    }, [userInfo, storesList,]);

    const updateStoreNameHandler = (id, store) => {
        window.confirm(`Обновить название магазина на ${store}?`) && 
        dispatch(updateStoreName({id:id, store:store}));
        dispatch(getStoresInfo());
        setStoreName(storesList.map(store => store.name));
    }

    const deleteStoreHandler = (id, store) => {
        window.confirm(`Удалить магазин ${store}?`) && 
        dispatch(deleteStore(+id));
        dispatch(getStoresInfo());        
    }

    const searchTargetHandler = (search) => {
              
        const targets = document.querySelectorAll('.target');            
        targets.forEach(target => {
            if (target.value.toLowerCase().includes(search.toLowerCase())) {
                target.parentElement.parentElement.classList.remove('hide');
            } else {
                target.parentElement.parentElement.classList.add('hide');
            }
        })
    }

    const createStoreHandler = (storeName) => {
        window.confirm(`Создать новый магазин ${storeName}?`) &&
        dispatch(createStore({'name': storeName}));
        setNewStore('');
        dispatch(getStoresInfo());
    } 
    
    return (
        loading || !storesList ? <Spinner/> :
        (<div>
            <div className='nav-search'>
                <button onClick={() => navigate(-1)}>Назад</button>
                <input 
                    placeholder='Поиск'
                    onChange={(e) => searchTargetHandler(e.target.value)}
                />                
            </div>
            <div className='nav-search'>                
                <input 
                    placeholder='Введите название нового магазина'
                    value={newStore}
                    onChange={(e) => setNewStore(e.target.value)}
                />
                <button onClick={() => createStoreHandler(newStore)}>Создать</button>                
            </div>
            
            <table className='linkRow'>                
                <caption><strong>Информация по магазинам</strong></caption>
                <thead>
                    <tr>
                        <th className='first-stores'>№</th>
                        <th className='second-stores'>Магазин</th>
                        <th className='fivth-stores'>Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {storesList.map((store, i) => (
                                            
                        <tr key={store.name}>
                            <td className='first-stores'># {i + 1}.</td>
                            <td className='second-stores'>
                                    <input 
                                    className='store-input target' 
                                    value={storeName[i]} 
                                    onChange={(e) => {
                                        successStoreName && dispatch({type:UPDATE_STORE_NAME_RESET});
                                        let newState = [...storeName];
                                        newState[i] = e.target.value;
                                        setStoreName(newState);
                                    }}/>
                                    </td>
                            
                            <td className='fivth-stores'>
                                <div className='btn-stores'>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                        onClick={() => {
                                            updateStoreNameHandler(store.id,storeName[i]);  
                                        }}
                                    >Обновить</button>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                        onClick={() => {
                                            deleteStoreHandler(store.id,storeName[i]);
                                        }}
                                    >Удалить</button>
                                </div>
                            </td>
                        

                                
                                
                        </tr>
                    ))}
                
                </tbody>
            </table>
            {successStoreName  && <Message color={'lightgreen'}>{messageStoreName}</Message>}
        </div>)
    );
}

export default EditStoresPage;