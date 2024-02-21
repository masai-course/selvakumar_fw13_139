import React from 'react';
import { VStack, Heading, Text } from '@chakra-ui/react';

const BooksCard = ({ book }) => {
  return (
    <VStack p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" data-cy="book_card">
      <Heading as="h2" size="md">{book.title}</Heading>
      <Heading as="h3" size="sm">{book.author}</Heading>
      <Heading as="h5" size="xs">{book.category}</Heading>
      <Heading as="h6" size="xs">{book.publication_date}</Heading>
      <Text>{book.isbn}</Text>
    </VStack>
  );
};

export default BooksCard;
