import BookCard from './BookCard'
import image from "../assets/images/nodata.png"
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
            <div key={idx} className='book'>
              <BookCard book={book} ownbook={true} trade={trade} getBookData={getBooks}/>
            </div>
          );
        })}
      </div>
    )}

  {books.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-600" style={{marginTop: '-50px'}}>
          <img src={image} alt='no data' className='w-3/5'></img>
          <p className='text-5xl text-black' style={{marginTop: '-50px'}}>It seems you haven't posted any books yet.</p>
        </div>
      )}

  </div>
  )
}

export default YourBooks