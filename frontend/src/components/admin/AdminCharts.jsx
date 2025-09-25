import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

// Hay que registrar los componentes que vamos a usar en Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminCharts = () => {
    const [salesData, setSalesData] = useState(null);
    const [expensesData, setExpensesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                // Pedimos los dos sets de datos al mismo tiempo
                const [salesRes, expensesRes] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/admin/charts/sales-over-time', { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://127.0.0.1:8000/api/admin/charts/expenses-by-category', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                
                const salesJson = await salesRes.json();
                const expensesJson = await expensesRes.json();

                // Procesamos los datos para que Chart.js los entienda
                setSalesData({
                    labels: salesJson.data.map(d => new Date(d.fecha).toLocaleDateString()),
                    datasets: [{
                        label: 'Ventas por Día',
                        data: salesJson.data.map(d => d.total),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }]
                });

                setExpensesData({
                    labels: expensesJson.data.map(d => d.categoria),
                    datasets: [{
                        label: 'Gastos por Categoría',
                        data: expensesJson.data.map(d => d.monto),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
                });

            } catch (error) {
                console.error("Error al cargar los datos de los gráficos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) return <Spinner message="Cargando gráficos..." />;

    return (
        <div className="admin-charts-container">
            {salesData && (
                <div className="chart-widget">
                    <h3>Evolución de Ventas</h3>
                    <Line data={salesData} />
                </div>
            )}
            {expensesData && (
                <div className="chart-widget">
                    <h3>Distribución de Gastos</h3>
                    <Bar data={expensesData} />
                </div>
            )}
        </div>
    );
};

export default AdminCharts;