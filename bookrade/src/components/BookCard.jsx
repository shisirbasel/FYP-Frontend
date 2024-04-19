import TradeButton from "./TradeButton";
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from "../utils/api";
import { OfferBookContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import UpdateBook from "./UpdateBook";
import { Link } from "react-router-dom";

const BookCard = ({ book, ownbook = false, trade = false, select = false, getBookData}) => {

  const getGenres = async () => {
    try {
      const response = await sendGetRequest('genres');
      const formattedGenres = response.map(genre => ({ label: genre.name, value: genre.id }));
      setGenres(formattedGenres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };


  const [liked, setLiked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offeredBook, setOfferedBook] = useContext(OfferBookContext);

  const selectOfferedBook = () => {
    setOfferedBook(book);
    console.log(offeredBook);
  };

  const likeBook = async () => {
    const formData = new FormData();
    formData.append("book_id", book.id);
    const response = await sendPostRequest("like", formData);
    getLike();
  };

  const getLike = async () => {
    try {
      const response = await sendGetRequest(`check_like/${book.id}`);
      setLiked(response.liked);
    } catch (error) {
      console.error("Error checking like:", error);
    }
  };
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
    getLike();
    setSelectedGenre(book.genre);
  }, []);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteBook = async (id) => {
    try{
      await sendDeleteRequest(`delete_book/${id}`)
      getBookData();
    }catch(error){
        console.log(error)
    }
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="book-card">
      <div className="book-card__cover">
        <div className="book-card__book">
          <div className="book-card__book-front">
            <img
              className="book-card__img"
              src={`http://127.0.0.1:8000${book.image}`}
              alt=""
            />
            
          </div>
          <div className="book-card__book-back"></div>
          <div className="book-card__book-side"></div>
        </div>
      </div>
      <div className="flex w-12/12">
        <div style={{ width: "100%" }}>
          <div className="book-card__title">{book.title}</div>
          <div className="book-card__author font-semibold">{book.author}</div>
          <Link to={`/user/${book.user.username}`} className="font-extrabold">
            @{book.user.username}
          </Link>

          <br />
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 mt-2 text-lg font-semibold text-green-700">
                {book.genre.name}
          </span>
         
        </div>

        {trade ? (
          <div className="select">
            <button className="success-btn mt-20" onClick={selectOfferedBook}>
              Select
            </button>
          </div>
        ) : (
          <>
            {!ownbook ? (
              <>
                <div className="like-book">
                  <span
                    className="fas fa-heart float-right mr-4 mt-4 pb-8"
                    onClick={likeBook}
                    style={{ color: liked ? "rgb(187, 35, 35)" : "gray" }}
                  ></span>
                  <TradeButton book={book} select={select} getBookData={getBookData}/>
                </div>
              </>
            ) : (
              <>
                <div className="like-book">
                  <span
                    className="fas fa-edit"
                    onClick={handleEditModalOpen}
                  ></span>
                  <span
                    className="fas fa-trash"
                    onClick={handleDeleteModalOpen}
                  ></span>
                            
                <Modal
                  title="Edit Book Details"
                  open={isEditModalOpen}
                  onOk={handleEditModalClose}
                  onCancel={handleEditModalClose}
                  okText="Save"
                  footer={false}
                  width={1100} centered
                  okButtonProps={{ style: { backgroundColor: 'green', width: "80px" } }}
                >
                    <UpdateBook book={book} closeModal={handleEditModalClose} getBooks={getBookData} />

                </Modal>

                <Modal
                  title="Delete Book"
                  open={isDeleteModalOpen}
                  onOk={()=>handleDeleteBook(book.id)}
                  onCancel={handleDeleteModalClose}
                  okText= "Delete"
                  okButtonProps={{ style: { backgroundColor: 'red', width: "80px" }}}
                >
                  Are you sure you want to delete this book?
                </Modal>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
