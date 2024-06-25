import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function RevenueMonthManagement({ year, month, onClose }) {
    const [revenueData, setRevenueData] = useState([]);



    useEffect(() => {

        if (year && month) {
            fetchRevenueDetails(year, month);
        }
    }, [year, month]);

    useEffect(() => {
        if (revenueData.length > 0) {
            drawChart();
        }
    }, [revenueData]);

    const fetchRevenueDetails = async (year, month) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/revenue/details/${month}/${year}`);
            setRevenueData(response.data);
        } catch (error) {
            console.error('Error fetching revenue details:', error);
        }
    };

    const drawChart = () => {
        const days = revenueData.map(item => item.day);
        const revenues = revenueData.map(item => item.totalRevenue);
        const ctx = document.getElementById(`revenueChart-${year}-${month}`);
        if (ctx && ctx.chart) {
            ctx.chart.destroy();
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Doanh thu hàng ngày',
                    data: revenues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const handlePrintRevenue = () => {
        fetch(`http://localhost:8080/excelRevenueMonth?year=${year}&month=${month}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `revenue_report_${year}_${month}.xlsx`;
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error downloading Excel file:', error);
                // Handle error (e.g., display error message to the user)
            });
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className="card shadow mb-4" style={{ backgroundColor: "#fff", borderRadius: "10px", width: "80%" }}>
                <div className="card-body" style={{ padding: "20px" }}>
                    <h3>Doanh thu tháng {month}/{year}</h3>
                    {revenueData.length > 0 && (
                        <div className="chart-bar" style={{ margin: "20px 0", width: "100%" }}>
                            <canvas id={`revenueChart-${year}-${month}`} style={{ width: "100%" }}></canvas>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            onClick={onClose}
                            className="btn btn-primary"
                            style={{ width: "45%" }}
                        >
                            <i className="fas fa-undo fa-sm text-white-50"></i> Trở lại
                        </button>
                        <button
                            onClick={handlePrintRevenue}
                            className="btn btn-primary"
                            style={{ width: "45%" }}
                        >
                            <i className="fas fa-download fa-sm text-white-50"></i> Download Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RevenueMonthManagement;
