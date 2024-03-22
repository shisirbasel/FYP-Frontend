import TradeButton from "./TradeButton";
import { SelectBookContext } from "../App";
import { sendPostRequest } from "../utils/api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, ownbook = false, trade = false, select=false}) => {
  const navigate = useNavigate();
  const [selectedBook,setSelectedBook] = useContext(SelectBookContext)

  const sendTradeRequeset = async () => {
    const formData = new FormData();
    formData.append('requested_book', selectedBook)
    formData.append('offered_book', book.id)
    console.log(formData)
    await sendPostRequest('send/traderequest', formData)
    setSelectedBook(null)
  }

    return (
        <div className="book-card">
    <div className="book-card__cover">
      <div className="book-card__book">
        <div className="book-card__book-front">
          <img className="book-card__img" src={`http://127.0.0.1:8000${book.image}`} alt="" />
        </div>
        <div className="book-card__book-back"></div>
        <div className="book-card__book-side"></div>
      </div>
    </div>
    <div className="flex w-12/12">
        <div  style={{width: '100%'}}>
            <div className="book-card__title">{book.title}</div>
            <div className="book-card__author font-semibold">{book.author}</div>
            <div className="book-card__author font-semibold">{book.user.username}</div>
        </div>
        
        {trade? (<>
          <div className="select">
            <button className="success-btn mt-20" onClick={sendTradeRequeset}>Select</button>
          </div>
        </>):(
          <>
          {!ownbook? (
          <>
            <div className="like-book">
            <span className="fas fa-heart float-right mr-4 mt-4 pb-8"></span>
            <TradeButton book={book} select={select}/>
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
