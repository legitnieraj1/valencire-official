'use client';
import React from 'react';
import { LayoutTemplate, Home, BookOpen, AlertCircle } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Content Management</h1>
           <p className="text-sm text-brand-muted mt-1">Control your storefront sections, guides, and textual drops.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* HOMEPAGE HERO CMS */}
        <div className="lg:col-span-2 bg-brand-bg border border-brand-border rounded-md shadow-sm p-6 space-y-6">
           <h3 className="text-xs font-black uppercase tracking-widest border-b border-brand-border pb-4 flex items-center gap-2">
             <Home className="w-4 h-4" /> Homepage Hero
           </h3>
           
           <div className="space-y-4">
             <div>
               <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-2">Pre-title</label>
               <input type="text" defaultValue="WINTER DROPS" className="w-full bg-brand-alt border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-text rounded-sm" />
             </div>
             <div>
               <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-2">Main Title</label>
               <input type="text" defaultValue="VALENCIRÉ EXCLUSIVE" className="w-full bg-brand-alt border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-text rounded-sm font-black tracking-widest uppercase" />
             </div>
             <div>
               <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-2">Hero Video (MP4)</label>
               <div className="flex gap-2">
                  <input type="text" defaultValue="/archive.mp4" className="w-full bg-brand-alt border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-text rounded-sm" />
                  <button className="px-4 py-2 border border-brand-border rounded-sm hover:bg-brand-alt text-xs font-bold uppercase">Browse</button>
               </div>
             </div>
           </div>
           
           <div className="flex justify-end pt-4 border-t border-brand-border">
             <button className="bg-brand-text text-brand-bg px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-black/90">
               Publish Changes
             </button>
           </div>
        </div>

        {/* SIDE BAR SECTIONS */}
        <div className="space-y-6">
           
           <div className="bg-brand-bg border border-brand-border rounded-md shadow-sm p-6">
             <h3 className="text-xs font-black uppercase tracking-widest border-b border-brand-border pb-4 flex items-center gap-2 mb-4">
               <BookOpen className="w-4 h-4" /> Valenciré Guide
             </h3>
             <p className="text-xs text-brand-muted mb-4 leading-relaxed">Update the 'About Us' section, philosophy, and fabric care instructions available in the sliding panel.</p>
             <button className="w-full border border-brand-border px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-alt">
                Edit Guide Text
             </button>
           </div>

           <div className="bg-brand-bg border-l-4 border-yellow-500 rounded-md shadow-sm p-6">
             <h3 className="text-xs font-black uppercase tracking-widest pb-2 flex items-center gap-2 text-yellow-600">
               <AlertCircle className="w-4 h-4" /> Announcement Bar
             </h3>
             <textarea 
               className="w-full bg-brand-alt border border-brand-border px-3 py-2 text-sm focus:outline-none h-16 rounded-sm mt-2 mb-4" 
               defaultValue="FREE SHIPPING ON ORDERS OVER ₹5000"
             />
             <div className="flex items-center gap-2 text-xs font-bold">
               <input type="checkbox" defaultChecked id="annbar" />
               <label htmlFor="annbar">Enable Announcement Bar</label>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
