import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendGetRequest } from '../utils/api';
import Navigation from '../components/navigation';
import BookCard from '../components/BookCard'; 
const LikedBooks = () => {
  const [books, setBooks] = useState([]);

  const getLikedBooks = async () => {
    try {
      const response = await sendGetRequest('liked_books');
      setBooks(response);
    } catch (error) {
      console.error('Error fetching liked books:', error);
    }
  };

  useEffect(() => {
    getLikedBooks();
  }, []);

  return (
    <>
      <Navigation />
      <div className="overflow-x-auto mx-10 ml-16 my-10 bg-white rounded-md ring-2 ring-gray-900/5 shadow pt-10 px-32" style={{ height: '75vh', width: '95%' }}>
        {books.length > 0 && (
          <div className="books">
            {books.map((book, idx) => (
                <BookCard key={idx} book={book} />
            ))}
          </div>
        )}
        {books.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No liked books found.
          </div>
        )}
      </div>
    </>
  );
};

export default LikedBooks;
