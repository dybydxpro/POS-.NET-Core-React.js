import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import faker from 'faker';
import Services from "../Services";

import SlideBar from "./SlideBar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard(){
    const navigate = useNavigate();
    const [daily, setDaily] = useState([{
        "date": "",
        "totalSales": 0
    }]);
    const [monthly, setMonthly] = useState([{
        "month": "",
        "totalSales": 0
    }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            navigate("/login");
        }

        DailySale();
        MonthlySale();
    }, []);

    function DailySale(){
        Services.DailySales().then(({data})=>{
            setDaily(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function MonthlySale(){
        Services.MonthlySales().then(({data})=>{
            setMonthly(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    //Daily Chart
    const DailyChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Sales.',
            },
        },
    };

    const DailyChartData = {
        labels: daily.map((dt) => (dt.date).substring(0, 10)),
        datasets: [
            {
                label: 'LKR.',
                data: daily.map((dt) => dt.totalSales ),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    //Monthly Chart
    const MonthlyChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales.',
            },
        },
    };

    const MonthlyChartData = {
        labels: monthly.map((dt) => dt.month),
        datasets: [
            {
                label: 'LKR.',
                data: monthly.map((dt) => dt.totalSales ),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" style={{backgroundColor: "#4d646f"}}>
                    <SlideBar/>
                </div>
                <div className="col">
                    <div className="" style={{ backgroundColor: "#cfd8dd" }}>
                        <nav>
                            <ol className="breadcrumb p-3">
                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <div>
                        <div className="row" style={{heigt: "350px"}}>
                            <div className="col py-3 px-5 mx-4 shadow rounded">
                                <Bar 
                                    options={DailyChartOptions} 
                                    data={DailyChartData} 
                                />
                            </div>
                            <div className="col py-3 px-5 mx-4 shadow rounded">
                                <Bar 
                                    options={MonthlyChartOptions} 
                                    data={MonthlyChartData} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}