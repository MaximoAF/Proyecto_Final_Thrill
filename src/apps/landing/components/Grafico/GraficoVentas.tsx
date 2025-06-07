'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos de ejemplo: ventas mensuales
const sales = [
  { mes: 'Ene', ventas: 400 },
  { mes: 'Feb', ventas: 300 },
  { mes: 'Mar', ventas: 500 },
  { mes: 'Abr', ventas: 700 },
  { mes: 'May', ventas: 600 },
  { mes: 'Jun', ventas: 800 },
];

export const GraficoVentas = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
