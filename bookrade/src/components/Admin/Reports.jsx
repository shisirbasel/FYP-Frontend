import { useEffect, useState } from "react";
import { sendGetRequest } from "../../utils/api";
import SuspendButton from "./SuspendButton";

const Reports = () => {
    const [reports, setReports] = useState([]);

    const fetchAllReports = async () => {
        const response = await sendGetRequest('reports');
        setReports(response);
    };

    useEffect(() => {
        fetchAllReports();
    }, []);

    return (
     <>
      <h1 className='text-3xl font-semibold mb-10'>Reports</h1>
            <ul className="space-y-6">
                {reports.map((report, index) => (
                    <li key={index} className="ring-2 ring-gray-900/5 p-4 px-8 shadow-md">
                        <h2 className="text-2xl font-bold mb-2">{report.type}</h2>
                        <div className="grid grid-cols-2 gap-2 px-2 my-5">
                            <p className="text-black text-xl font-semibold">{`Reported User: @${report.reported_user.username}`}</p>
                            <p className="text-black text-xl font-semibold text-right">{`Reported By: @${report.reported_by.username}`}</p>
                        </div>
                        <p className="text-gray-600 text-xl font-medium px-2 py-5 text-justify">{report.description}</p>
                        <SuspendButton user={report.reported_user} fetchReports={fetchAllReports}/>
                    </li>
                ))}
            </ul>
     </>
           
 
    );
};

export default Reports;
