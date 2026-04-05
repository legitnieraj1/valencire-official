'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, RefreshCcw } from 'lucide-react';

const salesData = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5500, orders: 35 },
  { name: 'Thu', revenue: 4500, orders: 28 },
  { name: 'Fri', revenue: 8000, orders: 45 },
  { name: 'Sat', revenue: 12000, orders: 75 },
  { name: 'Sun', revenue: 10000, orders: 60 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Arjun K.', amount: '₹4,500', status: 'Paid', date: 'Just now' },
  { id: '#ORD-002', customer: 'Rahul M.', amount: '₹12,499', status: 'Pending', date: '2 hrs ago' },
  { id: '#ORD-003', customer: 'Priya S.', amount: '₹2,999', status: 'Paid', date: '5 hrs ago' },
  { id: '#ORD-004', customer: 'Kabir D.', amount: '₹8,500', status: 'Paid', date: '1 day ago' },
];

const lowStock = [
  { p: 'Blood Noir™ Oversized', var: 'Black / M', stock: 2 },
  { p: 'Amethyst Comp.', var: 'Purple / S', stock: 4 },
];

function MetricCard({ title, amount, change, isPositive }) {
  return (
    <div className="bg-brand-bg border border-brand-border p-6 rounded-md shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-brand-muted mb-2 font-bold">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-black text-brand-text">{amount}</p>
        <span className={`flex items-center text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {change}%
        </span>
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Overview</h1>
        <p className="text-sm text-brand-muted mt-1">Here's what's happening at Valenciré today.</p>
      </header>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" amount="₹47,000" change="12.5" isPositive={true} />
        <MetricCard title="Total Orders" amount="285" change="8.2" isPositive={true} />
        <MetricCard title="Avg. Order Value" amount="₹4,250" change="1.5" isPositive={false} />
        <MetricCard title="Conversion Rate" amount="3.2%" change="0.4" isPositive={true} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-bg border border-brand-border rounded-md shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-brand-text">Revenue Over Time</h3>
            <select className="text-xs border border-brand-border bg-brand-alt rounded-sm px-2 py-1 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8A8A8A' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8A8A8A' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: 'none', color: '#FFF', fontSize: '12px' }}
                  itemStyle={{ color: '#FFF' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0A0A0A" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm p-6 relative">
          <h3 className="text-xs uppercase tracking-widest font-bold text-brand-text mb-6">Orders Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8A8A8A' }} dy={10} />
                <Tooltip 
                  cursor={{ fill: '#F5F5F5' }}
                  contentStyle={{ backgroundColor: '#0A0A0A', border: 'none', color: '#FFF', fontSize: '12px' }}
                />
                <Bar dataKey="orders" fill="#0A0A0A" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-bg border border-brand-border rounded-md shadow-sm">
          <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center">
             <h3 className="text-xs uppercase tracking-widest font-bold text-brand-text">Recent Orders</h3>
             <button className="text-xs font-semibold text-brand-muted hover:text-brand-text">View All</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-alt text-xs uppercase tracking-wider text-brand-muted">
                <tr>
                  <th className="px-6 py-3 font-semibold">Order</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-brand-alt/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-bold">{order.id}</td>
                    <td className="px-6 py-4 text-brand-muted">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm ${order.status === 'Paid' ? 'bg-[#E5F5E5] text-[#1D791D]' : 'bg-[#FFF5CC] text-[#997300]'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm">
          <div className="px-6 py-4 border-b border-brand-border">
             <h3 className="text-xs uppercase tracking-widest font-bold text-brand-text flex items-center gap-2">
               <Package className="w-4 h-4" />
               Low Stock Alerts
             </h3>
          </div>
          <div className="p-6 space-y-4">
            {lowStock.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-brand-border pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-bold uppercase">{item.p}</p>
                  <p className="text-xs text-brand-muted mt-1">{item.var}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2 py-1 rounded-sm">{item.stock} left</span>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-brand-text text-brand-bg hover:bg-black/80 transition-colors rounded-sm">
              <RefreshCcw className="w-3 h-3" /> Update Inventory
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
