import React, { useEffect, useState } from 'react';
import image from "../assets/images/nodata.png"
import { sendGetRequest } from '../utils/api';
import Navigation from '../components/navigation';
import BookCard from '../components/BookCard'; 

const Recommendations = () => {

    const [books, setBooks] = useState([]);

  const getRecommendedBooks = async () => {
    try {
      const response = await sendGetRequest('recommendation');
      setBooks(response);
    } catch (error) {
      console.error('Error fetching liked books:', error);
    }
  };

  useEffect(() => {
    getRecommendedBooks();
  }, []);
  return (
    <>
        <Navigation />

      
      
            {books.length > 0 && (
            <div className="overflow-x-auto mx-10 ml-16 my-10 bg-white rounded-md ring-2 ring-gray-900/5 shadow pt-10 px-32" style={{ height: '75vh', width: '95%' }}>
                <h1 className='text-3xl font-semibold pb-10'>Recommendations</h1>

                <div className="books">
                    {books.map((book, idx) => (
                        <BookCard key={idx} book={book} />
                    ))}
                </div>
                
            </div>
            )}

            {books.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <img src={image} alt='no data' className='w-2/5'></img>
                <p className='text-5xl text-black' style={{marginTop: '-50px'}}>More Interaction is Required to have books recommended</p>
                </div>
            )}
        
    </>
  
  )
}

export default Recommendations