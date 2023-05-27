import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getTestsInfo, updateTest, deleteTest, createTest, getPositionsInfo } from '../Actions/AdminActions';
import { UPDATE_TEST_RESET, DELETE_TEST_RESET, CREATE_TEST_RESET } from '../Constants/AdminConstants';

import './editTestsPage.css';


function EditTestsPage() {
    const [testName, setTestName] = useState([]);
    const [position, setPosition] = useState([]);
    const [entryQ, setEntryQ] = useState([]);
    const [entryP, setEntryP] = useState([]);

    const [newTest, setNewTest] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, testInfo} = useSelector(state => state.getTests);
    const {loading:loadingPosition, error:errorPosition, positionInfo} = useSelector(state => state.getPositions);
    const {loading:loadingUpdate, success:successUpdate, message:messageUpdate} = useSelector(state => state.updateTest);    
    const {loading: loadingDelete, success:successDelete, message:messageDelete} = useSelector(state => state.deleteTest);    
    const {loading: loadingCreate, success:successCreate, message:messageCreate} = useSelector(state => state.createTest);    

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!testInfo || !testInfo || !positionInfo || successDelete){
            dispatch(getTestsInfo());
            dispatch(getPositionsInfo());
            dispatch({type:DELETE_TEST_RESET});
        } else {
            if (!loading && testInfo.length !== 0) {
                setTestName(testInfo.map(test => test.test)); 
                setPosition(testInfo.map(test => test.position)); 
                setEntryQ(testInfo.map(test => test.entry_questions)); 
                setEntryP(testInfo.map(test => test.entry_percent));          
            } 
        }
        if (successCreate || successUpdate || successDelete) {             
            dispatch(getTestsInfo());
            dispatch({type:CREATE_TEST_RESET});
            dispatch({type:UPDATE_TEST_RESET});
            dispatch({type:DELETE_TEST_RESET});
            setTestName(testInfo.map(test => test.test)); 
            setPosition(testInfo.map(test => test.position)); 
            setEntryQ(testInfo.map(test => test.entry_questions)); 
            setEntryP(testInfo.map(test => test.entry_percent));
        }
    }, [userInfo, testInfo,successCreate, successUpdate, successDelete, dispatch]);

    const updateTestHandler = (id, name, position, entryQ, entryP) => {
        window.confirm(`Обновить данные теста ${name}?`) && 
        dispatch(updateTest({id:id, test: name, position:position, entryQ: entryQ, entryP: entryP}));
    }

    const deleteTestHandler = (id, name) => {
        window.confirm(`Удалить тест ${name}?`) && 
        dispatch(deleteTest(+id));     
    }

    const searchTargetHandler = (search) => {
        
        const targets = document.querySelectorAll('.target');            
        targets.forEach(target => {
            if (target.value.toLowerCase().includes(search.toLowerCase())) {
                target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('hide');
            } else {
                target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('hide');
            }
        })
    }

    const createTestHandler = (name) => {
        window.confirm(`Создать новый тест ${name}?`) &&
        dispatch(createTest({'test': name}));
        setNewTest('');
    } 
    
    return (
        loading || loadingDelete || loadingUpdate || loadingPosition || (!testInfo && !positionInfo) ? <Spinner/> :
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
                    placeholder='Введите название нового теста'
                    value={newTest}
                    onChange={(e) => setNewTest(e.target.value)}
                />
                <button onClick={() => createTestHandler(newTest)}>Создать</button>                
            </div>
            
            <table className='linkRow'>                
                <caption><strong>Информация по тестам</strong></caption>
                <thead>
                    <tr>
                        <th className='first-edit'>№</th>
                        <th className='second-edit'>Тест</th>
                        <th className='third-edit'>Вопросы</th>
                        <th className='fourth-edit'>Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {testInfo && testInfo.map((test, i) => (
                                            
                        <tr key={test.test}>

                            <td className='first-edit'># {i + 1}.</td>

                            <td className='second-edit'>
                                <table>
                                    <tbody>
                                        <tr className='edit'>
                                            <td>Название:</td>
                                            <td><input 
                                            className='store-input target' 
                                            value={testName[i]} 
                                            onChange={(e) => {
                                                let newState = [...testName];
                                                newState[i] = e.target.value;
                                                setTestName(newState);
                                            }}/></td>
                                        </tr>
                                        <tr className='edit'>
                                            <td>Должность:</td>
                                            <td>
                                                <select
                                                    
                                                    className='store-input'
                                                    onChange={(e) => {
                                                        let newState = [...position];
                                                        newState[i] = positionInfo[+e.target.selectedIndex-1].id;
                                                        setPosition(newState);}}
                                                    >
                                                        <option value={position[i] ? position[i] : null}></option>
                                                    {positionInfo.map(pos => (
                                                        <option value={position[i]} key={pos.name} selected={position[i] === pos.id && 'selected'}>{pos.name}</option>
                                                    ))}
                                                </select>
                                                
                                            </td>
                                        </tr>
                                        <tr className='edit'>
                                            <td>Ограничение по кол-ву вопросов:</td>
                                            <td><input 
                                            className='store-input' 
                                            value={entryQ[i]} 
                                            onChange={(e) => {
                                                let newState = [...entryQ];
                                                newState[i] = e.target.value;
                                                setEntryQ(newState);
                                            }}/></td>
                                        </tr>
                                        <tr className='edit'>
                                            <td>Процент прохождения:</td>
                                            <td><input 
                                            className='store-input' 
                                            value={entryP[i]} 
                                            onChange={(e) => {
                                                let newState = [...entryP];
                                                newState[i] = e.target.value;
                                                setEntryP(newState);
                                            }}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td className='third-edit'>
                                <button onClick={() => navigate(`/statistics/tests/${test.id}/questions`)}>Вопросы</button>
                            </td>

                            <td className='fourth-edit'>
                                <div className='btn-stores'>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                        onClick={() => {
                                            updateTestHandler(test.id, testName[i], position[i], entryQ[i], entryP[i]);  
                                        }}
                                    >Обновить</button>
                                    <button 
                                        className='edit-btn'
                                        style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                        onClick={() => {
                                            deleteTestHandler(test.id, testName[i]);
                                        }}
                                    >Удалить</button>
                                </div>
                            </td>                      

                        </tr>
                    ))}
                
                </tbody>
            </table>
            {successUpdate  && <Message color={'lightgreen'}>{messageUpdate}</Message>}
        </div>)
    );
}

export default EditTestsPage;