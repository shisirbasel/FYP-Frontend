import TradeButton from "./TradeButton";
import { sendGetRequest, sendPostRequest } from "../utils/api";
import { OfferBookContext } from "../App";
import { useContext, useEffect, useState } from "react";

const BookCard = ({ book, ownbook = false, trade = false, select = false }) => {

  const [liked, setLiked] = useState(false);
  const [offeredBook, setOfferedBook] = useContext(OfferBookContext);

  const selectOfferedBook = () => {
    setOfferedBook(book);
    console.log(offeredBook);
  };

  const likeBook = async () => {
    const formData = new FormData();
    formData.append('book_id',book.id)
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

  useEffect(() => {
    getLike();
  }, []);

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
          <div className="book-card__author font-semibold">
            {book.user.username}
          </div>
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
                    style={{ color: liked ? "red" : "gray" }}
                  ></span>
                  <TradeButton book={book} select={select} />
                </div>
              </>
            ) : (
              <>
                <div className="like-book">
                  <span className="fas fa-edit "></span>
                  <span className="fas fa-trash "></span>
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
