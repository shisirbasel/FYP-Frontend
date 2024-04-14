import { useEffect, useState } from "react";
import { sendGetRequest } from "../utils/api";

const DashboardDetails = () => {
    const [details, setDetails] = useState({});

    const getCounts = async () => {
        try {
            const response = await sendGetRequest('countdetails');
            setDetails(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCounts();
    }, []);

    return (
        <div className="flex gap-32 mt-12 ml-44">
            <div className="w-3/12">
                <div className="bg-blue-800 ring-2 ring-blue-800 text-white p-4 rounded-sm shadow-md hover:shadow-2xl hover:shadow-blue-200" style={{height: '15vh'}}>
                    <h3 className="text-4xl font-bold mb-2">Books</h3>
                    <p className="text-5xl text-center m-10">{details.books}</p>
                </div>
            </div>
            <div className="w-3/12">
                <div className="bg-red-800 ring-2 ring-red-800 text-white p-4 rounded-sm shadow-md hover:shadow-2xl hover:shadow-red-200" style={{height: '15vh'}}>
                    <h3 className="text-4xl font-bold mb-2">Users</h3>
                    <p className="text-5xl text-center m-10">{details.users}</p>
                </div>
            </div>
            <div className="w-3/12">
                <div className="bg-purple-800 ring-2 ring-purple-800 text-white p-4 rounded-sm shadow-md hover:shadow-2xl hover:shadow-purple-200" style={{height: '15vh'}}>
                    <h3 className="text-4xl font-bold mb-2">Trade Requests</h3>
                    <p className="text-5xl text-center m-10">{details.traderequests}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardDetails;
