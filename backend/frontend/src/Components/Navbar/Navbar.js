import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './navbar.css';


function Navbar() {
    const location = useLocation().pathname;

    const {userInfo} = useSelector(state => state.userLogin);    

    const openMenuHandler = (e) => {
        e.preventDefault();
        const navElements = document.querySelector('.nav-blocks');
        const navMenu = document.querySelector('.nav-menu');
        navElements.classList.toggle('hidden');
        navMenu.classList.toggle('hidden');
    };
    return (
        <nav className='nav-container'>
            {userInfo ? (
                <div className="nav-blocks">
                    <Link to="/" className="btn-nav-logo"></Link>
                    
                    <div className={`nav-bl ${location === '/' ? 'active' : ''}`}>
                        <Link to='/'><h2><i className="fa-solid fa-house"></i>Главная</h2></Link>
                    </div>

                    {/* <div className={`nav-bl ${location === '/education' ? 'active' : ''}`}>
                        <Link to='/education'><h2><i className="fa-solid fa-building-columns"></i>Обучение</h2></Link>
                    </div> */}
                    
                    <div className={`nav-bl ${location.substring(0, '/tests'.length) === '/tests' ? 'active' : ''}`}>
                        <Link to='/tests'><h2><i className="fa-solid fa-file"></i>Тесты</h2></Link>
                    </div>
                    
                    {userInfo.isAdmin && <div className={`nav-bl ${location.substring(0, '/statistics'.length) === '/statistics' ? 'active' : ''}`}>
                        <Link to='statistics'><h2><i className="fa-solid fa-address-card"></i>Администратор</h2></Link>
                    </div>} 

                    <ProfileMenu/>
                    
                </div>
            ) : (
                <div className="nav-blocks">
                    <Link to="/login" className="btn-nav-logo"></Link>
                </div>
            )}
            <Link to="/"><div className="btn-nav-logo-small"></div></Link>
            <button type='button' className="nav-menu" onClick={openMenuHandler}>
                <div className="nav-menu-line first"></div>
                <div className="nav-menu-line second"></div>
                <div className="nav-menu-line third"></div>
            </button>
        </nav>
    );
}

export default Navbar;
