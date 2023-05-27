import React from 'react';
import './message.css';

export function MessageArea() {
    
    return (
        <div className='toasts'>
            
        </div>
    );
}

export function Message({color = 'blue',children}) {
    
    const notif = document.createElement('div');
    notif.classList.add('toast');    
    notif.style.color = color;
    notif.innerHTML = children;
    const messageArea = document.querySelector('.toasts');
    messageArea.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 3000);
}
