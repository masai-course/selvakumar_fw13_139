import React from 'react';
import {editWeightage } from '../api';

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

interface ProblemCardProps {
  problem: Problem;
  setProblems: React.Dispatch<React.SetStateAction<Problem[]>>;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, setProblems }) => {
  const handleIncreaseWeightage = async () => {
    try {
      const updatedProblem = { ...problem, weightage: problem.weightage + 1 };
      await editWeightage(updatedProblem);
      setProblems((prevProblems) =>
        prevProblems.map((p: Problem) => (p.id === updatedProblem.id ? updatedProblem : p))
      );
    } catch (error) {
      console.error('Error updating weightage:', error);
    }
  };

  const handleDecreaseWeightage = async () => {
    if (problem.weightage > 0) {
      try {
        const updatedProblem = { ...problem, weightage: problem.weightage - 1 };
        await editWeightage(updatedProblem);
        setProblems((prevProblems) =>
          prevProblems.map((p: Problem) => (p.id === updatedProblem.id ? updatedProblem : p))
        );
      } catch (error) {
        console.error('Error updating weightage:', error);
      }
    }
  };

  return (
    <div>
      <p className="input.problem-statement">{problem.problem}</p>
      <p className="input.option-a">{problem.a}</p>
      <p className="input.option-b">{problem.b}</p>
      <p className="input.option-c">{problem.c}</p>
      <p className="input.option-d">{problem.d}</p>
      <p className="select.correct-option">{problem.correct}</p>
      <p className="input.weightage">{problem.weightage}</p>
      <button onClick={handleIncreaseWeightage} data-testid="increase-weightage">
        Increase Weightage
      </button>
      <button onClick={handleDecreaseWeightage} data-testid="decrease-weightage">
        Decrease Weightage
      </button>
    </div>
  );
};

export {ProblemCard};
