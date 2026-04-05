'use client';
import React, { useState } from 'react';
import { Plus, Search, Filter, GripVertical, Image as ImageIcon } from 'lucide-react';

const mockCollections = [
  { id: 'COL-01', name: 'VALENCIRÉ ACCESS', items: 12, status: 'Active', type: 'Manual' },
  { id: 'COL-02', name: 'THE INITIATION', items: 5, status: 'Active', type: 'Automated' },
  { id: 'COL-03', name: 'ARCHIVE', items: 34, status: 'Hidden', type: 'Manual' },
];

export default function CollectionsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Collections</h1>
           <p className="text-sm text-brand-muted mt-1">Group products into exclusive drops and categories.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-text text-brand-bg px-4 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-brand-text/90 transition-colors">
          <Plus className="w-4 h-4" /> Create Collection
        </button>
      </div>

      <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm overflow-hidden">
        <ul className="divide-y divide-brand-border">
          {mockCollections.map((col) => (
             <li key={col.id} className="p-4 flex items-center gap-4 hover:bg-brand-alt/50 transition-colors group cursor-grab">
               <GripVertical className="w-5 h-5 text-brand-muted opacity-30 group-hover:opacity-100 transition-opacity" />
               <div className="w-16 h-12 bg-brand-alt border border-brand-border rounded-sm flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-brand-muted" />
               </div>
               <div className="flex-1">
                 <p className="font-black text-brand-text uppercase tracking-widest text-sm">{col.name}</p>
                 <div className="flex gap-4 mt-1 text-xs text-brand-muted">
                    <span>{col.items} Products</span>
                    <span className="flex items-center before:content-[''] before:w-1 before:h-1 before:bg-brand-muted before:rounded-full before:mr-2">
                       {col.type} Focus
                    </span>
                 </div>
               </div>
               <div>
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm ${col.status === 'Active' ? 'bg-[#E5F5E5] text-[#1D791D]' : 'bg-gray-100 text-gray-500'}`}>
                    {col.status}
                  </span>
               </div>
               <button className="px-4 py-2 ml-4 text-xs font-bold border border-brand-border rounded-sm hover:bg-brand-alt">
                 Edit
               </button>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
