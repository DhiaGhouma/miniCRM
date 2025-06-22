"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Menu, 
  X,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utilis';

const navigation = [
  { name: 'Tableau de Bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Ajouter Client', href: '/clients/add', icon: UserPlus },
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-slate-100/90 backdrop-blur-sm shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">CRM Pro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/login'}
              className="text-slate-600 hover:text-slate-800 bg-slate-50 border-slate-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-100/95 backdrop-blur-sm border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/login'}
              className="w-full justify-start text-slate-600 hover:text-slate-800 mt-4 bg-slate-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}