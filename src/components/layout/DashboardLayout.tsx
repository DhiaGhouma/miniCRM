import NavBar from './NavBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}