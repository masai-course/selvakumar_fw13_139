import React from 'react';
import { useState } from 'react';
import { postQuiz } from '../api';

const AddQuiz = () => {
  const [formData, setFormData] = useState({
    problem: '',
    a: '',
    b: '',
    c: '',
    d: '',
    correct: '',
    weightage: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postQuiz(formData);
      // Clear form after successful submission
      setFormData({
        problem: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: '',
        weightage: 0
      });
    } catch (error) {
      console.error('Error adding problem:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="problem" value={formData.problem} onChange={handleChange} className="input.problem-statement" />
      <input type="text" name="a" value={formData.a} onChange={handleChange} className="input.option-a" />
      <input type="text" name="b" value={formData.b} onChange={handleChange} className="input.option-b" />
      <input type="text" name="c" value={formData.c} onChange={handleChange} className="input.option-c" />
      <input type="text" name="d" value={formData.d} onChange={handleChange} className="input.option-d" />
      <select name="correct" value={formData.correct} onChange={handleChange} className="select.correct-option">
        <option value="">Select Correct Option</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
      </select>
      <input type="number" name="weightage" value={formData.weightage} onChange={handleChange} className="input.weightage" />
      <button type="submit" className="button.submit-form">Submit</button>
    </form>
  );
};

export {AddQuiz};
