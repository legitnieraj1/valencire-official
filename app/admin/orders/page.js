'use client';
import React, { useState } from 'react';
import { Search, Filter, Eye, MoreVertical } from 'lucide-react';

const mockOrders = [
  { id: '#ORD-001', date: 'Oct 12, 2026', customer: 'Arjun K.', email: 'arjun@example.com', total: '₹4,500', payment: 'Paid', fulfillment: 'Unfulfilled', items: 1 },
  { id: '#ORD-002', date: 'Oct 12, 2026', customer: 'Rahul M.', email: 'rahul@example.com', total: '₹12,499', payment: 'Pending', fulfillment: 'Unfulfilled', items: 3 },
  { id: '#ORD-003', date: 'Oct 11, 2026', customer: 'Priya S.', email: 'priya@example.com', total: '₹2,999', payment: 'Paid', fulfillment: 'Shipped', items: 1 },
  { id: '#ORD-004', date: 'Oct 10, 2026', customer: 'Kabir D.', email: 'kabir@example.com', total: '₹8,500', payment: 'Refunded', fulfillment: 'Cancelled', items: 2 },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Orders</h1>
           <p className="text-sm text-brand-muted mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-brand-bg p-4 border border-brand-border rounded-md shadow-sm">
        <div className="flex-1 relative">
           <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
           <input type="text" placeholder="Search orders by ID, customer..." className="w-full pl-9 pr-4 py-2 text-sm bg-brand-alt border border-brand-border rounded-sm focus:outline-none focus:border-brand-text" />
        </div>
        <div className="flex bg-brand-alt border border-brand-border rounded-sm text-sm font-medium">
          <button className="px-4 py-2 bg-brand-bg text-brand-text font-bold border-r border-brand-border">All</button>
          <button className="px-4 py-2 text-brand-muted hover:text-brand-text border-r border-brand-border transition-colors">Unfulfilled</button>
          <button className="px-4 py-2 text-brand-muted hover:text-brand-text transition-colors">Unpaid</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-brand-border rounded-sm hover:bg-brand-alt transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-alt text-xs uppercase tracking-wider text-brand-muted border-b border-brand-border">
            <tr>
              <th className="px-6 py-4 font-semibold w-12"><input type="checkbox" /></th>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Payment Status</th>
              <th className="px-6 py-4 font-semibold">Fulfillment status</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {mockOrders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-alt/30 transition-colors group">
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4 font-black">{o.id}</td>
                <td className="px-6 py-4 text-brand-muted">{o.date}</td>
                <td className="px-6 py-4">
                  <p className="font-bold">{o.customer}</p>
                  <p className="text-[10px] text-brand-muted">{o.items} items</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm ${o.payment === 'Paid' ? 'bg-[#E5F5E5] text-[#1D791D]' : o.payment === 'Refunded' ? 'bg-gray-100 text-gray-600' : 'bg-[#FFF5CC] text-[#997300]'}`}>
                    {o.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm ${o.fulfillment === 'Shipped' ? 'bg-blue-50 text-blue-600' : o.fulfillment === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {o.fulfillment}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">{o.total}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:text-brand-text text-brand-muted transition-colors inline-block mr-2">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-brand-text text-brand-muted transition-colors inline-block">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
