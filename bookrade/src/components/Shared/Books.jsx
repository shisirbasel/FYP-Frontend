import { useState, useEffect } from 'react';
import { sendGetRequest } from '../../utils/api';
import '../../css/books.css';
import BookCard from './BookCard';

const Books = ({ select = false, admin = false, ownbook = false }) => {
    const [books, setBooks] = useState([]);

    const getAllBooks = async () => {
        try {
            const booksData = await sendGetRequest('books/search'); 
            setBooks(booksData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <>
            <h1 className='text-3xl font-semibold mx-10'>Books</h1>
            <div className="flex flex-wrap gap-10 overflow-y-auto p-10 pt-5">
                {books.map((book, index) => (
                    <BookCard
                        key={index}
                        book={book}
                        select={select}
                        ownbook={ownbook}
                        getBookData={ getAllBooks }
                    />
                    
                ))}
            </div>
        </>
        
    );
};

export default Books;
