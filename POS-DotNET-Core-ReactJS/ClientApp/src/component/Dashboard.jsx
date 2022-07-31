import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
//import faker from 'faker';
import Services from "../Services";

import SlideBar from "./SlideBar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
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
    const [dailyBill, setDailyBill] = useState([{
        "date": "",
        "totalSales": 0
    }]);
    const [monthlyBill, setMonthlyBill] = useState([{
        "month": "",
        "totalSales": 0
    }]);
    const [user, setUser] = useState([{
        "type": "",
        "noOfUsers": 0
    }]);
    const [item, setItem] = useState(0);
    const [supplier, setSupplier] = useState(0);
    const [grn, setGrn] = useState(0);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            navigate("/login");
        }

        DailySale();
        MonthlySale();
        UserCount();
        ItemCount();
        SupplierCount();
        GRNCount();
        DailyBillCount();
        MonthlyBillCount();
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

    function UserCount(){
        Services.UserCounts().then(({data})=>{
            setUser(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function ItemCount(){
        Services.ItemCounts().then(({data})=>{
            setItem(Number(data));
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function SupplierCount(){
        Services.SupplierCounts().then(({data})=>{
            setSupplier(Number(data));
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function GRNCount(){
        Services.GRNCounts().then(({data})=>{
            setGrn(Number(data));
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function DailyBillCount(){
        Services.DailyBillCounts().then(({data})=>{
            setDailyBill(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function MonthlyBillCount(){
        Services.MonthlyBillCounts().then(({data})=>{
            setMonthlyBill(data);
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    //Users Chart
    const UsersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Users Count.',
            },
        },
    };

    const UsersChartData = {
        labels: user.map((dt) => dt.type),
        datasets: [
            {
                label: '# of Votes',
                data: user.map((dt) => dt.noOfUsers),
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Items Chart
    const ItemsChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Items Count.',
            },
        },
    };

    const ItemsChartData = {
        labels: ["No. of Items"],
        datasets: [
            {
                label: '# of Votes',
                data: [item],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Suppliers Chart
    const SuppliersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Suppliers Count.',
            },
        },
    };
    
    const SuppliersChartData = {
        labels: ["No. of Suppliers"],
        datasets: [
            {
                label: '# of Votes',
                data: [supplier],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Suppliers Chart
    const GrnsChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'GRN Count.',
            },
        },
    };
    
    const GrnsChartData = {
        labels: ["No. of GRN"],
        datasets: [
            {
                label: '# of Votes',
                data: [grn],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Daily Bill Chart
    const DailyBillChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Bill Count.',
            },
        },
    };

    const DailyBillChartData = {
        labels: dailyBill.map((dt) => (dt.date).substring(0, 10)),
        datasets: [
            {
                label: 'LKR.',
                data: dailyBill.map((dt) => dt.totalSales ),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
          
            },
        ],
    };

    //Monthly Bill Chart
    const MonthlyBillChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Bill Count.',
            },
        },
    };

    const MonthlyBillChartData = {
        labels: monthlyBill.map((dt) => dt.month),
        datasets: [
            {
                label: 'LKR.',
                data: monthlyBill.map((dt) => dt.totalSales ),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
        ],
    };


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" style={{backgroundColor: "#4d646f", position: "relative"}}>
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

                    <div className="">
                        <div className="row py-2" style={{heigt: "450px", margin: "auto"}}>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "48.3%"}}>
                                <Bar options={DailyChartOptions} data={DailyChartData} />
                            </div>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "48.3%"}}>
                                <Bar options={MonthlyChartOptions} data={MonthlyChartData} />
                            </div>
                        </div>

                        <div className="row py-2" style={{heigt: "450px", margin: "auto"}}>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "23.7%"}}>
                                <Doughnut options={UsersChartOptions} data={UsersChartData} />
                            </div>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "23.7%"}}>
                                <Doughnut options={ItemsChartOptions} data={ItemsChartData} />
                            </div>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "23.7%"}}>
                                <Doughnut options={SuppliersChartOptions} data={SuppliersChartData} />
                            </div>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "23.7%"}}>
                                <Doughnut options={GrnsChartOptions} data={GrnsChartData} />
                            </div>
                        </div>

                        <div className="row py-2" style={{heigt: "450px", margin: "auto"}}>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "48.3%"}}>
                                <Line options={DailyBillChartOptions} data={DailyBillChartData} />
                            </div>
                            <div className="col py-3 px-2 mx-2 shadow rounded" style={{maxWidth: "48.3%"}}>
                                <Line options={MonthlyBillChartOptions} data={MonthlyBillChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}