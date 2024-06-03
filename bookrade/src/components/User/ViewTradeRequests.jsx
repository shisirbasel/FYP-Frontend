import React, { useCallback, useEffect, useState } from "react";
import { sendGetRequest } from "../../utils/api";
import { Tabs } from 'antd';
import ReceivedTradeRequestCard from "./ReceivedTradeRequestCard";
import SentTradeRequestCard from "./SentTradeRequestCard";
import Image from "../../assets/images/nodata.png";

const { TabPane } = Tabs;

const ViewTradeRequests = () => {

    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);

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

    const fetchRejectedRequests = useCallback(async () => {
        try {
            const response = await sendGetRequest('get/rejected_traderequests');
            setRejectedRequests(response);
        } catch (error) {
            console.error('Error fetching sent trade requests:', error);
        }
    }, []);

    const fetchAcceptedRequests = useCallback(async () => {
        try {
            const response = await sendGetRequest('get/accepted_traderequests');
            setAcceptedRequests(response);
        } catch (error) {
            console.error('Error fetching sent trade requests:', error);
        }
    }, []);

    const fetchAllRequests = useCallback(() => {
        fetchAcceptedRequests();
        fetchReceivedRequests();
        fetchRejectedRequests();
        fetchSentRequests();
    }, [fetchAcceptedRequests, fetchReceivedRequests, fetchRejectedRequests, fetchSentRequests]);

    const items = [
        {
            key: '1',
            label: 'Received Requests',
            children: (
                <ul>
                    {receivedRequests.length > 0 ? (
                        receivedRequests.map((request, index) => (
                            <ReceivedTradeRequestCard key={index} request={request} fetchAllRequests={fetchAllRequests} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600" >
                            <img src={Image} alt='no data' className='w-2/5' style={{ marginTop: '-15px' }}></img>
                            <p className='text-5xl text-black' style={{ marginTop: '-50px' }}>No Trade Requests to Respond to.</p>
                        </div>
                    )}
                </ul>
            ),
        },
        {
            key: '2',
            label: 'Sent Requests',
            children: (
                <ul>
                    {sentRequests.length > 0 ? (
                        sentRequests.map((request, index) => (
                            <SentTradeRequestCard key={index} request={request} fetchAllRequests={fetchAllRequests} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600" >
                            <img src={Image} alt='no data' className='w-2/5' style={{ marginTop: '-15px' }}></img>
                            <p className='text-5xl text-black' style={{ marginTop: '-50px' }}>No Sent Trade Requests.</p>
                        </div>
                    )}
                </ul>
            ),
        },
        {
            key: '3',
            label: 'Accepted Requests',
            children: (
                <ul>
                    {acceptedRequests.length > 0 ? (
                        acceptedRequests.map((request, index) => (
                            <SentTradeRequestCard key={index} request={request} fetchAllRequests={fetchAllRequests} whoseBook={false} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600" >
                            <img src={Image} alt='no data' className='w-2/5' style={{ marginTop: '-15px' }}></img>
                            <p className='text-5xl text-black' style={{ marginTop: '-50px' }}>No Accepted Trade Requests.</p>
                        </div>
                    )}
                </ul>
            ),
        },
        {
            key: '4',
            label: 'Rejected Requests',
            children: (
                <ul>
                    {rejectedRequests.length > 0 ? (
                        rejectedRequests.map((request, index) => (
                            <SentTradeRequestCard key={index} request={request} fetchAllRequests={fetchAllRequests} whoseBook={false} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600" >
                            <img src={Image} alt='no data' className='w-2/5' style={{ marginTop: '-15px' }}></img>
                            <p className='text-5xl text-black' style={{ marginTop: '-50px' }}>No Rejected Trade Requests.</p>
                        </div>
                    )}
                </ul>
            ),
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        fetchReceivedRequests();
        const receivedInterval = setInterval(fetchReceivedRequests, 4000);
        fetchAllRequests();
        return () => {
            clearInterval(receivedInterval);
        };

    }, [fetchAllRequests, fetchReceivedRequests]);

    return (
        <div className="m-auto mt-8 bg-white rounded-md ring-2 ring-gray-900/5 w-11/12 p-8 overflow-x-auto" style={{ height: '78vh' }}>
           <h1 className="text-2xl text-black">Trade Requests</h1>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                {items.map(item => (
                    <TabPane tab={item.label} key={item.key}>
                        {item.children}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default ViewTradeRequests;
