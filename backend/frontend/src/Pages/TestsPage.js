import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';

import { listTests } from '../Actions/TestActions';
import { getUserProfile } from '../Actions/UserActions';
import './testsPage.css';

const TestsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error, tests} = useSelector(state => state.testList);
    const {userInfo} = useSelector(state => state.userLogin);
    const {profileInfo, loading:loadingProfile, error:errorProfile, success} = useSelector(state => state.userProfile);
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        dispatch(listTests());
        if (!success) {
            dispatch(getUserProfile());
        }        
    }, [dispatch, userInfo])

    return (
        loading || !success ? <Spinner/> : !error && (
            <table className='linkRow'>                
                <caption><strong>Корпоративные тесты</strong></caption>
                <thead>
                    <tr>
                        <th className='first'>№</th>
                        <th className='second'>Название Теста</th>
                        <th className='third'>Количество вопросов</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.filter(test => test.position === profileInfo.profile.position.id).map((test, i) => (                        
                        <tr key={test.id}>
                            <td className='first'><Link to={`/tests/${test.id}`} className='link'># {i + 1}.</Link></td>
                            <td className='second'><Link to={`/tests/${test.id}`} className='link'>{test.test}</Link></td>
                            <td className='third'><Link to={`/tests/${test.id}`} className='link'>{test.entry_questions}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    )
        
}

export default TestsPage;