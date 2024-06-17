import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const BackGroundColor = {
  'Food': 'rgba(255, 0, 0,0.7)',
  'Drink': 'rgba(0, 128, 0,0.7)',
  'Vege': 'rgba(0, 0, 255,0.7)',
  'Cakes': 'rgba(255, 255, 0,0.7)',
  'Dessert': 'rgba(255, 165, 0,0.7)',
  'Homemade': 'rgba(128, 0, 128,0.7)',
  'StreetFood': 'rgba(255, 192, 203,0.7)',
  'Pizza/Burger': 'rgba(165, 42, 42,0.7)',
  'Chicken': 'rgba(128, 128, 128,0.7)',
  'Hotpot': 'rgba(0, 255, 255,0.7)',
  'Shushi': 'rgba(0, 255, 0,0.7)',
  'Noodles': 'rgba(75, 0, 130,0.7)',
  'RiceBox': 'rgba(255, 255, 224,0.7)'
}
const BolderColor = {
  'Food': 'rgba(255, 0, 0, 1)',
  'Drink': 'rgba(0, 128, 0,1)',
  'Vege': 'rgba(0, 0, 255,1)',
  'Cakes': 'rgba(255, 255, 0,1)',
  'Dessert': 'rgba(255, 165, 0,1)',
  'Homemade': 'rgba(128, 0, 128,1)',
  'StreetFood': 'rgba(255, 192, 203,1)',
  'Pizza/Burger': 'rgba(165, 42, 42,1)',
  'Chicken': 'rgba(128, 128, 128,1)',
  'Hotpot': 'rgba(0, 255, 255,1)',
  'Shushi': 'rgba(0, 255, 0,1)',
  'Noodles': 'rgba(75, 0, 130,1)',
  'RiceBox': 'rgba(255, 255, 224,1)'
}

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

      const backgroundColor = categoryStats.map((item) => BackGroundColor[item._id]);
      const bolderColor = categoryStats.map((item) => BolderColor[item._id]);

      const chartData = {
        labels: categoryStats.map((item) => item._id),
        datasets: [
          {
            label: '# of Quantity',
            data: categoryStats.map((item) => item.totalQuantitySold),
            backgroundColor: backgroundColor,
            borderColor: bolderColor,
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

        <div className="chart-container">
          <h2>Thống kê tỷ lệ loại sản phẩm hàng tháng</h2>
          <Doughnut data={chartData} />
        </div>
      )}
    </>
  );

};

export default PieChart;
