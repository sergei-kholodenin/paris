import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';

import { getResults } from '../Actions/TestActions';

import './homePage.css'

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, listResults} = useSelector(state => state.resultsGet)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } 
        if (!listResults){
            dispatch(getResults());
        }            
        
    }, [userInfo, listResults])

    return (
        loading || !listResults ? <Spinner/> :
        (<div>
            <table className='linkRow'>                
                <caption><strong>Мои тесты</strong></caption>
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
                            <td className='first-result'># {i + 1}.</td>
                            <td className='second-result'>{result.test_desc.test ?result.test_desc.test : "Тест удален"}</td>
                            <td className='third-result'>{result.createdAt.substring(0, 16).replace('T',' ')}</td>
                            <td className='fourth-result' style={{color: +result.percent * 100>= result.test_desc.entry_percent ? 'green' : 'red'}}>{+result.percent * 100}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    );
}

export default HomePage;