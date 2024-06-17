import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { toast } from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = (props) => {
    const [amountPerMonth, setAmountPerMonth] = useState(null);
    const [chartData, setChartData] = useState(null);

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Tổng doanh thu từng tháng",
            },
        },
    }

    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.post("http://localhost:4000/api/v1/admin/report-revenue", props);


            if (data.monthRevenue) {
                const array = new Array(12).fill(0);
                for (let i = 0; i < data.monthRevenue.length; i = i + 1) {
                    array[data.monthRevenue[i].month - 1] = data.monthRevenue[i].totalRevenue;
                }

                setAmountPerMonth(array);
            } else {
                toast.error("database is error");
            }
        };
        fetchData();
    }, [props]);

    useEffect(() => {
        if (amountPerMonth) {
            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Doanh thu năm " + props.year,
                        data: amountPerMonth,
                        borderColor: "red",
                        backgroundColor: "red",
                    },
                ],
            }
            setChartData(chartData);
        }
    }, [amountPerMonth, props.year])


    return (
        <>
            {amountPerMonth && chartData && (
                <div className="chart-container">
                    <h2>Biểu đồ cho doanh thu </h2>
                    <Line options={options} data={chartData} />
                </div >
            )}
        </>
    );
};
export default LineChart;