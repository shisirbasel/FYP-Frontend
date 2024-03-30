import { useEffect, useState } from "react";
import { sendGetRequest } from "../utils/api";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BooksChart = () => {
    const [bookDistribution, setBookDistribution] = useState({});

    const getBookDistribution = async () => {
        try {
            const response = await sendGetRequest("books_distribution");
            setBookDistribution(response);
        } catch (error) {
            console.error("Error fetching book distribution data:", error);
        }
    };

    useEffect(() => {
        getBookDistribution();
    }, []);

    const renderChart = () => {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Book Distribution by Genre",
                fontSize: 16,
            },
            data: [{
                type: "pie",
                startAngle: -90,
                indexLabel: "{label}: {y}%",
                dataPoints: Object.entries(bookDistribution).map(([genre, count]) => ({ y: count, label: genre }))
            }]
        };

        return <CanvasJSChart options={options} />;
    };

    return (
        <div className="w-5/12 shadow-md p-16 ring-2 ring-gray-900/5 bg-white">
            {Object.keys(bookDistribution).length > 0 ? renderChart() : <div>Loading...</div>}
        </div>
    );
};

export default BooksChart;
