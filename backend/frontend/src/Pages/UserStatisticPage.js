import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link, useParams} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';

import { getUserResults } from '../Actions/AdminActions';

import './userStatisticPage.css';

function UserStatisticPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, listResults} = useSelector(state => state.userResults)

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } 
        if (!listResults || listResults === []){
            dispatch(getUserResults(id));
        }       
        
    }, [userInfo, id, listResults, navigate]);

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
        loading || !listResults ? <Spinner/> :
        (<div>
            <div className='nav-search'>
            <button onClick={() => navigate(-1)}>Назад</button>
            <input  
                placeholder='Поиск'
                onChange={(e) => searchTargetHandler(e.target.value)}
            />
            </div>
            <table className='linkRow'>                
                <caption><strong>Результаты тестов сотрудника</strong></caption>
                <thead>
                    <tr>
                        <th className='first-result'>№</th>
                        <th className='second-result'>Название Теста</th>
                        <th className='third-result'>Дата сдачи</th>
                        <th className='fourth-result'>% Правильных ответов</th>
                    </tr>
                </thead>
                <tbody>
                    {listResults.map((result, i) => (                        
                        <tr key={result.id}>
                            <td className='first-result'><Link to={`/tests/results/${result.id}`} className='link'># {i + 1}.</Link></td>
                            <td className='second-result'><Link to={`/tests/results/${result.id}`} className='link target'>{result.test_desc.test ? result.test_desc.test : 'Тест удален'}</Link></td>
                            <td className='third-result'><Link to={`/tests/results/${result.id}`} className='link'>{result.createdAt.substring(0, 16).replace('T',' ')}</Link></td>
                            <td className='fourth-result'><Link to={`/tests/results/${result.id}`} className='link'>{result.percent * 100}%</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    );
}

export default UserStatisticPage;