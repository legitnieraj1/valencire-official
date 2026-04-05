'use client';
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Image as ImageIcon } from 'lucide-react';

const mockProducts = [
  { id: 'PROD-001', name: 'Valencire T-Shirt', sku: 'VAL-TS-01', category: 'Tees', stock: 120, price: '₹2,999', status: 'Active' },
  { id: 'PROD-002', name: 'Blood Noir™ Oversized', sku: 'BLOOD-OS-BK', category: 'Oversized', stock: 2, price: '₹4,500', status: 'Low Stock' },
  { id: 'PROD-003', name: 'Amethyst Compression', sku: 'AMTH-COMP-P', category: 'Compression', stock: 45, price: '₹3,499', status: 'Active' },
  { id: 'PROD-004', name: 'The Initiation Hoodie', sku: 'INIT-HD-00', category: 'Outerwear', stock: 0, price: '₹8,999', status: 'Out of Stock' },
];

export default function ProductsPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Products</h1>
          <p className="text-sm text-brand-muted mt-1">Manage your inventory, variants, and collections.</p>
        </div>
        <button 
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-brand-text text-brand-bg px-4 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-brand-text/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-4 items-center bg-brand-bg p-4 border border-brand-border rounded-md shadow-sm">
        <div className="flex-1 relative">
           <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
           <input type="text" placeholder="Search by name, SKU..." className="w-full pl-9 pr-4 py-2 text-sm bg-brand-alt border border-brand-border rounded-sm focus:outline-none focus:border-brand-text" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-brand-border rounded-sm hover:bg-brand-alt transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-alt text-xs uppercase tracking-wider text-brand-muted">
            <tr>
              <th className="px-6 py-4 font-semibold w-12"><input type="checkbox" /></th>
              <th className="px-6 py-4 font-semibold">Product Info</th>
              <th className="px-6 py-4 font-semibold">SKU</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {mockProducts.map((p) => (
              <tr key={p.id} className="hover:bg-brand-alt/30 transition-colors group">
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-alt rounded-sm border border-brand-border flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-brand-muted" />
                    </div>
                    <div>
                      <p className="font-bold text-brand-text uppercase">{p.name}</p>
                      <p className="text-[10px] uppercase tracking-wider text-brand-muted">{p.status}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{p.sku}</td>
                <td className="px-6 py-4 text-brand-muted uppercase text-xs">{p.category}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-yellow-600' : 'text-brand-text'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">{p.price}</td>
                <td className="px-6 py-4 text-brand-muted">
                  <button className="p-1 hover:text-brand-text transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-brand-border flex justify-between items-center text-xs text-brand-muted uppercase">
          <span>Showing 4 of 4 products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-brand-border rounded-sm hover:bg-brand-alt text-brand-text font-semibold disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-brand-border rounded-sm hover:bg-brand-alt text-brand-text font-semibold disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* DRAWER FOR ADDING PRODUCT (MOCK) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)}></div>
          <div className="relative w-[600px] h-full bg-brand-bg shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-brand-border flex justify-between items-center bg-brand-alt">
              <h2 className="text-sm font-black tracking-widest uppercase">Add New Product</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-brand-muted hover:text-brand-text">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Product Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 focus:outline-none focus:border-brand-text transition-colors text-sm" placeholder="e.g. BLOOD NOIR™ TEE" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Price (INR)</label>
                    <input type="number" className="w-full bg-transparent border-b border-brand-border py-2 focus:outline-none focus:border-brand-text transition-colors text-sm" placeholder="4500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">SKU</label>
                    <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 focus:outline-none focus:border-brand-text transition-colors text-sm" placeholder="BLD-NR-01" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Media</label>
                <div className="border-2 border-dashed border-brand-border rounded-md p-12 text-center bg-brand-alt flex flex-col items-center justify-center cursor-pointer hover:border-brand-muted hover:bg-brand-border/30 transition-all">
                  <ImageIcon className="w-8 h-8 text-brand-muted mb-4" />
                  <p className="text-sm font-semibold">Drop images here to upload</p>
                  <p className="text-xs text-brand-muted mt-1">JPEG, PNG, WEBP up to 10MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Variants (Size / Color)</label>
                <div className="bg-brand-alt p-4 rounded-sm border border-brand-border">
                  <div className="flex gap-2">
                    <input type="text" placeholder="e.g. Size" className="flex-1 bg-white border border-brand-border px-3 py-2 text-sm outline-none" />
                    <input type="text" placeholder="S, M, L, XL" className="flex-[2] bg-white border border-brand-border px-3 py-2 text-sm outline-none" />
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-brand-muted"><Plus className="w-3 h-3" /> Add Detail</button>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-brand-border bg-brand-alt flex justify-end gap-4">
              <button onClick={() => setDrawerOpen(false)} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-border transition-colors rounded-sm">Cancel</button>
              <button className="px-6 py-2.5 bg-brand-text text-brand-bg text-xs font-bold uppercase tracking-widest hover:bg-brand-text/90 transition-colors rounded-sm">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
