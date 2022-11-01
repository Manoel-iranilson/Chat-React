import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from '../pages/chat';


function PrivateRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Chat />} />
            </Routes>
        </BrowserRouter>

    );
}

export default PrivateRoutes;