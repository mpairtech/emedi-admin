import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getAllOrders } from '../../apiCalls/orders';
import { useEffect, useState } from 'react';


const COLORS = ['#0088FE', '#00C49F'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BuyerProfilePieChart = () => {
  const [data, setData] = useState([]);

  const getAllOrderData = async () => {

    const data = await getAllOrders();
    // console.log(data.orders);
    setData(data.orders)
  }

  useEffect(() => {

    getAllOrderData();
  }
    , [])

    
    const totalOrders = data.length;

    const totalServicedOrders = data.filter((order) => order.status === "serviced").length;


    const piedata = () => {
      return [
        { name: 'Total Orders', value: totalOrders- totalServicedOrders },
        { name: 'Serviced Orders', value: totalServicedOrders },
      ]
    }







  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Pie Chart</strong>
      <div className="w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={piedata()}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {piedata().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BuyerProfilePieChart;