import React from 'react'
import { useState, useEffect } from 'react';

const ShowBooks = () => {

  const BASE_URl = "http://127.0.0.1:8000/api/";

  const [books, setBooks] = useState([])


  
  const fetchNoteData = () => {
    fetch(`${BASE_URl}show_books/`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBooks(data)
      })
  }

  useEffect(() => { fetchNoteData()})
    
  return (
    <div>
        {books.length > 0 && (
            <div>
                {books.map(book => (
                    <div key={book.id} className='book'> 
                    
                        <img src={`http://127.0.0.1:8000${book.image}`} alt={book.title} className='book-image' />

                        {book.title}
                        {book.author}
                        {book.user}
                    
                    
                    </div>
                ))}
            </div>
        )}
        
    </div>
  )
}

export default ShowBooks