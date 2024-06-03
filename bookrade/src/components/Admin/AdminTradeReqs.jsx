import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendGetRequest } from "../../utils/api";
import { toast } from "react-toastify";
import { Pagination } from 'antd'; // Import Ant Design Pagination

const AdminTradeReqs = () => {
    const [pages, setPages] = useState(0);
    const [tradeRequests, setTradeRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getTradeRequests = async (page) => {
        try {
            const response = await sendGetRequest(`all_traderequests?page=${page}`);
            setTradeRequests(response.results);
            setPages(Math.ceil(response.count / 10));
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getTradeRequests(currentPage);
    }, [currentPage]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-yellow-700';
            case 'Accepted':
                return 'text-green-700';
            case 'Rejected':
                return 'text-red-700';
            case 'Invalid':
                return 'text-orange-700';
            default:
                return 'text-gray-700';
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
        <h1 className='text-3xl font-semibold mb-10'>Trade Requests</h1>
        <div className="p-4">
            <div className="bg-white shadow-md rounded-md p-4 mb-4 flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                    <h3 className="text-2xl font-bold">Sender</h3>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                    <h3 className="text-2xl font-bold">Receiver</h3>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                    <h3 className="text-2xl font-bold">Offered Book</h3>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                    <h3 className="text-2xl font-bold">Requested Book</h3>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                    <h3 className="text-2xl font-bold text-right">Status</h3>
                </div>
            </div>

            {tradeRequests.map((request, index) => (
                <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4 flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                        <p className="text-2xl font-medium">{request.offered_book.user.username}</p>
                    </div>
                    
                    <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                        <p className="text-2xl font-medium">{request.requested_book.user.username}</p>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                        <p className="text-2xl font-medium">{request.offered_book.title}</p>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                        <p className="text-2xl font-medium">{request.requested_book.title}</p>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/5 px-4">
                        <p className={`text-2xl font-medium ${getStatusColor(request.status)} text-right`}>{request.status}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex justify-center mt-4">
            <Pagination 
                current={currentPage} 
                total={pages * 10} 
                pageSize={10} 
                onChange={handlePageChange} 
            />
        </div>
    </>
    );
};

export default AdminTradeReqs;
