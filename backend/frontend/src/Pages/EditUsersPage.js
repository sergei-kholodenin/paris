import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getUsersList, createNewUser, deleteUser, updateAdminStatus } from '../Actions/AdminActions';
import { CREATE_USER_RESET, DELETE_USER_RESET, UPDATE_ADMIN_RESET } from '../Constants/AdminConstants';


function EditUsersPage() {
    const [isAdmin, setIsAdmin] = useState([]);
    const [newUser, setNewUser] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, usersList} = useSelector(state => state.usersList);
    const {loading:loadingCreate, success:successCreate} = useSelector(state => state.createUser);
    const {loading:loadingDelete, success:successDelete} = useSelector(state => state.deleteUser);
    const {loading:loadingUpdate, success:successUpdate} = useSelector(state => state.updateAdmin);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!usersList || successCreate || successDelete || successUpdate) {
            dispatch(getUsersList());
            dispatch({type:CREATE_USER_RESET});
            dispatch({type:DELETE_USER_RESET});
            dispatch({type:UPDATE_ADMIN_RESET});
        } else {
            setIsAdmin(usersList.map(user => user.isAdmin));
        }
    }, [userInfo, usersList, successCreate, successDelete, successUpdate
        // positionInfo, successPositionName, successDelete
    ]);

    const updateUserHandler = (id, isAdmin) => {
        window.confirm(`Обновить статус администратора?`) && 
        dispatch(updateAdminStatus({"id":id, "isAdmin":isAdmin}));
    }

    const deleteUserHandler = (id) => {
        window.confirm(`Удалить пользователя?`) && 
        dispatch(deleteUser(id));        
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

    const createNewUserHandler = (email) => {
        window.confirm(`Создать нового пользователя ${email}?`) 
        &&
        dispatch(createNewUser({email: email, password: email.split('@')[0]}));
        setNewUser('');
    } 
    
    return (
        loading || loadingCreate || loadingDelete || loadingUpdate ? <Spinner/> :
        // || loadingDelete || loadingUpdate || !positionInfo ? 
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
                    type='email'
                    placeholder='Введите email нового сотрудника'
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    required
                />
                <button onClick={() => createNewUserHandler(newUser)}>Создать</button>                
            </div>
            <div className='nav-search'>                
                
                <button style={{width: '70%'}} onClick={() => navigate('/statistics/users/profiles/')}>Перейти на страницу с профайлами</button>                
            </div>
            
            <table className='linkRow'>                
                <caption><strong>Информация по пользователям</strong></caption>
                <thead>
                    <tr>
                        <th className='first-stores'>№</th>
                        <th className='second-stores'>Email</th>
                        <th className='first-stores'>Админ</th>
                        <th className='fivth-stores'>Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {isAdmin.length !== 0 && usersList.map((user, i) => (
                                            
                        <tr key={user.username}>
                            <td className='first-stores'># {i + 1}.</td>
                            <td className='second-stores'>
                                    <Link
                                        className='link target'
                                        to={`/statistics/users/profile/${user.id}`}
                                    >{user.email}</Link>
                            </td>
                            <td className='first-stores'>
                                <input 
                                    className='store-input'
                                    type='checkbox' 
                                    checked={isAdmin[i]} 
                                    onChange={(e) => {
                                        let newState = [...isAdmin];
                                        newState[i] = e.target.checked;
                                        setIsAdmin(newState);
                                    }}/>
                            </td>
                            
                            <td className='fivth-stores'>
                                <div className='btn-stores'>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                        onClick={() => {
                                            updateUserHandler(user.id, isAdmin[i]);  
                                        }}
                                    >Обновить</button>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                        onClick={() => {
                                            deleteUserHandler(user.id);
                                        }}
                                    >Удалить</button>
                                </div>
                            </td>                      
       
                        </tr>
                    ))}
                
                </tbody>
            </table>
            {successCreate  && <Message color={'lightgreen'}>Пользователь создан успешно.</Message>}
            {successDelete  && <Message color={'lightgreen'}>Пользователь успешно удален.</Message>}
            {successUpdate  && <Message color={'lightgreen'}>Статус успешно обновлен.</Message>}
        </div>)
    );
}

export default EditUsersPage;