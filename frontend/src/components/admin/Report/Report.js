import React, { Fragment, useEffect, useState } from 'react';
import LineChart from './LineChart';
import PieChart from './PieChart';

import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

const months = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

const years = [2023, 2024, 2025, 2026];

const Report = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2024);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const renderChartReport = () => {
        if (selectedOption === 'revenue') {
            return <LineChart year={year} />;
        } else if (selectedOption === 'productCategory') {
            return <PieChart month={month} year={year} />;
        }
    };

    return (
        <Fragment>
            <MetaData title={'Reports'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Reports</h1>

                    <h1>Statistics Selection</h1>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="revenue"
                                checked={selectedOption === 'revenue'}
                                onChange={handleOptionChange}
                            />
                            Revenue Statistics
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                value="productCategory"
                                checked={selectedOption === 'productCategory'}
                                onChange={handleOptionChange}
                            />
                            Product Category Ratio
                        </label>
                    </div>
                    <br />

                    {selectedOption && (
                        <div>
                            <div className="year-picker">
                                <label>Select Year: </label>
                                <select value={year} onChange={handleYearChange}>
                                    {years.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedOption === 'productCategory' && (
                                <div className="month-picker">
                                    <label>Select Month: </label>
                                    <select value={month} onChange={handleMonthChange}>
                                        {months.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="rp-chart-container">
                                {selectedOption === 'revenue' ? (
                                    <LineChart year={year} />
                                ) : (
                                    <PieChart month={month} year={year} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Report;
