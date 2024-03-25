import { useState, useEffect, useContext } from 'react';
import { sendDeleteRequest, sendGetRequest } from '../utils/api';
import '../css/books.css';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { SearchContext, GenreContext } from '../App';
import TradeButton from './TradeButton';
import BookCard from './BookCard';

const ShowBooks = ({select=false}) => {

  const [searchParams] = useContext(SearchContext)
  const [searchGenre] = useContext(GenreContext)
  
  const [books, setBooks] = useState([]);

  const getBookData = async () => {
    let searchQuery = 'books/search';
    
    if (searchParams !== '') {
      searchQuery += `?search=${searchParams}`;
    }

    if (searchGenre.length > 0) {
      const genreQueryString = searchGenre.map(genre => `genres=${genre}`).join('&');
      searchQuery += searchParams === '' ? `?${genreQueryString}` : `&${genreQueryString}`;
    }

    const books = await sendGetRequest(searchQuery);
    setBooks(books);
  }

  useEffect(() => {
    getBookData();
  }, [searchParams, searchGenre]); 

  const handleDeleteBook = async (id) => {
    await sendDeleteRequest(`delete_book/${Number(id)}`);
    getBookData();
  };


  return (
    <div className="overflow-x-auto mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5  shadow pt-10 px-32" style={{height:'75vh', width:select? '95%': '75%'}}>

      {books.length > 0 && (
        <div className='books'>
          {books.map((book, idx) => {
            return (
              <Link key={idx} className='book'>
                <BookCard book={book} select={true}/>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowBooks