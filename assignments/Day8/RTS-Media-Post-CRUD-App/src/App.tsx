// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {HomePage} from './Pages/HomePage';
import {AddPost} from './Pages/AddPost';

const App: React.FC = () => {
    return (
        <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/add-post" element={<AddPost/>} />
        </Routes>
    );
};

export default App;
