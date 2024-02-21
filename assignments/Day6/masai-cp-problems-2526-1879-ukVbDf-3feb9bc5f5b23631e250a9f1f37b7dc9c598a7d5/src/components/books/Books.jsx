import React, { useReducer, useState, useEffect } from 'react';
import { SimpleGrid, Select, Button } from '@chakra-ui/react';
import Loading from './Loading';
import BooksCard from './BooksCard';
import {reducer} from '../../reducers/books/reducer';
import {fetchData} from "../../utils/api"

const Books = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: false
  });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('publication_date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: 'FETCH_DATA_LOADING' });
      try {
        const data = await fetchData();
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE' });
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = state.data.filter(book => {
    if (filter === 'all') return true;
    return book.category === filter;
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortBy === 'publication_date') {
      if (sortOrder === 'asc') return new Date(a.publication_date) - new Date(b.publication_date);
      else return new Date(b.publication_date) - new Date(a.publication_date);
    } else {
      if (sortOrder === 'asc') return a.category.localeCompare(b.category);
      else return b.category.localeCompare(a.category);
    }
  });

  return (
    <div>
      <Select value={filter} onChange={e => setFilter(e.target.value)} data-cy="books_filter">
        <option value="all">All Categories</option>
        <option value="classic">Classic</option>
        <option value="dystopian">Dystopian</option>
        <option value="coming_of_age">Coming of Age</option>
        <option value="fantasy">Fantasy</option>
        <option value="political_satire">Political Satire</option>
        <option value="mystery">Mystery</option>
        <option value="epic_poem">Epic Poem</option>
      </Select>
      <Select value={sortBy} onChange={e => setSortBy(e.target.value)} data-cy="books_sort">
        <option value="publication_date">Publication Date</option>
        <option value="category">Category</option>
      </Select>
      <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)} data-cy="books_sort_order">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      <Button onClick={() => { setFilter('all'); setSortBy('publication_date'); setSortOrder('asc'); }} data-cy="reset_all">RESET ALL</Button>
      {state.loading ? (
        <Loading />
      ) : (
        <SimpleGrid columns={3} spacing={10} data-cy="books_container">
          {sortedBooks.map(book => (
            <BooksCard key={book.isbn} book={book} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default Books;
