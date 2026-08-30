'use client';
import { usePathname } from 'next/navigation';

export default function AdminMainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  return (
    <main className={`flex-1 flex flex-col min-h-screen ${isLogin ? 'ml-0' : 'ml-64'}`}>
      {children}
    </main>
  );
}
