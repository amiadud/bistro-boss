import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaStairs, FaUsers } from 'react-icons/fa6';
import { FaCar, FaCarAlt, FaDeaf, FaParking } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';


const AdminHome = () => {

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const {user} = useAuth();
    const axiosSecure = useAxios();

    const {data: stats} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })

    const {data: chartData = []} = useQuery({
        queryKey: ['order-stats'],
        queryFn: async ()=> {
            const res = await axiosSecure.get('/order-stats');
            return res.data
        }
    });

      
      const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

      const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
        };

       const pieChartData = chartData.map((data) => {
        return {name: data.category, value: data.revenue }
       })
       
    return (
        <div>

            <h2 className='text-3xl'> 

            <span> Hi. Welcome </span>
            {
                user?.displayName ? user.displayName : 'back'
            }
            </h2>
            <div className="stats md:w-full w-auto stats-vertical lg:stats-horizontal shadow">
  
  <div className="stat">
  <div className='stat-figure text-secondary'><FaDollarSign className='text-4xl'/></div>
    <div className="stat-title">Revenue</div>
    <div className="stat-value">${stats?.revenue}</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat">
  <div className='stat-figure text-secondary'><FaUsers className='text-4xl'/></div>
    <div className="stat-title">Users</div>
    <div className="stat-value">{stats?.users}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat">
    <div className='stat-figure text-secondary'><FaCar className='text-3xl'/></div>
    <div className="stat-title">Orders</div>
    <div className="stat-value">{stats?.orders} </div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>

  <div className="stat">
    <div className='stat-figure text-secondary'><FaBook className='text-3xl'/></div>
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{stats?.menuItems} </div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>

<div className='flex flex-col md:flex-col lg:flex-row'>

<BarChart
      width={600}
      height={400}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    <PieChart  width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend/>
        </PieChart>
</div>

        </div>
    );
};

export default AdminHome;