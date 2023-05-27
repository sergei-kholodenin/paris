import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import {Message} from '../Components/Message/Message';

import { getQuestionsInfo, updateQuestion, deleteQuestion, createQuestion, deleteVariant } from '../Actions/AdminActions';
import { UPDATE_QUESTION_RESET, DELETE_QUESTION_RESET, CREATE_QUESTION_RESET } from '../Constants/AdminConstants';

import './editQuestionsPage.css';


function EditQuestionsPage() {
    const {id} = useParams();
    const [questBody, setQuestBody] = useState('');
    const [questVar, setQuestVar] = useState('');
    const [newQuest, setNewQuest] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, questionList} = useSelector(state => state.getQuestions);
    const {loading:loadingUpdate, success:successUpdate, message:messageUpdate} = useSelector(state => state.updateQuestion);    
    const {loading: loadingDelete, success:successDelete, message:messageDelete} = useSelector(state => state.deleteQuestion);    
    const {loading: loadingCreate, success:successCreate, message:messageCreate} = useSelector(state => state.createQuestion);    

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!questionList  || (questionList.length !== 0 && questionList[0].test_id != id)
            || successDelete
            ){
            dispatch(getQuestionsInfo(id));
            dispatch({type:DELETE_QUESTION_RESET});
        } else {
            if (!loading || questBody.length !== questionList.length) {
                setQuestBody(questionList.map(quest => quest.question)); 
                setQuestVar(questionList.map(quest => quest.variants));         
            } 
        }
        if (successCreate || successUpdate || successDelete) {             
            dispatch(getQuestionsInfo(id));
            dispatch({type:CREATE_QUESTION_RESET});
            dispatch({type:UPDATE_QUESTION_RESET});
            dispatch({type:DELETE_QUESTION_RESET});
            setQuestBody(questionList.map(quest => quest.question)); 
            setQuestVar(questionList.map(quest => quest.variants));
        }
    }, [userInfo, questionList,
        successCreate, successUpdate, successDelete,
        dispatch]);

    const updateQuestionHandler = (i) => {
        window.confirm(`Обновить данные вопроса ${questBody[i]}?`) && 
        questVar[i].filter(item => item.id && item.delete).map(del => {
            dispatch(deleteVariant(del.id));
        })
        dispatch(updateQuestion({
            'id': questionList[i].id,
            'question' : questBody[i],
            'variants': questVar[i].filter(item => item.delete !== true)
        }));
    }

    const deleteQuestionHandler = (i) => {
        window.confirm(`Удалить тест ${questBody[i]}?`) && 
        dispatch(deleteQuestion(questionList[i].id));     
    }

    const searchTargetHandler = (search) => {
        
        const targets = document.querySelectorAll('.target');            
        targets.forEach(target => {
            if (target.value.toLowerCase().includes(search.toLowerCase())) {
                target.parentElement.parentElement.parentElement.classList.remove('hide');
            } else {
                target.parentElement.parentElement.parentElement.classList.add('hide');
            }
        })
    }

    const createQuestHandler = (quest) => {
        window.confirm(`Создать новый вопрос ${quest}?`) &&
        dispatch(createQuestion({
            'test_id': id,
            'question': quest
        }));
        setNewQuest('');
    }
    
    const createVarRowHandler = (questId, baseId) => {
        let newState = [...questVar];
        newState[questId].push({variant: 'Новый вариант', is_right: false, question_id: baseId});
        setQuestVar(newState);         
    }

    const deleteVarHandler = (qId, vId, e) => {        
        let newState = [...questVar];
        newState[qId][vId].delete = true;
        setQuestVar(newState);
        e.target.parentElement.parentElement.style.display = 'none';
        
    }
    
    return (
        loading || !questionList || !questBody || loadingDelete || loadingUpdate || loadingCreate ? <Spinner/> :          
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
                    placeholder='Введите новый вопрос'
                    value={newQuest}
                    onChange={(e) => setNewQuest(e.target.value)}
                />
                <button onClick={() => createQuestHandler(newQuest)}>Создать</button>                
                <button onClick={() => navigate(`/statistics/tests/${id}/questions/multi`)}>Создать несколько</button>                
            </div>
            
            <table className='questsRow'>                
                <caption><strong>Информация по вопросам теста</strong></caption>
                <tbody>
                {questionList.length !== 0 && questionList.map((item, i) => (
                    <table className='questCard' key={item.createdAt}>
                        <tbody>
                        <tr># {i+1}. 
                            <input 
                                className='store-input target' 
                                value={questBody[i]} 
                                onChange={(e) => {
                                    let newState = [...questBody];
                                    newState[i] = e.target.value;
                                    setQuestBody(newState);
                                }}/>
                        </tr>
                        <tr>
                            <table className={`varCard quest${i}`}>
                                <tbody>
                                <tr>
                                    <th>Вариант</th>
                                    <th>Верный</th>
                                    <th><i className='fas fa-trash'></i></th>
                                </tr>                            
                                    {item.variants.map((variant, j) => (
                                        <tr key={variant.variant}>
                                            <td>
                                                <input 
                                                    className='store-input' 
                                                    value={questVar[i][j].variant} 
                                                    onChange={(e) => {
                                                        let newState = [...questVar];
                                                        newState[i][j].variant = e.target.value;
                                                        setQuestVar(newState);
                                                    }}/>
                                            </td>
                                            <td className='checks-var'>
                                                <input 
                                                    className='store-input'
                                                    type='checkbox' 
                                                    checked={questVar[i][j].is_right} 
                                                    onChange={(e) => {
                                                        let newState = [...questVar];
                                                        newState[i][j].is_right = e.target.checked;
                                                        setQuestVar(newState);
                                                    }}/>
                                            </td>
                                            <td className='checks-var'>
                                                <button 
                                                    className='delete'
                                                    on onClick={(e) => deleteVarHandler(i, j, e)}
                                                >-</button>
                                            </td>
                                        </tr>
                                    ))}
                                    <button 
                                        className='add-btn'
                                        onClick={() => createVarRowHandler(i, item.id)}
                                    >+ Добавить вариант</button>
                                </tbody>
                            </table>
                            <td className='btns-td'>
                                    <div className='btn-quest'>
                                        <button 
                                            className='edit-btn'
                                            style={{backgroundColor:'rgba(57,191,80, .7)'}}
                                            onClick={() => {
                                                updateQuestionHandler(i);  
                                            }}
                                        >Обновить</button>
                                        
                                        <button 
                                            className='edit-btn'
                                            style={{backgroundColor: 'rgba(212,17,40,.7)'}}
                                            onClick={() => {
                                                deleteQuestionHandler(i);
                                            }}
                                        >Удалить</button>
                                    </div>
                            </td> 
                        </tr>
                        </tbody>             
                    </table>
                ))}
                </tbody>
            </table>
            {successUpdate  && <Message color={'lightgreen'}>{messageUpdate}</Message>}
        </div>)
    );
}

export default EditQuestionsPage;