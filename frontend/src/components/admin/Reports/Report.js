import React, { Fragment, useEffect, useState } from "react";
import LineChart from "./StatisticByYear";
import PieChart from "./StatisticByMonth";

import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar";

import axios from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const years = [2022, 2023, 2024];

const Report = () => {
  const [selectedOption, setSelectedOption] = useState("null");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalProductsSold, setTotalProductsSold] = useState();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/v1/admin/report-total");

        if (data) {
          setTotalRevenue(data.totalRevenue);
          setTotalProductsSold(data.totalProductsSold);
        } else {
          toast.error("No data received from server");
        }
      } catch (error) {
        toast.error("Error fetching data from server");
      }
    };
    fetchData();
  }, [month, year, selectedOption]);

  const renderChartReport = () => {
    if (selectedOption === "revenue") {
      return (
        <div>
          <LineChart year={year} />{" "}
        </div>
      );
    } else if (selectedOption === "productCategory") {
      return (
        <div
          style={{
            height: "400px",
            width: "400px",
          }}
        >
          <PieChart month={month} year={year} />
        </div>
      );
    }
  };

  return (
    <Fragment>
      <MetaData title={"Reports"} />
      <div className="row">
        <div className="col-12 col-md-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 main-content">
          <h1 className="my-4 report-heading">Reports</h1>

          <div className="rp-container">
            <div className="report-count-container">
              <div className="rp-element-count">
                <h5>Doanh thu sản phẩm đã giao</h5>
                <span className="count-number">{totalRevenue}</span>
              </div>
              <div className="rp-element-count">
                <h5>Tổng số sản phẩm đã bán </h5>
                <span className="count-number">{totalProductsSold}</span>
              </div>
            </div>
            <div>
              <label className="radio-label">
                <input
                  style={{ marginRight: "10px" }}
                  type="radio"
                  value="revenue"
                  checked={selectedOption === "revenue"}
                  onChange={handleOptionChange}
                />
                Revenue Statistics
              </label>
              <br />
              <label className="radio-label">
                <input
                  style={{ marginRight: "10px" }}
                  type="radio"
                  value="productCategory"
                  checked={selectedOption === "productCategory"}
                  onChange={handleOptionChange}
                />
                Product Category Ratio
              </label>
            </div>
            <br />

            {selectedOption === "productCategory" ? (
              <div className="picker-container">
                <div>
                  <label className="picker-label">Select Year: </label>
                  <select value={year} onChange={handleYearChange}>
                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="picker-label">Select Month: </label>
                  <select value={month} onChange={handleMonthChange}>
                    {months.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                {renderChartReport()}
              </div>
            ) : (
              <div className="picker-container">
                <div>
                  <label className="picker-label">Select Year: </label>
                  <select value={year} onChange={handleYearChange}>
                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                {renderChartReport()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Report;
