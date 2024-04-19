import React, { useEffect, useState } from "react";
import { Tabs } from 'antd';
import { sendGetRequest } from "../utils/api";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const TradeMeets = () => {
    const [tradeMeets, setTradeMeets] = useState([]);
    const [todayMeets, setTodayMeets] = useState([]);
    const [tomorrowMeets, setTomorrowMeets] = useState([]);
    const [weekMeets, setWeekMeets] = useState([]);

    const getAllTradeMeets = async () => {
        try {
            const response = await sendGetRequest('all_trademeets');
            setTradeMeets(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getTodayTradeMeets = async () => {
        try {
            const response = await sendGetRequest('today_trademeets');
            setTodayMeets(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getTomorrowMeets = async () => {
        try {
            const response = await sendGetRequest('tomorrow_trademeets');
            setTomorrowMeets(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getWeekMeets = async () => {
        try {
            const response = await sendGetRequest('week_trademeets');
            setWeekMeets(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllTradeMeets();
        getTodayTradeMeets();
        getTomorrowMeets();
        getWeekMeets();
    }, []);

    const renderItem = (meet) => (
        <div className="flex flex-wrap justify-between items-center space-x-4">
            <p className="text-2xl font-medium w-52">{meet.sender.username}</p>
            <p className="text-2xl font-medium w-52">{meet.receiver.username}</p>
            <p className="text-2xl font-medium w-52">{meet.place}</p>
            <p className="text-2xl font-medium w-52">{meet.date}</p>
            <p className="text-2xl font-medium w-52">{meet.time}</p>
            <p className="text-2xl font-medium w-52">{meet.district}</p>
            <p className="text-2xl font-medium w-52">{meet.traderequest.requested_book.title}</p>
            <p className="text-2xl font-medium w-52">{meet.traderequest.offered_book.title}</p>
        </div>
    );

    const upcomingMeetsContent = (
        <div className="divide-y divide-gray-200">
            {todayMeets.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Today's Meets</h2>
                    <div className="flex flex-wrap justify-between items-center space-x-4  p-4">
                    <p className="text-2xl font-bold w-52">Sender</p>
                    <p className="text-2xl font-bold w-52">Receiver</p>
                    <p className="text-2xl font-bold w-52">Place</p>
                    <p className="text-2xl font-bold w-52">Date</p>
                    <p className="text-2xl font-bold w-52">Time</p>
                    <p className="text-2xl font-bold w-52">District</p>
                    <p className="text-2xl font-bold w-52">Requested Book</p>
                    <p className="text-2xl font-bold w-52">Offered Book</p>
                    </div>
                    {todayMeets.map((meet, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                            {renderItem(meet)}
                        </div>
                    ))}
                </>
            )}
            {tomorrowMeets.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Tomorrow's Meets</h2>
                    <div className="flex flex-wrap justify-between items-center space-x-4 p-4">
                    <p className="text-2xl font-bold w-52">Sender</p>
                    <p className="text-2xl font-bold w-52">Receiver</p>
                    <p className="text-2xl font-bold w-52">Place</p>
                    <p className="text-2xl font-bold w-52">Date</p>
                    <p className="text-2xl font-bold w-52">Time</p>
                    <p className="text-2xl font-bold w-52">District</p>
                    <p className="text-2xl font-bold w-52">Requested Book</p>
                    <p className="text-2xl font-bold w-52">Offered Book</p>
                    </div>
                    {tomorrowMeets.map((meet, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                            {renderItem(meet)}
                        </div>
                    ))}
                </>
            )}
            {weekMeets.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">This Week's Meets</h2>
                    <div className="flex flex-wrap justify-between items-center space-x-4  p-4">
                    <p className="text-2xl font-bold w-52">Sender</p>
                    <p className="text-2xl font-bold w-52">Receiver</p>
                    <p className="text-2xl font-bold w-52">Place</p>
                    <p className="text-2xl font-bold w-52">Date</p>
                    <p className="text-2xl font-bold w-52">Time</p>
                    <p className="text-2xl font-bold w-52">District</p>
                    <p className="text-2xl font-bold w-52">Requested Book</p>
                    <p className="text-2xl font-bold w-52">Offered Book</p>
                    </div>
                    {weekMeets.map((meet, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                            {renderItem(meet)}
                        </div>
                    ))}
                </>
            )}
            {(todayMeets.length === 0 && tomorrowMeets.length === 0 && weekMeets.length === 0) && (
                <p>No upcoming meets</p>
            )}
        </div>
    );

    const items = [
        {
            key: '1',
            label: 'Upcoming Meets',
            content: upcomingMeetsContent
        },
        {
            key: '2',
            label: 'All Meets',
            content: (
                <div className="divide-y divide-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">All Meets</h2>
                    <div className="flex flex-wrap justify-between items-center space-x-4 p-4">
                    <p className="text-2xl font-bold w-52">Sender</p>
                    <p className="text-2xl font-bold w-52">Receiver</p>
                    <p className="text-2xl font-bold w-52">Place</p>
                    <p className="text-2xl font-bold w-52">Date</p>
                    <p className="text-2xl font-bold w-52">Time</p>
                    <p className="text-2xl font-bold w-52">District</p>
                    <p className="text-2xl font-bold w-52">Requested Book</p>
                    <p className="text-2xl font-bold w-52">Offered Book</p>
                    </div>
                    {tradeMeets.length > 0 ? (
                        tradeMeets.map((meet, index) => (
                            <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                                {renderItem(meet)}
                            </div>
                        ))
                    ) : (
                        <p>No meets available</p>
                    )}
                </div>
            )
        }
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <h1 className='text-3xl font-semibold mb-3'>Trade Meets</h1>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                {items.map(item => (
                    <TabPane tab={item.label} key={item.key}>
                        {item.content}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}

export default TradeMeets;
