// Pages/HomePage.tsx
import React from 'react';
import {Navbar} from '../Components/Navbar';
import {PostList} from '../Components/PostList';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar pageName="Home Page" />
            <PostList />
        </div>
    );
};

export {HomePage};
