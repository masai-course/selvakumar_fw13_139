// reducers/books/reducer.js

const initState = {
    loading: false,
    data: [],
    error: false
  };
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_LOADING':
        return {
          ...state,
          loading: true,
          error: false
        };
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: false
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          loading: false,
          error: true
        };
      default:
        throw new Error('Invalid action type');
    }
  };
  
  export {initState, reducer};
  