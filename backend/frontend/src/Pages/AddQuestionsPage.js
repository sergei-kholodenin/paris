import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Components/Spinner/Spinner';
import {createQuestions, getQuestionsInfo} from '../Actions/AdminActions';

import { GET_QUESTIONS_RESET, CREATE_QUESTION_MULTI_RESET } from '../Constants/AdminConstants';

import './addQuestionsPage.css';

function AddQuestionsPage() {
    const {id} = useParams();
    const {questions, setQuestions} = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, success} = useSelector(state => state.createQuestions);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
    }, [userInfo]);

    const createTagsHandler = (textQ) => {
        const tagsDiv = document.querySelector('.tags');
        tagsDiv.innerHTML = ''
        const tags = textQ.split('#').filter(tag => tag.trim() !== '').map(tag => tag.trim());
        tags.forEach((tag, i) => {
            const tagsList = tag.split(';').filter(tag => tag.trim() !== '').map(tag => tag.trim());
            const question = tagsList[0];
            const variants = tagsList.slice(1);
            const tagEl = document.createElement('div');
            tagEl.classList.add('tag');
            tagEl.innerHTML = `
            #${i+1} Вопрос: <br/><br/>
            <strong>${question}</strong> <br/><br/>
            Варианты:
                <ul>               
                </ul>
            `;
            const listEl = tagEl.querySelector('ul');
            variants.forEach(vr => {
                const varEl = document.createElement('li');
                if (vr[0] === '@'){
                    varEl.innerHTML = `${vr.slice(1)}`;
                    varEl.style.backgroundColor = 'rgba(57,191,80, .7)';
                } else {
                    varEl.innerText = vr;
                }               
                
                listEl.appendChild(varEl);
            });
            tagsDiv.appendChild(tagEl);
        });
    }

    const createQuestionsHandler = () => {
        const allText = document.querySelector('.textarea');
        const tags = allText.value.split('#').filter(tag => tag.trim() !== '').map(tag => tag.trim());
        let forPush = [];
        tags.forEach((tag, i) => {
            const tagsList = tag.split(';').filter(tag => tag.trim() !== '').map(tag => tag.trim());
            let oneQ = {}
            oneQ.question = tagsList[0];
            oneQ.variants = []
            tagsList.slice(1).forEach(vr => {
                if (vr[0] === '@'){
                    oneQ.variants.push({variant:vr.slice(1), isRight:true})
                } else {
                    oneQ.variants.push({variant:vr, isRight:false})
                }        
            })
            oneQ.testId = +id;
            forPush.push(oneQ);
        });
        dispatch(createQuestions(forPush));        
        dispatch({type:GET_QUESTIONS_RESET});
        success && dispatch({type:CREATE_QUESTION_MULTI_RESET});
        navigate(-1);        
    }

    return (
        loading ? <Spinner/> :
        <div className='adding-panel'>
            <div className='nav-search'>
                <button onClick={() => navigate(-1)}>Назад</button>                                
            </div>
            <p>
                Для создания вопросов введите их в поле ниже.
                <br />
                Между вопросом и вариантами ставьте ";", перед новым вопросом ставьте "#". В начале правильных вариантов ставьте "@".
                <br/>
                Пример:
                <br/>
                "Вопрос1 ; вариант1; @вариант2; вариант3 # Вопрос2 ; вариант1...."
            </p>
            <textarea  placeholder='Введите вопросы и варианты к ним' className='textarea' onChange={(e) => createTagsHandler(e.target.value)}></textarea>
            <div className="tags">
            </div>
            <div className='nav-search'>
                <button onClick={() => createQuestionsHandler()}>Создать</button>                                
            </div>
        </div>
    );
}

export default AddQuestionsPage;