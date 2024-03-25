import BookCard from './BookCard'
import { useEffect, useState, useContext } from "react";
import { sendGetRequest } from "../utils/api";
import { Link } from 'react-router-dom';

const YourBooks = ({trade = false, select= false}) => {

  const [books, setBooks] = useState([])
  const getBooks = async() => {
    const books = await sendGetRequest('yourbooks');
    setBooks(books);
  }
  
  useEffect(()=>{
    getBooks()
  },[])

  return (
    <div className="overflow-x-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 shadow pt-10 px-20" style={{height:'75vh', width:select? '57%': '75%'}}>

    {books.length > 0 && (
      <div className='books'>
        {books.map((book, idx) => {
          return (
            <Link key={idx} className='book'>
              <BookCard book={book} ownbook={true} trade={trade}/>
            </Link>
          );
        })}
      </div>
    )}
  </div>
  )
}

export default YourBooks