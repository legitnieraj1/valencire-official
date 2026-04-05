'use client';
import React from 'react';

export default function PaymentsPage() {
  return (
    <div className="space-y-8 pb-12 h-full flex flex-col items-center justify-center pt-32 opacity-50">
       <h1 className="text-2xl font-black text-brand-text tracking-widest uppercase">Payments Ledger</h1>
       <p className="text-sm text-brand-muted mt-1 uppercase tracking-wider">Razorpay reconciliation and refunds interface.</p>
       <div className="w-16 h-1 bg-brand-border mt-6"></div>
    </div>
  );
}
