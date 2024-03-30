import React, { useEffect, useState } from "react";
import { sendGetRequest } from "../utils/api";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MonthChart = () => {
    const [chartData, setChartData] = useState({});

    const getChartDetails = async () => {
        try {
            const response = await sendGetRequest("top_month");
            setChartData(response);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    useEffect(() => {
        getChartDetails();
    }, []);

    const renderChart = () => {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Trade Requests by Month",
                fontSize: 16,
            },
            axisY: {
                includeZero: true
            },
            data: [{
                type: "column",
                dataPoints: Object.entries(chartData).map(([month, count]) => ({ label: month, y: count }))
            }]
        };

        return <CanvasJSChart options={options} />;
    };

    return (
        <div className="w-5/12 shadow-md p-16 ring-2 ring-gray-900/5 bg-white">
            {Object.keys(chartData).length > 0 ? renderChart() : <div>Loading...</div>}
        </div>
    );
};

export default MonthChart;
