import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';

import Spinner from '../Components/Spinner/Spinner';

import { getStoresInfo} from '../Actions/AdminActions';
import { GET_LIST_USER_RESULTS_RESET } from '../Constants/AdminConstants';
import './statisticsPage.css'

function StatisticsPage() {
    const [numTests, setNumTests] = useState('');
    const [numStoreTests, setNumStoreTests] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, error, storesList} = useSelector(state => state.storesInfo);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        }
        if (!storesList) {
            dispatch(getStoresInfo());            
        }
        
        
    }, [userInfo, storesList]);

    useEffect(() => {
        if (storesList && storesList !== [] && !numTests && !loading) {
            if (storesList[0]) {
            const allPos = storesList[0].positions;
            let positions = {};
            allPos.forEach(pos => {
                positions[pos.name] = pos.tests.map(test => test.id);
            }); 
            let userPos = []
            let storesPos = []
            storesList.forEach(store => {
                let oneUser = []                
                let storePos = []
                store.users.forEach(user => {
                    let pos = {}
                    pos[user.position.name] = positions[user.position.name];
                    pos[user.position.name] = pos[user.position.name].map(testId => user.results.find(result => result.test === testId && +result.percent * 100 > result.test_desc.entry_percent) ? 1 : 0);
                    storePos = [...storePos, ...pos[user.position.name]]
                    oneUser.push(pos);                  
                    
                });
                storesPos.push(storePos);
                userPos.push(oneUser);
            });

            setNumTests(userPos);
            setNumStoreTests(storesPos);           
        }            
        }
    }, [storesList, loading, numTests]);

    const searchTargetHandler = (search) => {
        
        const choice = document.querySelector('#search');
        if (choice.value === 'stores') {
            const targets = document.querySelectorAll('.target');
            const targetsName = document.querySelectorAll('.targetName');
            const posName = document.querySelectorAll('.posTarget');
            posName.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            targetsName.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            targets.forEach(target => {
                if (target.innerText.toLowerCase().includes(search.toLowerCase())) {
                    target.parentElement.parentElement.classList.remove('hide');
                } else {
                    target.parentElement.parentElement.classList.add('hide');
                }
            })
        } else if (choice.value === 'employees') {
            const targets = document.querySelectorAll('.target');
            const targetsName = document.querySelectorAll('.targetName');
            const posName = document.querySelectorAll('.posTarget');
            posName.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            targets.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            targetsName.forEach(target => {
                if (target.innerText.toLowerCase().includes(search.toLowerCase())) {
                    target.parentElement.parentElement.classList.remove('hide');
                } else {
                    target.parentElement.parentElement.classList.add('hide');
                }
            })
        } else  {
            const targets = document.querySelectorAll('.target');
            const targetsName = document.querySelectorAll('.targetName');
            const posName = document.querySelectorAll('.posTarget');
            targets.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            targetsName.forEach(target => target.parentElement.parentElement.classList.remove('hide'));
            posName.forEach(target => {
                if (target.innerText.toLowerCase().includes(search.toLowerCase())) {
                    target.parentElement.parentElement.classList.remove('hide');
                } else {
                    target.parentElement.parentElement.classList.add('hide');
                }
            })
        }  
            
    }
    return (
        loading || !storesList ? <Spinner/> :
        (<div>
            <div className='nav-search'>
                <input 
                    placeholder='Поиск'
                    onChange={(e) => searchTargetHandler(e.target.value)}
                />
                <select className="select" id="search">
                    <option value="stores" key="stores" selected>магазины</option>
                    <option value="employees" key="employees">сотрудники</option>
                    <option value="position" key="position">должность</option>
                </select>
            </div>
            <h4 className='label-create'>СОЗДАНИЕ/РЕДАКТИРОВАНИЕ:</h4>
            <div className="create-btns">
                <button onClick={() => navigate('/statistics/stores/')}>Магазин</button>
                <button onClick={() => navigate('/statistics/users/')}>Сотрудник</button>
                <button onClick={() => navigate('/statistics/positions/')}>Должность</button>
                <button onClick={() => navigate('/statistics/tests/')}>Тест</button>
            </div>
            <table className='linkRow'>                
                <caption><strong>Информация по магазинам</strong></caption>
                <thead>
                    <tr>
                        <th className='first-stores'>№</th>
                        <th className='second-stores'>Магазин <button style={{backgroundColor: 'white', width: '6rem', color: 'black'}} onClick={() => {
                            dispatch(getStoresInfo());
                            setNumTests('');                            
                        }}>обновить</button></th>
                        <th className='third-stores'>Кол-во сотрудников</th>
                        <th className='fourth-stores'>% Сданных тестов</th>
                    </tr>
                </thead>
                <>
                    {storesList && storesList.map((store, i) => (
                        <tbody key={store.name}>                        
                        <tr style={{backgroundColor: 'rgba(0,0,0,.4)'}}>
                            <th className='first-stores'># {i + 1}.</th>
                            <th className='second-stores target'>{store.name}</th>
                            <th className='third-stores'>{store.users.length}</th>
                            <th className='fourth-stores'>{numStoreTests ? (numStoreTests[i].reduce((a,b)=>a+b,0)/numStoreTests[i].length * 100).toFixed(0) : 'na'}%</th>
                           
                        </tr>
                        {store.users.map((user, j) => (
                            <tr key={user.email}>
                                <td className='first-stores'>
                                    <Link 
                                        to={`/statistics/users/results/${user.user_id}`}
                                        className='link' 
                                        onClick={() => dispatch({type:GET_LIST_USER_RESULTS_RESET})}
                                    ># {j + 1}.</Link>
                                </td>
                                <td className='second-stores'>
                                    <Link 
                                        to={`/statistics/users/results/${user.user_id}`}
                                        className='link targetName' 
                                        onClick={() => dispatch({type:GET_LIST_USER_RESULTS_RESET})}
                                    >{`${user.first_name ? user.first_name: ''} ${user.second_name ? user.second_name: ''} ${user.last_name ? user.last_name: ''}`}</Link>
                                </td>
                                <td className='third-stores'>
                                    <Link 
                                        to={`/statistics/users/results/${user.user_id}`}
                                        className='link  posTarget'
                                        onClick={() => dispatch({type:GET_LIST_USER_RESULTS_RESET})}
                                    >{user.position.name}</Link>
                                </td>

                                <td className='fourth-stores'>{ numTests ? numTests[i][j][user.position.name].reduce((a,b) => a+b, 0) : 0}
                                    /{numTests ? numTests[i][j][user.position.name].length : 0}</td>

                            </tr>
                        ))}
                        </tbody>
                    ))}
                </>
            </table>
            
        </div>)
    );
}

export default StatisticsPage;