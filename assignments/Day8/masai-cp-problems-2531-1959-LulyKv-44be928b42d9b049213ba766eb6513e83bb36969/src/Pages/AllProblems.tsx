import React from 'react';
import {Navbar} from '../Components/Navbar';
import {ProblemList} from '../Components/ProblemList';

function AllProblems() {
  return (
    <div>
      <Navbar pageName="All Problems" />
      <ProblemList />
    </div>
  );
}

export {AllProblems};
