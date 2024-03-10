import { useState, useEffect } from 'react';
import { sendDeleteRequest, sendGetRequest } from '../utils/api';
import '../css/books.css';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/user';
import { Modal } from 'antd';

const ShowBooks = () => {
  const isAdmin = getUser();
  const [books, setBooks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getBookData = async () => {
    const books = await sendGetRequest('show_books');
    setBooks(books);
  };

  useEffect(() => {
    getBookData();
  }, []); 

  const handleDeleteBook = async (id) => {
    await sendDeleteRequest(`delete_book/${Number(id)}`);
    getBookData();
    setIsDeleteModalOpen(false) 
  };

  const handleUpdateBook = (id) =>{
    console.log(id)
  }

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  return (
    <div>
      {books.length > 0 && (
        <div className='books'>
          {books.map((book, idx) => {
            return (
              <Link key={idx} className='book'>
                {book.image ? (
                  <div className="image">
                    <img src={`http://127.0.0.1:8000${book.image}`} alt={book.title} className='book-image' />
                  </div>
                ) : (
                  <div>Loading..</div>
                )}
                <div className="book_details">
                  <div className="text">
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.user.username}</p>
                  </div>
                  <div className="actions">
                    {!isAdmin ? (
                      <>
                        <span className='fas fa-heart' />
                        <span className='fas fa-message' />
                      </>
                    ) : (
                      <>
                        <span className='fas fa-trash' onClick={showDeleteModal} />
                        <span className='fas fa-edit' onClick={showUpdateModal}/>
                      </>
                    )}
                  </div>
                </div>
                <Modal title="Delete Book" open={isDeleteModalOpen} onOk={() => handleDeleteBook(book.id)} onCancel={handleCancel}>
                  <h3>Are you sure you want to delete this book?</h3>
                </Modal>

                <Modal title="Edit Book" open={isUpdateModalOpen} onOk={() => handleUpdateBook(book.id)} onCancel={handleCancel}>
                <form >
                    <div className='image'>
                    <h1 className='form-title'>Upload a Book</h1>
                      <label htmlFor='image-input'>
                        {/* <img src={image} id="image" alt='' /> */}
                      </label>
                      <input
                        type='file'
                        accept='image/jpeg,image/jpg,image/png'
                        id='image-input'
                        // onChange={handleImageChange}
                      />
                    </div>
                    <div className='form'>
                      <div className='form-content'>
                      <label htmlFor="title">Title:</label><br />
                            <input
                              type="text"
                              name="title"
                              id="title"
                              // onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                    <label htmlFor="author">Author:</label><br />
                            <input
                              type="text"
                              name="author"
                              id="author"
                              // onChange={e => setFormData({ ...formData, author: e.target.value })}
                            />
                          <button className='button' >Upload</button>
                    </div>
                      </div>
                  </form>
                </Modal>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
