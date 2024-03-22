import { useCallback, useEffect, useState } from 'react';
import { sendDeleteRequest, sendGetRequest } from '../utils/api';
import { Modal } from 'antd';
import YourBooks from './YourBooks';
import { SelectBookContext } from '../App';
import { useContext } from 'react';
import RequestDetails from './RequestDetails';


const TradeButton = ({ book, select = false }) => {

  const [selectedBook,setSelectedBook] = useContext(SelectBookContext)

  const [requestStatus, setRequestStatus] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickUnsendButton = async (e) => {
    e.preventDefault();
    const response = await sendDeleteRequest(`delete/traderequest/${book.id}`)
    getTradeStatus();
  }

  const clickSendButton = (e) => {
    e.preventDefault();
    setIsModalOpen(true)
    setSelectedBook(book.id)
    closeModal();
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getTradeStatus = useCallback(async () => {
    try {
      const response = await sendGetRequest(`get/traderequest/${book.id}`);
      console.log(response)
      if (response.trade_request) {
        setRequestStatus(true);
      } else {
        setRequestStatus(false);
      }
    } catch (error) {
      console.error('Error while fetching trade request status:', error);
    }
  }, [book.id, selectedBook]);

  
  useEffect(()=>{getTradeStatus()},[selectedBook])

  return (
    <div>
      {requestStatus ? (
        <button className='unsend-btn' onClick={clickUnsendButton}>Unsend Request</button>
      ) : (
        <button className='send-btn' onClick={clickSendButton}>Send Request</button>
      )}

      <Modal title="Select Books" open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel} width={1400} centered>
        <div className='flex flex-wrap'>
          <YourBooks trade={true} select={select} />
         <RequestDetails/>
        </div>
      </Modal>
    </div>
  );
};

export default TradeButton;
