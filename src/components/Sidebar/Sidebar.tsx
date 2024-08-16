import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LiaSeedlingSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            <nav className="menu">
                <Link to="/" onClick={handleLinkClick} title='Fase 01'>
                    <LiaSeedlingSolid className='icnList'/>
                    <span className='icnText'>Fase 01</span>
                </Link>
                <Link to="/f02" onClick={handleLinkClick} title='Fase 02'>
                    <LiaSeedlingSolid className='icnList'/>
                    <span className='icnText'>Fase 02</span>
                </Link>
            </nav>            
        </div>
    );
};



export default Sidebar;
