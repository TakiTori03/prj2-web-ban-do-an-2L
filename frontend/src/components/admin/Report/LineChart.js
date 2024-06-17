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

    useEffect(() => {
        const fetchData = async () => {
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
            const { data } = await axios.post("http://localhost:4000/api/v1/admin/report-revenue", props);


            if (data) {

                setAmountPerMonth({
                    labels: labels,
                    datasets: [
                        {
                            label: "Doanh thu năm " + props.year,
                            data: data.revenueByMonth,

                            borderColor: "red",
                            backgroundColor: "red",
                        },
                    ],

                });
            } else {
                toast.error("database is error");
            }
        };
        fetchData();
    }, [props]);

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


    return (
        <>

            {amountPerMonth && (
                <div className="chart-container">
                    <h2>Biểu đồ cho doanh thu </h2>
                    <Line options={options} data={amountPerMonth} />
                </div >
            )}

        </>
    );
};
export default LineChart;

