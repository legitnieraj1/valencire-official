import './globals.css';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Package, FolderTree, Users, BarChart2, FileText, Tag, Banknote, Settings, Bell, Search, Hexagon } from 'lucide-react';

export const metadata = {
  title: 'VALENCIRÉ | COMMAND CENTER',
  description: 'Premium Admin Dashboard for Valencire',
};

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Collections', href: '/admin/collections', icon: FolderTree },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Discounts', href: '/admin/discounts', icon: Tag },
  { name: 'Inventory', href: '/admin/inventory', icon: Hexagon },
  { name: 'Payments', href: '/admin/payments', icon: Banknote },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="admin-root flex h-screen overflow-hidden bg-brand-alt">
          
          {/* SIDEBAR */}
      <aside className="w-64 bg-brand-bg border-r border-brand-border flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-brand-border">
          <Link href="/admin" className="text-sm font-black tracking-[0.3em] font-sans text-brand-text uppercase">
            VALENCIRÉ
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-brand-muted hover:text-brand-text hover:bg-brand-alt transition-colors"
            >
              <item.icon className="w-4 h-4" strokeWidth={2} />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-brand-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-text text-brand-bg flex items-center justify-center text-xs font-bold">
              SA
            </div>
            <div className="text-xs">
              <p className="font-bold text-brand-text">Super Admin</p>
              <p className="text-brand-muted">admin@valencire.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-16 bg-brand-bg flex items-center justify-between px-8 border-b border-brand-border shrink-0">
          <div className="flex items-center gap-4 w-96 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3" />
            <input 
              type="text" 
              placeholder="Search products, orders, customers..." 
              className="w-full bg-brand-alt border border-brand-border rounded-md pl-10 pr-4 py-2 text-xs text-brand-text focus:outline-none focus:border-brand-text transition-colors"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-brand-muted hover:text-brand-text relative transition-colors">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full"></span>
            </button>
            <Link href="/" target="_blank" className="text-xs font-semibold text-brand-muted hover:text-brand-text tracking-widest uppercase transition-colors">
              Storefront ↗
            </Link>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-brand-alt p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  </body>
</html>
  );
}
