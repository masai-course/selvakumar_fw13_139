import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {HomePage} from './HomePage';
import {AllProblems} from './AllProblems';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/all-problems" element={<AllProblems/>} />
    </Routes>
  );
}

export {MainRoutes};
