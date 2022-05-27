import React, { useContext } from 'react';
import './Navbar.css';
import UserContext from '../../context';

function Navbar() {

    const { logout, isLogin } = useContext(UserContext)

    return (
    
    <div className='navbar-wrapper'>
        
        <div className="navbar">
            <h1>Email Book</h1>
            <div className='navbar-btns'>
                { isLogin ?
                    <a href='/login' className='btn btn-h' onClick={logout}>Выйти</a> :
                    ''
                }
            </div>
        </div>
    </div>
    );
}

export default Navbar;