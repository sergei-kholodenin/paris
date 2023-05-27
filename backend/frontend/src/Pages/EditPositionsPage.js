import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getPositionsInfo, updatePositionName, deletePosition, createPosition } from '../Actions/AdminActions';
import { UPDATE_POSITION_NAME_RESET, DELETE_POSITION_RESET } from '../Constants/AdminConstants';


function EditPositionsPage() {
    const [positionName, setPositionName] = useState([]);
    const [newPosition, setNewPosition] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, positionInfo} = useSelector(state => state.getPositions);
    const {loading:loadingUpdate, success:successPositionName, message:messagePositionName} = useSelector(state => state.updatePositionName);    
    const {loading: loadingDelete, success:successDelete, message:messageDelete} = useSelector(state => state.deletePosition);    

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!positionInfo || successDelete){
            dispatch(getPositionsInfo());
            dispatch({type:DELETE_POSITION_RESET});
        } else {
            setPositionName(positionInfo.map(position => position.name)); 
        }
        if (successPositionName) { 
            dispatch({type:UPDATE_POSITION_NAME_RESET});
        }
        if (successDelete) {
            dispatch({type:DELETE_POSITION_RESET});
        }
    }, [userInfo, positionInfo, successPositionName, successDelete]);

    const updatePositionNameHandler = (id, position) => {
        window.confirm(`Обновить название должности на ${position}?`) && 
        dispatch(updatePositionName({id:id, position:position}));
        dispatch(getPositionsInfo());
        setPositionName(positionInfo.map(position => position.name));
    }

    const deletePositionHandler = (id, position) => {
        window.confirm(`Удалить должность ${position}?`) && 
        dispatch(deletePosition(+id));
        setTimeout(() => dispatch(getPositionsInfo()), 300);        
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

    const createPositionHandler = (positionName) => {
        window.confirm(`Создать новую должность ${positionName}?`) &&
        dispatch(createPosition({'name': positionName}));
        setNewPosition('');
        dispatch(getPositionsInfo());
    } 
    
    return (
        loading || loadingDelete || loadingUpdate || !positionInfo ? <Spinner/> :
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
                    placeholder='Введите название новой должности'
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                />
                <button onClick={() => createPositionHandler(newPosition)}>Создать</button>                
            </div>
            
            <table className='linkRow'>                
                <caption><strong>Информация по должностям</strong></caption>
                <thead>
                    <tr>
                        <th className='first-stores'>№</th>
                        <th className='second-stores'>Должность</th>
                        <th className='fivth-stores'>Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {positionInfo.map((position, i) => (
                                            
                        <tr key={position.name}>
                            <td className='first-stores'># {i + 1}.</td>
                            <td className='second-stores'>
                                    <input 
                                    className='store-input target' 
                                    value={positionName[i]} 
                                    onChange={(e) => {
                                        let newState = [...positionName];
                                        newState[i] = e.target.value;
                                        setPositionName(newState);
                                    }}/>
                                    </td>
                            
                            <td className='fivth-stores'>
                                <div className='btn-stores'>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                        onClick={() => {
                                            updatePositionNameHandler(position.id,positionName[i]);  
                                        }}
                                    >Обновить</button>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                        onClick={() => {
                                            deletePositionHandler(position.id,positionName[i]);
                                        }}
                                    >Удалить</button>
                                </div>
                            </td>
                        

                                
                                
                        </tr>
                    ))}
                
                </tbody>
            </table>
            {successPositionName  && <Message color={'lightgreen'}>{messagePositionName}</Message>}
        </div>)
    );
}

export default EditPositionsPage;