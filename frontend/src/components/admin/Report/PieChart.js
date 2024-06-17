import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const [categoryStats, setCategoryStats] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data } = await axios.post("http://localhost:4000/api/v1/admin/report-category", props);
        if (data) {
          setCategoryStats(data.salesStats);
        } else {
          toast.error("No data received from server");
        }
      } catch (error) {
        toast.error("Error fetching data from server");
      }
    };

    fetchData();
  }, [props]); // Include props in the dependency array

  useEffect(() => {
    if (categoryStats) {
      const usedColors = new Set();

      const generateUniqueColor = () => {
        let color;
        do {
          color = '#';
          const letters = '0123456789ABCDEF';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
        } while (usedColors.has(color));
        usedColors.add(color);
        return color;
      };

      const backgroundColor = categoryStats.map(() => generateUniqueColor());

      const chartData = {
        labels: categoryStats.map((item) => item._id),
        datasets: [
          {
            label: '# of Quantity',
            data: categoryStats.map((item) => item.totalQuantitySold),
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [categoryStats]);

  return (
    <>

      {chartData && categoryStats && (
        <div>
          <h2>Thống kê tỷ lệ loại sản phẩm hàng tháng</h2>
          <Pie data={chartData} />
        </div>
      )}
    </>
  );

};

export default PieChart;
