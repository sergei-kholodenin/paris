import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../Actions/UserActions';

function ProfileMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLogin);

    const toggleHandler = () => {
        const movingBlock = document.querySelector('.moving-block');
        const btns = document.querySelectorAll('.menu-btn');
        movingBlock.classList.toggle('active');
        btns.forEach(btn => btn.classList.toggle('active'));
    }
    return (
    
        <div                 
            onClick={toggleHandler}
            className="nav-bl toggle-btn"
        >                       
            <h2><i className="fa-solid fa-user"></i></h2>            
            <div className="moving-block">
                <div className="menu-btn"><h2>{userInfo.username}</h2></div>                
                <div 
                    className="menu-btn" 
                    onClick={() => navigate('/profile')}
                >Профайл</div>
                <div 
                    className="menu-btn" 
                    onClick={() => dispatch(logoutUser())}
                >Выйти</div>
            </div>       
        </div>
            
     
    );
}

export default ProfileMenu;