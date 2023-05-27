import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link, useParams} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';

import { getResultDetails } from '../Actions/TestActions';

import './resultDetailsPage.css'


function ResultDetailsPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, details} = useSelector(state => state.resultDetails)
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } 
        if (!details || details[0].id != id){
            dispatch(getResultDetails(id));
        }            
        
    }, [userInfo, details, id])

    return (
        loading || !details ? <Spinner/> :
        (<div>
            <div className='nav-search'>
                <button onClick={() => navigate(-1)}>Назад</button>
            </div>
            <table className='linkRow'>                
                <caption><strong>Результаты <br/> {`${details[0].test_desc.test}`} <br/> {`${details[0].createdAt.substring(0,16).replace('T',' ')}`}</strong></caption>
                <thead>
                    <tr>
                        <th className='first-details'>№</th>
                        <th className='second-details'>Вопрос</th>
                        <th className='third-details'>Ответ</th>
                        <th className='fourth-details'>Правильный</th>
                        <th className='fourth-details'>Выбран</th>
                    </tr>
                </thead>
                <tbody>
                    {details[0].answers.map((answer, i) => (                        
                        <tr key={answer.id}>

                            <td className='first-details' style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}>{i != 0 && details[0].answers[i-1].question_id === answer.question_id ?  null : `# ${answer.question_id}.` }</td>

                            {
                            i != 0 && details[0].answers[i-1].question_id === answer.question_id ? 
                                <td style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}></td> :
                                <td className='second-details' style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}>
                                    {details[0].test_desc.questions && details[0].test_desc.questions.filter(question => question.id === answer.question_id).length !== 0 ? details[0].test_desc.questions.filter(question => question.id === answer.question_id)[0].question : 'Вопрос удален'}
                            </td>}
                            
                            <td className='third-details' style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}>{
                            details[0].test_desc.questions &&
                            details[0].test_desc.questions.filter(question => question.id === answer.question_id).length !== 0 &&
                            details[0].test_desc.questions.filter(question => question.id === answer.question_id)[0].variants.filter(variant => variant.id === answer.variant_id).length !== 0 ?
                            details[0].test_desc.questions.filter(question => question.id === answer.question_id)[0].variants.filter(variant => variant.id === answer.variant_id)[0].variant : "Вариант удален"}</td>

                            <td className='fourth-details' style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}>
                                {details[0].test_desc.questions &&
                                details[0].test_desc.questions.filter(question => question.id === answer.question_id).length !== 0 && details[0].test_desc.questions.filter(question => question.id === answer.question_id)[0].variants.filter(variant => variant.id === answer.variant_id).length !== 0  ?
                                details[0].test_desc.questions.filter(question => question.id === answer.question_id)[0].variants.filter(variant => variant.id === answer.variant_id)[0].is_right && <i class="fas fa-check" style={{color: "green"}}></i> :
                                "Вариант удален"
                            }</td>

                            <td className='fourth-details' style={{backgroundColor: answer.is_right_question  ? '#acfcb9' : '#fcacac'}}>{
                                answer.is_checked && answer.is_right ?
                                <i class="fas fa-check" style={{color: "green"}}></i> : 
                                answer.is_checked && !answer.is_right ?
                                <i class="fas fa-times" style={{color: "red"}}></i> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    );
}

export default ResultDetailsPage;