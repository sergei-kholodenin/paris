import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';
import { Message } from '../Components/Message/Message';
import { takeTest, postResult, getResults } from '../Actions/TestActions';

import './testTakePage.css';

function TestTakePage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.userLogin)
    const {infoTest, loading, error} = useSelector(state => state.testTake); 
        
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (!infoTest || infoTest.id != id) {
            dispatch(takeTest(id));
        }        
        
    }, [userInfo, infoTest]);

    const transferHandler = (travel, lenVar) => {
        const testCards = document.querySelector('.cards-container');
        testCards.style.transform = `translateX(${-travel * 100 / (lenVar + 2)}%)`;
        const progress = document.querySelector('.progress');
        progress.style.width = `${0 + travel * 100 / (lenVar + 1)}%`    
    }

    const submitHandler = () => {
        const ansVars = document.querySelectorAll('.toggle');
        let ansArr = [];
        ansVars.forEach(ans => {
            const ansId = ans.getAttribute('id');
            const ansTake = ans.checked;
            const right = ans.getAttribute('right');
            const ansQ = ans.getAttribute('question');
            ansArr.push({questionId: +ansQ, variantId: +ansId, isChecked: ansTake, isRight: (right === 'true') === ansTake});
        });
        
        ansArr.map(ans => {
            let isRightQ = ans.isRight;
            ansArr.filter(x => x.questionId === ans.questionId).forEach(i => isRightQ = i.isRight && isRightQ);
            ans.isRightQ = isRightQ;
        })
        const rightAnsCount = ansArr.filter(ans => ans.isRightQ === true).length;
        const rightAnsCountQ = new Set(ansArr.filter(ans => ans.isRightQ === true).map(x => x.questionId));
        const rightPercent = rightAnsCount / ansArr.length;
        const answers = {
            testId : id,
            ansArr : ansArr,
            rightAns : rightAnsCountQ.size,
            percent : rightPercent
        }
        dispatch(postResult(answers));
        setTimeout(() => dispatch(getResults()), 100);
        navigate('/');
    }

    return (
        loading || !infoTest ? <Spinner/> : (
        <div className='window-container'>
            <div className='progress-container'>
                    <div className='progress'></div>
            </div>
            <div className="cards-container">                
                <div className='test-card'>
                    <h2>{infoTest.test}</h2>
                    <p>В тесте "{infoTest.test}" - {infoTest.entry_questions} вопрос{
                    10 < infoTest.entry_questions && infoTest.entry_questions <21 ? 'ов' : 
                    1 < +(infoTest.entry_questions).toString().at(-1) && +(infoTest.entry_questions).toString().at(-1) < 5 ? 'а' : +(infoTest.entry_questions).toString().at(-1) === 1 ? '' : 'ов'}. <br/>
                    Для прохождения нужно набрать {infoTest.entry_percent}% правильных ответов. <br/>
                     Слева от вариантов отмечайте свой ответ. Ответов может быть несколько на один вопрос.<br/> Для прохождения нажмите "Начать".</p>
                    <div className='btn-container'>
                        <button onClick={() => transferHandler(1, infoTest.entry_questions)}>Начать</button>
                    </div>
                </div>
                {infoTest.questions.sort(() => Math.random() - 0.5).slice(0, infoTest.entry_questions).map((question, i) => (                
                    <div className="test-card" key={i}>
                        <h2>{question.question}</h2>
                        {question.variants.sort(() => Math.random() - 0.5).map(variant => (
                            <div key={variant.variant} className="toggle-container">
                                <input type="checkbox" id={variant.id} className="toggle" right={`${variant.is_right}`} question={question.id}/>
                                <label htmlFor={variant.id} className="label">
                                    <div className="ball"></div>
                                </label>
                                <span>{variant.variant}</span>
                            </div>
                        ))}
                        <div className='btn-container'>
                        <button onClick={() => transferHandler(i, infoTest.entry_questions)}>Назад</button>
                        <button onClick={() => transferHandler(i+2, infoTest.entry_questions)}>Вперед</button>
                        </div>                    
                    </div> 
                ))}
                <div className="test-card">
                    <h2>Для отправки результатов нажмите "Завершить"</h2>
                    <p>Результаты будут доступны в разделе "Мои тесты".</p>
                    <button onClick={() => submitHandler()}>Завершить</button>
                </div>                
            </div>
            {error && <Message color={'#ff6363'}>Возникла ошибка:</Message>}
            {error && <Message color={'#ff6363'}>{error}</Message>}
        </div>        
        )
        
    )
}

export default TestTakePage;