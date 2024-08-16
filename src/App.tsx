import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Reloj from './components/Reloj/Reloj'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Fase01 from './pages/Fase01';
import Fase02 from './pages/Fase02';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="reloj">
                <Reloj />
                </div>
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Fase01 />} />
                        <Route path='/f02' element={<Fase02 />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
