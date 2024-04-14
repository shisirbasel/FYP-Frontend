import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import YourBooks from './YourBooks';
import RequestDetails from './RequestDetails';
import { RequestBookContext, OfferBookContext } from "../App";
import { useContext } from "react";
import { sendPostRequest, sendGetRequest, sendDeleteRequest } from '../utils/api';
import {  toast } from 'react-toastify';


const TradeButton = ({ book, select = false, getBookData }) => {

  const [requestStatus, setRequestStatus] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [requestedBook, setRequestedBook] = useContext(RequestBookContext)
  const [offeredBook, setOfferedBook] = useContext(OfferBookContext)

  const clickUnsendButton = async (e) => {
    e.preventDefault();
    const response = await sendDeleteRequest(`delete/traderequest/${book.id}`)
    getTradeStatus();
    getBookData();
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setRequestedBook({})
    setOfferedBook({})
  };

  const selectRequestedBook = () => {
    setRequestedBook(book)
    setIsModalOpen(true)
  }

  const getTradeStatus = useCallback(async () => {
    try {
      const response = await sendGetRequest(`get/traderequest/${book.id}`);
      if (response.trade_request) {
        setRequestStatus(true);
      } else {
        setRequestStatus(false);
      }
    } catch (error) {
      console.error('Error while fetching trade request status:', error);
    }
  }, [book.id, offeredBook, requestedBook]);

  useEffect(()=>{getTradeStatus()},[])

  const sendTradeRequeset = async () => {
    const formData = new FormData();
    formData.append('requested_book', requestedBook.id)
    formData.append('offered_book', offeredBook.id)
    console.log(formData)
    await sendPostRequest('send/traderequest', formData)
    toast.success("Trade Request Sent")
    setRequestedBook({})
    setOfferedBook({})
    getTradeStatus()
    setIsModalOpen(false)
    getBookData();
  }

  return (
    <div>
      {requestStatus ? (
        <button className='unsend-btn' onClick={clickUnsendButton}>Unsend Request</button>
      ) : (
        <button className='send-btn' onClick={selectRequestedBook}>Send Request</button>
      )}

      <Modal title="Select Your Book To Trade" open={isModalOpen} footer={false} onCancel={handleCancel} width={1400} centered>
        <div className='flex'>
          <YourBooks trade={true} select={select} />
          <RequestDetails/>
          
        </div>
        <div className='flex gap-20	ml-28'>

            <button className='cancel-btn' onClick={handleCancel}>Cancel</button>

            <button className='trade-btn' onClick={sendTradeRequeset}>Send Trade Request</button>
        </div>
      </Modal>
    </div>
  );
};

export default TradeButton;
