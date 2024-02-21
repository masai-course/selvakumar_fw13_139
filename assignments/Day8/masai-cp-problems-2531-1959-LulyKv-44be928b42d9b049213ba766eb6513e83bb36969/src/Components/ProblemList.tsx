import React, { useEffect, useState } from 'react';
import {ProblemCard} from './ProblemCard';
import { getQuiz } from '../api';

// Define the Problem interface
interface Problem {
  id: number;
  problem: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
  weightage: number;
}

export const ProblemList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getQuiz();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    fetchProblems();
  }, []);
  return (
    <div data-testid="problem-list">
       {problems.map((problem: Problem) => (
        <ProblemCard key={problem.id} problem={problem} setProblems={setProblems} />
      ))}
    </div>
  );
};
