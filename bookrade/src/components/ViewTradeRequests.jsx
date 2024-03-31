import React, { useCallback, useEffect, useState } from "react";
import { sendGetRequest, sendPatchRequestWithoutData, sendDeleteRequest } from "../utils/api";
import { Tabs} from 'antd';

const { TabPane } = Tabs;

const ViewTradeRequests = () => {
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    const fetchReceivedRequests = useCallback(async () => {
        try {
            const response = await sendGetRequest('get/received_traderequests');
            setReceivedRequests(response);
        } catch (error) {
            console.error('Error fetching received trade requests:', error);
        }
    }, []);

    const fetchSentRequests = useCallback(async () => {
        try {
            const response = await sendGetRequest('get/sent_traderequests');
            setSentRequests(response);
        } catch (error) {
            console.error('Error fetching sent trade requests:', error);
        }
    }, []);

    const AcceptTradeRequest = async (id) => {
        const response = await sendPatchRequestWithoutData(`accept/traderequest/${id}`)
        console.log(response)
        fetchReceivedRequests();
    }

    
    const RejectTradeRequest = async (id) => {
        const response = await sendPatchRequestWithoutData(`reject/traderequest/${id}`)
        console.log(response)
        fetchReceivedRequests();
    }

    const CancelTradeRequest = async (id) => {
        const response = await sendDeleteRequest(`delete/traderequest/${id}`)
        console.log(response)
        fetchReceivedRequests();
    }

    useEffect(() => {
        fetchReceivedRequests();
        const receivedInterval = setInterval(fetchReceivedRequests, 4000);
        fetchSentRequests();
        return () => {
            clearInterval(receivedInterval);
        };
        
    }, []);

    return (
        <div className="m-auto mt-8 bg-white rounded-md ring-2 ring-gray-900/5 w-11/12 p-8 overflow-x-auto" style={{height:'78vh'}}>
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Received Requests" key="1">
                {/* Content for received requests */}
                <ul>
                    {receivedRequests.map((request, index) => (
                        <li key={index}>
                            <div className="m-auto flex mt-8 bg-white rounded-md ring-2 shadow-md ring-gray-900/5 w-10/12 p-8">
                                <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
                                    <div className="w-3/12">
                                        <img 
                                            src={`http://127.0.0.1:8000${request.requested_book.image}`} 
                                            className="book-image" 
                                            alt={request.requested_book.title} 
                                        />
                                    </div>

                                    <div className="ml-12">
                                        <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.requested_book.title}</p>
                                        <p className="text-2xl text-gray-700 mb-4">{request.requested_book.author}</p>
                                        <p className="text-xl text-gray-700 font-semibold">@{request.requested_book.user.username}</p>

                                        <p className="text-xl text-red-700 font-bold mt-8">Your Book</p>
                                    </div>
                                </div>

                                <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
                                    <div className="w-3/12">
                                        <img 
                                            src={`http://127.0.0.1:8000${request.offered_book.image}`} 
                                            className="book-image" 
                                            alt={request.offered_book.title} 
                                        />
                                    </div>

                                    <div className="ml-12">
                                        <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.offered_book.title}</p>
                                        <p className="text-2xl text-gray-700 mb-4">{request.offered_book.author}</p>
                                        <p className="text-xl text-gray-700 font-semibold">@{request.offered_book.user.username}</p>

                                        <p className="text-xl text-red-700 font-bold mt-8">Offered Book</p>

                                    </div>
                                </div>

                                <div className="m-10 mt-4 pt-12 w-4/12 h-64 flex flex-column book-preview gap-10">
                                    <button className='cancel-btn' onClick={()=>RejectTradeRequest(request.id)}>Reject Trade Request</button>
                                    <button className='trade-btn' onClick={()=>AcceptTradeRequest(request.id)}>Accept Trade Request</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </TabPane>
            <TabPane tab="Sent Requests" key="2">
                {/* Content for sent requests */}
                <ul>
                    {sentRequests.map((request, index) => (
                        <li key={index}>
                        <div className="m-auto flex mt-8 bg-white rounded-md ring-2 shadow-md ring-gray-900/5 w-10/12 p-8">

                        <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
                                <div className="w-3/12">
                                    <img 
                                        src={`http://127.0.0.1:8000${request.offered_book.image}`} 
                                        className="book-image" 
                                        alt={request.offered_book.title} 
                                    />
                                </div>

                                <div className="ml-12">
                                    <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.offered_book.title}</p>
                                    <p className="text-2xl text-gray-700 mb-4">{request.offered_book.author}</p>
                                    <p className="text-xl text-gray-700 font-semibold">@{request.offered_book.user.username}</p>

                                    <p className="text-xl text-red-700 font-bold mt-8">Your Book</p>

                                </div>
                            </div>

                            <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
                                <div className="w-3/12">
                                    <img 
                                        src={`http://127.0.0.1:8000${request.requested_book.image}`} 
                                        className="book-image" 
                                        alt={request.requested_book.title} 
                                    />
                                </div>

                                <div className="ml-12">
                                    <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.requested_book.title}</p>
                                    <p className="text-2xl text-gray-700 mb-4">{request.requested_book.author}</p>
                                    <p className="text-xl text-gray-700 font-semibold">@{request.requested_book.user.username}</p>

                                    <p className="text-xl text-red-700 font-bold mt-8">Requested Book</p>
                                </div>
                            </div>

                            <div className="m-10 mt-4 pt-12 w-4/12 h-64 flex flex-column book-preview gap-10">
                                <div><p className="text-2xl font-bold text-black text-center" style={{marginLeft: '-20px'}}> {request.status}</p></div>
                                <button className='cancel-btn' onClick={()=>CancelTradeRequest(request.id)}>Cancel Trade Request</button>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </TabPane>
        </Tabs>
    </div>
    );
};

export default ViewTradeRequests;
