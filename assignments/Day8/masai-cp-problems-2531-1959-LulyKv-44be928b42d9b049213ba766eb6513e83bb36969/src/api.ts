const url = `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}`;

interface Problem {
    problem: string;
    a: string;
    b: string;
    c: string;
    d: string;
    correct: string;
    weightage: number;
  }
  

export const postQuiz = async (problemData: Problem) => {
    try {
      const response = await fetch(`${url}/quizes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(problemData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error adding problem');
    }
  };

export const getQuiz = async () => {
    try {
      const response = await fetch(`${url}/quizes`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching problems');
    }
  };
  

export const editWeightage = async (updatedProblem: Problem) => {
    try {
      const response = await fetch(`${url}/quizes/${updatedProblem}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProblem)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error updating problem');
    }
  };
